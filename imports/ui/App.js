import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Eits from '../api/eits.js';

import EitComponent from './Eit.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';



// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      surname: '',
      country: '',
      age: '',
      editEitId: null,
      selected: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.editEit = this.editEit.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
  }

  bulkDelete(){
    this.state.selected.forEach(async eitId => {
      Meteor.call('eit.remove', eitId)
    });
    this.setState({selected: []})
  }

  async updateSelection({eitId, isChecked}){
    let selected = []

    if(isChecked){
      selected = [...this.state.selected, eitId]
    }else{
      selected = this.state.selected.filter(el => el != eitId)
    }

    await this.setState({selected})
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

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  editEit(eit){
    this.setState({
      firstname: eit.firstname,
      surname: eit.surname,
      country: eit.country,
      age: eit.age,
      editEitId: eit._id
    });
  }

  renderEits() {
    let filteredEits = this.props.eits;
    return filteredEits.map((eit) => {

      return (
        <EitComponent
          key={eit._id}
          eit={eit}
          editEit = {this.editEit}
          updateSelection = {this.updateSelection}
        />
      );
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

          <br/>

          { this.props.currentUser ?
            <form className="new-eit" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                name="firstname"
                value={this.state.firstname} 
                onChange={this.handleChange}
                placeholder="First name"
              />
              <input
                type="text"
                name="surname"
                value={this.state.surname} 
                onChange={this.handleChange}
                placeholder="Surname"
              />
              <input
                type="text"
                name="country"
                value={this.state.country} 
                onChange={this.handleChange}
                placeholder="Country"
              />
              <input
                type="number"
                name="age"
                value={this.state.age} 
                onChange={this.handleChange}
                placeholder="Age"
              />
              <input type="submit" value={this.state.editEitId === null ? 'Add' : 'Update'}/>
              {this.state.editEitId !== null?
                <button onClick={this.clearField.bind(this)}>Cancel</button>
                : ''
              }
            </form> : ''
          }
        </header>
        <br/>
        {
          this.state.selected.length > 0 ?
          <div>
          <button onClick={this.bulkDelete.bind(this)}>Delete selected ({this.state.selected.length})</button>
        </div>
        : ''
        }
        <br/>
        <table>
          <thead>
             <tr>
            <td width="50px"></td>
            <td width="200px">First name</td>
            <td width="200px">Surname</td>
            <td width="100px">Country</td>
            <td width="70px">Age</td>
            <td>Actions</td>
          </tr>
          </thead>
          <tbody>
            {this.renderEits()}
          </tbody> 
        </table>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('eits');

  return {
    eits: Eits.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
