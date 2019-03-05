import React, { Component } from "react";
import "./PasswordStrength.css";

import { RangeResponse } from "./models";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import sha1 from "sha1";
import { checkHIBPForAnyBreach } from "./HIBPCaller";

export interface IPasswordStrengthProps {
  passwordToCheck: string;
  barLabel?: string;
  fontFamily: string;
  onStrengthChanged: (strength: number) => any;
}

interface State {
  passwordIsPwned: boolean;
  numberOfBreaches: number | null;
  passwordStrength: number| null;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;
  bar0: string;
  colors: string[];
}

export class ReactPassStrength extends React.Component<IPasswordStrengthProps, State> {
  public static defaultProps = {
    fontFamily: "Luca, sans-serif"
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private passwordChanged: Subject<string> = new Subject<string>();

  componentWillUnmount() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  componentDidUpdate(prevProps: IPasswordStrengthProps) {
    if(prevProps && prevProps.passwordToCheck !== this.props.passwordToCheck) {
      this.passwordChanged.next(this.props.passwordToCheck);
      this.setBarColors(5, '#DDD');
      const strength = this.measureStrength(this.props.passwordToCheck);
      const c = this.getColor(strength);
      this.setBarColors(c.idx, c.col);
      this.props.onStrengthChanged(strength);
    }
  }

  constructor(props: IPasswordStrengthProps) {
    super(props);

    this.state = {
      numberOfBreaches: 0,
      passwordIsPwned: false,
      passwordStrength: null,
      bar0: "",
      bar1: "",
      bar2: "",
      bar3: "",
      bar4: "",
      colors: ["#F00", "#F90", "#FF0", "#9F0", "#0F0"]
    };

    this.passwordChanged
      .pipe(   
        debounceTime(1000),
        distinctUntilChanged(),
       
      )
      .subscribe(pass => {
        this.setState({
          ...this.state,
          passwordIsPwned: false,
          numberOfBreaches: 0
        });
        this.checkHIBPForAnyBreach(pass);
      });
  }

  render() {
    return (
      <div
        className="react-password-strength-container"
        style={{ fontFamily: this.props.fontFamily }}
      >
        {this.props.barLabel && <div>{this.props.barLabel}</div>}
        <ul className="react-strength-bar">
          <li className="point" style={{ backgroundColor: this.state.bar0 }} />
          <li className="point" style={{ backgroundColor: this.state.bar1 }} />
          <li className="point" style={{ backgroundColor: this.state.bar2 }} />
          <li className="point" style={{ backgroundColor: this.state.bar3 }} />
          <li className="point" style={{ backgroundColor: this.state.bar4 }} />
        </ul>
        {this.renderPwned(this.state.passwordIsPwned)}
      </div>
    );
  }

  renderPwned(isPawned: boolean) {
    console.log('should render breach:', isPawned);
    if (isPawned) {
      return (
        <div className="HIBP">
          Oh no, seems like your password is been found in
          <strong> {this.state.numberOfBreaches!.toLocaleString()} </strong>{" "}
          breaches!
          <div>
            <small>
              Credits to
              <a href="https://haveibeenpwned.com"> Have I Been Pwned APIs.</a>
            </small>
          </div>
        </div>
      );
    }
    return "";
  }

  private setBarColors(count: number, col: string) {
    let obj: any = {};
    for (let _n = 0; _n < count; _n++) {
      obj[`bar${_n}`] = col;

      this.setState({
        ...obj
      });
    }
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.state.colors[idx]
    };
  }

  private checkHIBPForAnyBreach(password: string) {
    const passwordHash: string = String(sha1(password)).toUpperCase();

    checkHIBPForAnyBreach(passwordHash.substring(0, 5))
      .then(response => {
        const foundHash = this.deserialiseRangeResponses(response).find(
          x => passwordHash.indexOf(x.suffix) === 5
        );
        if (foundHash) {
          return foundHash.count;
        }
        return null;
      })
      .then(breachCount => {
        this.setState({
          ...this.state,
          numberOfBreaches: breachCount,
          passwordIsPwned: breachCount != null && breachCount > 0
        });
      });
  }

  private measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private deserialiseRangeResponses(responseString: string): Array<RangeResponse> {
    return responseString.split("\r\n").map((rangeResponse: string) => {
      return new RangeResponse().deserialise(rangeResponse);
    });
  }
}

export default ReactPassStrength;