import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Eits from '../api/eits.js';

import EitComponent from './Eit.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withRouter } from 'react-router-dom';


// Represents the first page
class CreateEit extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      firstname: '',
      surname: '',
      country: '',
      age: '',
      editEitId: null,
      selected: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.editEitId === null){
      Meteor.call('eit.insert', {
        firstname: this.state.firstname, 
        surname: this.state.surname, 
        country: this.state.country, 
        age: this.state.age
      });
    }else{
      Meteor.call('eit.update', this.state.editEitId,{
        firstname: this.state.firstname, 
        surname: this.state.surname, 
        country: this.state.country, 
        age: this.state.age
      });

    }

    
    this.setState ({
      firstname: '',
      surname: '',
      country: '',
      age: '',
      editEitId: null
    });


  }

  clearField(){
    this.setState ({
      firstname: '',
      surname: '',
      country: '',
      age: '',
      editEitId: null
    });
  }


  render() {
    return (
      <div className="container">
        <header>
        <div>
        <h1>Eit Management Application</h1>

        <AccountsUIWrapper />
        </div>

        </header>
        <div>
            <form className="new-eit" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                name="firstname"
                value={this.state.firstname} 
                onChange={this.handleChange}
                placeholder="First name"
                required
              />
              <input
                type="text"
                name="surname"
                value={this.state.surname} 
                onChange={this.handleChange}
                placeholder="Surname"
                required
              />
              <input
                type="text"
                name="country"
                value={this.state.country} 
                onChange={this.handleChange}
                placeholder="Country"
                required
              />
              <input
                type="number"
                name="age"
                value={this.state.age} 
                onChange={this.handleChange}
                placeholder="Age"
                required
              />
              <input type="submit" value={this.state.editEitId === null ? 'Add' : 'Update'}/>
              {this.state.editEitId !== null?
                <button onClick={this.clearField.bind(this)}>Cancel</button>
                : ''
              }
            </form> 
        </div>

      </div>
    );
  }
}

export default withRouter(CreateEit);
