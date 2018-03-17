import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

//   loginClick = () => {
//     // redirect to Googe oAuth code
//     console.log("Login button clicked");
//     API.saveUser({
//       "google_id": "XYX987654321",
//       "google_email": "ejk@gmail.com",
//       "in_venue": true,
//       "lifetime_claps": 999,
//       "perf_num": 99,
//       "last_perf": "Thu Mar 17 2013 15:48:59 GMT+0400"
//     })
//       .then(res => this.props.history.push("/venue"))
//       .then(res => console.log("User saved to database"))
//       .catch(err => console.log(err));

// }


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
    return(
      <div className="login-root wrapper center centerFlex">
        <div className="content ">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"  />
          <p>To continue to the performace space you will need to login with your Google account.</p>
          <div className="actions">
            <button onClick={this.cancelClick}>Cancel</button>
            <button onClick={this.loginClick} className="button-primary">Continue</button>
          </div>
        </div>
      </div>      
    );
  }
}

export default Login;



