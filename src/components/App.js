import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
} from "../actions/users";
import UsersList from "./UsersList";
import UserForm from "./UserForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName,
      lastName
    });
  };

  handleDeleteUserClick = userId => {
    this.props.deleteUserRequest(userId);
  };

  handleCloseAlert = () => {
    this.props.usersError({
      error: ""
    });
  };

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <Alert
          color={"danger"}
          isOpen={!!this.props.users.error}
          toggle={this.handleCloseAlert}
        >
          {this.props.users.error}
        </Alert>
        <UserForm onSubmit={this.handleSubmit} />
        <UsersList
          onDeleteUser={this.handleDeleteUserClick}
          users={users.items}
        />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(
  mapStateToProps,
  {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError
  }
)(App);
