import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Home from '../ui/Home.js';

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  // componentWillMount(){
  //   if (!this.state.isAuthenticated) {
  //     this.props.history.push('/login');
  //   }
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if (!this.state.isAuthenticated) {
  //     this.props.history.push('/login');
  //   }
  // }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
  }

  render(){
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default withRouter(AppContainer);


