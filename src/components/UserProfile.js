import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class UserProfile extends Component {
  render() {
    return (
        <div>
          <h1>User Profile</h1>
          <Link className = "links" to = "/"> Return Home </Link>
          <h2>Username: {this.props.userName}</h2>
          <h2>Member Since: {this.props.memberSince}</h2>
        </div>
    );
  }
}

export default UserProfile;