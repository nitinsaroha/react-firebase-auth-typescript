import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

interface IAuthUserState {
  authUser: string | null;
}

const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component<any, IAuthUserState> {
    listener: any;

    constructor(props: any) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: any) =>
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null })
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          {/* Prettier might add extra semi-colon here */}
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
