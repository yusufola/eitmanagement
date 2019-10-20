import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Eit } from '../api/eits.js';


export default class EitComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  deleteThisEit() {
    Meteor.call('eit.remove', this.props.eit._id);
  }

  editThisEit(){
    this.props.editEit(this.props.eit)
  }

  async handleChange() {
    await this.setState({selected: !this.state.selected})

    this.props.updateSelection(
      {
        eitId: this.props.eit._id,
        isChecked: this.state.selected
      }
    )
  }

  render() {

    return (

        <tr className="text">
          <td>
        <input
          type="checkbox"
          readOnly
          checked = {this.state.selected}
          onChange = {this.handleChange}
        />
          </td>
          <td>{this.props.eit.firstname}</td>
          <td>{this.props.eit.surname}</td>
          <td>{this.props.eit.country}</td>
          <td>{this.props.eit.age}</td>
          <td>
             <button className="edit" onClick={this.editThisEit.bind(this)}>
                Edit
              </button>
        
            <button className="delete" onClick={this.deleteThisEit.bind(this)}>
            &times;
          </button>
          </td>
          
         

       

        </tr>

    );
  }
}
