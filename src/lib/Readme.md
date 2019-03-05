How to use the `ReactPassStrength`:

```ts
import React, { Component } from "react";
import ReactPassStrength from "./PasswordStrength";

interface AppProps {

}

interface AppState {
  password: string;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      password: ""
    };

    this.handlePassStrengthChange = this.handlePassStrengthChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <form>
            <div className="form-group">
                <label>Password</label>
                <input type="password" 
                    className="form-control" id="exampleInputPassword1" 
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"/>
            </div>

          <ReactPassStrength passwordToCheck={this.state.password} onStrengthChanged={this.handlePassStrengthChange} />
        </form>
      </div>
    );
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      password: event.currentTarget.value
    });
  }

  handlePassStrengthChange(strength: number | null) {
      console.log(strength);
  }
}
```