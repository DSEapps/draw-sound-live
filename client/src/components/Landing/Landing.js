import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import API from "../../utils/API";


class Landing extends Component {
  state = {

  };

  componentDidMount() {
    // In case we need 
  }

  enterClick = () => {
    this.props.history.push("/login");
}

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
                <h2>Draw &lt; &gt; Sound &lt; &gt; Live </h2>
                <p>Explore the intersection of art, music and creative exploration.</p>
                <button onClick={this.enterClick} className="btn btn-primary btn-lg">Enter</button>
            </div>
          </div>  
        </div>
      </div>      
    );
  }
}

export default Landing;



