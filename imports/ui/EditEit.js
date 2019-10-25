import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Eits from '../api/eits.js';

import EitComponent from './Eit.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withRouter, useParams } from 'react-router-dom';

async function getEit(){
  return await Eits.findOne('47o3d4RdDPZnSk7ML')
}


// Represents the first page
class EditEit extends Component {
  constructor(props){
    super(props);
    let eit =  Eits.find({_id: this.props.match.id}).fetch()
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      firstname: '',
      surname: '',
      country: '',
      age: this.refs.age,
      editEitId: eit._id,
      eit: {}
    };
    
    // setTimeout(function(){
    //   this.setState({

    //     firstname: this.props.eit.firstname,
    //     surname: eit.surname,
    //     country: eit.country,
    //     age: eit.age,

    //   });
    // }, 5000)

    

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // const target = event.target;
    // const name = target.name;

    // this.setState({
    //   [name]: target.value
    // });
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  // componentWillMount(){
  //   if (!this.state.isAuthenticated) {
  //     this.props.history.push('/');
  //   }
  //   console.log('eeere', this.props.eit)
  // }

  static getDerivedStateFromProps(props, state) {
    // setTimeout(function(props){
    // console.log(props.eit)
    //   if (props.eit._id !== state.eit._id) {
    //     return {
    //       firstname: props.eit
    //     };
    //   }
    //   return null;
    // }, 7000)
    
    
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
    console.log(this.props.eit)

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
                value={this.props.eit.firstname} 
                onChange={this.handleChange}
                placeholder="First name"
                required
              />
              <input
                type="text"
                name="surname"
                value={this.props.eit.surname} 
                onChange={this.handleChange}
                placeholder="Surname"
                required
              />
              <input
                type="text"
                name="country"
                value={this.props.eit.country} 
                onChange={this.handleChange}
                placeholder="Country"
                required
              />
              <input
                type="number"
                name="age"
                value={this.props.eit.age} 
                onChange={this.handleChange}
                placeholder="Age"
                required
              />
              <input type="submit" value="Update"/>
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

export default withTracker((props) => {
  Meteor.subscribe('eits');

  const data =  {
    eit: Eits.findOne(props.match.params.id),
    currentUser: Meteor.user(),
  };
  return data
})(EditEit);
