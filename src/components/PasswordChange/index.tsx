import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';

type IPasswordChangeState = {
  passwordOne: string,
  passwordTwo: string,
  error: {
    message: string
  } | null,
}

const INITIAL_STATE: IPasswordChangeState = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component<any, IPasswordChangeState> {
  constructor(props: any) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = (event: any) => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error: any) => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as IPasswordChangeState);
  };
 
  render() {
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);
