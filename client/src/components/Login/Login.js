import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";
import ReactDOM from 'react-dom';
import {GoogleAPI,GoogleLogin,GoogleLogout} from 'react-google-oauth'
 



class Login extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

  loginClick = () => {
    // redirect to Googe oAuth code
    console.log("Login button clicked");
    API.saveUser({
      "google_id": "XYX987654321",
      "google_email": "dpk@gmail.com",
      "in_venue": true,
      "lifetime_claps": 999,
      "perf_num": 99,
      "last_perf": "Thu Mar 17 2013 15:48:59 GMT+0400"
    })
      // .then(res => this.props.history.push("/venue"))
      .then(res => console.log("User saved to database"))
      .catch(err => console.log(err));

}


// handleFormSubmit = event => {
//     event.preventDefault();
//       API.saveUser({
//         title: this.state.title,
//         author: this.state.author,
//         synopsis: this.state.synopsis
//       })
//         .then(res => this.loadBooks())
//         .catch(err => console.log(err));
//   };


  render() {

    ReactDOM.render(
      <GoogleAPI clientId="538104571007-v1iusu7qhincf08obk1nr88nfdgn41mt.apps.googleusercontent.com"
          // onUpdateSigninStatus={this.props.history.push("/venue")}
          onLoginSuccess={this.props.history.push("/venue")}
          onInitFailure={console.log("SIGNIN FAILED!!")} >
        <div>
          <div><GoogleLogin /></div>
          <div><GoogleLogout /></div> 
        </div>
      </GoogleAPI>, document.getElementById('root'));
 
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



