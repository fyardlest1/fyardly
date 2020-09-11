import React from "react";
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // JOI in action
  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
      console.log('Submitted')
  }

  render() {

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
