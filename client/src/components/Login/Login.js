import React, { Component } from "react";
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import EnterBadge from "./images/graphic_enter.svg";

// Decodes the payload of a Google ID token (JWT) using only built-in
// browser functions - no library needed, and no chance of a modern
// npm package tripping up this old build toolchain.
function decodeJwtPayload(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

class Login extends Component {

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: this.handleSuccess
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large", text: "continue_with" }
      );
    };
    document.body.appendChild(script);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.userInfo.id && !this.props.userInfo.id) {
      this.props.history.push("/venue");
    }
  }

  handleSuccess = (response) => {
    const decoded = decodeJwtPayload(response.credential);
    const google_id = decoded.sub;
    const name = decoded.given_name;
    API.findOrCreateUser({ id: google_id, name: name }).then(userData => {
      this.props.handleUserData(userData);
    }).catch(err => console.log(err))
  }

  cancelClick=()=>{
    this.props.history.push("/");    
  }

  render() {
    return (

      <div className="login-root wrapper center centerFlex">
        <div className="content">
          <img className="login-badge" src={EnterBadge} alt="" />
          <p>You can only access the performance space with a Google account.</p>
          <div className="actions">
            <div id="google-login-button"></div>
            <button onClick={this.cancelClick}>Nevermind</button>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Login);