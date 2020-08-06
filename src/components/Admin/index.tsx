import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

// TODO Add ROLE BASED AUTHORIZATION
type IAdmin = {
  loading: boolean,
  users: User[]
}

type User = {
  uid: string,
  data: {
    email: string,
    username: string,
  }
}

class AdminPage extends Component<any, IAdmin> {
  unsubscribe: any;
  constructor(props: any) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };

    this.getUsersList = this.getUsersList.bind(this);
  }
 
  componentDidMount() {
    this.getUsersList();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getUsersList = () => {
    this.setState({ loading: true });
    
    const that = this;
    this.unsubscribe  = this.props.firebase.users().onSnapshot((querySnapshot: any) => {
      let usersList: any[] = [];
      querySnapshot.forEach((doc: any) => {
        const user: User = {
          uid: doc.id,
          data: {
            email: doc.data().email,
            username: doc.data().username,
          }
        }
        usersList.push(user);
      });
      
      that.setState({
        users: usersList,
        loading: false,
      })
    });
  }
 
  render() {
    const {users, loading} = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({users}: any) => (
  <ul>
    {users.map((user: User) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.data.email}
        </span>
        <span>
          <strong>Username:</strong> {user.data.username}
        </span>
      </li>
    ))}
  </ul>
);
 
export default withFirebase(AdminPage);