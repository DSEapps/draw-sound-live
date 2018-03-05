import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

  loginClick = () => {
    // redirect to Googe oAuth code
    this.props.history.push("/venue");
}

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Login</h1>
              <p>This is in the render return statement in Component/Login</p>
              <p>Google OAuth goes here...</p>
              <button onClick={this.loginClick} className="btn btn-primary btn-lg">Login with Google</button>
            </div>
          </div>  
        </div>
      </div>      
    );
  }
}

export default Login;



