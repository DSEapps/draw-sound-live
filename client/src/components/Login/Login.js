import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router-dom";


class Login extends Component {

  // componentDidUpdate(prevProps, prevState) {
  //   if (!prevProps.userInfo.id && this.props.userInfo.id) {
  //     this.props.history.push("/venue");
  //   }
  // }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.userInfo.id && !this.props.userInfo.id) {
      this.props.history.push("/venue");
    }
  }

  handleSuccess = (response) => {
    const google_id = response.profileObj.googleId;
    const name = response.profileObj.givenName;
    API.findOrCreateUser({ id: google_id, name: name }).then(userData => {
      this.props.handleUserData(userData);
    }).catch(err => console.log(err))
  }

  handleFailure = () => {
    console.log("fail.")
  }

  cancelClick=()=>{
    this.props.history.push("/");    
  }

  render() {
    return (

      <div className="login-root wrapper center centerFlex">
        <div className="content ">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
          <p>To continue to the performace space you will need to login with your Google account.</p>
          <div className="actions">
            <button onClick={this.cancelClick}>Cancel</button>
            <GoogleLogin
              clientId="265275680499-5g10j3l9srs97m57iffmn0riqk9p5evf.apps.googleusercontent.com"
              buttonText="Continue"
              onSuccess={this.handleSuccess}
              onFailure={this.handleFailure}
              className="button-primary"
            />
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Login);



