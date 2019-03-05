# React Pass Strength

![Build Status](https://travis-ci.com/yashints/react-pass-strength.svg?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/react-pass-strength-sample)

This is a small library I created which lets you measure password strength and also checks it against [Have I Been Pwned](https://haveibeenpwned.com/API/v2) APIs created by [Troy Hunt](https://www.troyhunt.com/) to see if is found in a breach before or not.

## Demo
Try out [the demo on Stackblitz!](https://stackblitz.com/edit/react-pass-strength-sample)

## Install

```bash
npm i react-pass-strength --save
```

Since `npm` doesn't install the peer dependencies automatically, you will need to install `sha1` npm package which is needed to calculate the password hash:

```bash
npm i sha1 rxjs --save
```

For a full dependency list refer to `package.json` file.

## Setup
Import the component into your component where you want to use it. Then use `<ReactPassStrength />` and pass the password and a callback at least.

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

          <ReactPassStrength passwordToCheck={this.state.password} 
            onStrengthChanged={this.handlePassStrengthChange} />
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

## Customisation

You can customise the font family and label if you would like to. Simply pass them as inputs.

```html
<ReactPassStrength passwordToCheck={this.state.password} 
    fontFamily="'Open Sans'"
    onStrengthChanged={this.handlePassStrengthChange} />
```

And you can change the label too.

```html
<ReactPassStrength passwordToCheck={this.state.password} 
    fontFamily="'Open Sans'"
    barLabel="'Strength'"
    onStrengthChanged={this.handlePassStrengthChange} />
```

## Development

### Run locally
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Simply run:

```bash
npm start
```

## Contribute
For any type of contribution, please follow the instructions in [CONTRIBUTION](./Contribution.md) and read the [Code of Conduct](./CC.md) file too.

## Author
### Yaser Adel Mehraban (yashints)
* [Website](https://mehraban.com.au)
* [Twitter](https://twitter.com/yashints)
* [GitHub](https://github.com/yashints)