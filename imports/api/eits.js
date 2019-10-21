import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Eits = new Mongo.Collection('eits');


if (Meteor.isServer) {

  Meteor.publish('eits', function eitsPublication() {
    return Eits.find();
  });
}

Meteor.methods({
  'eit.insert'({firstname, surname, country, age}) {

    check(firstname, String);
    check(surname, String);
    check(country, String);
    check(age, String);

    // Make sure the user is logged in before inserting eit
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Eits.insert({
      firstname,
      surname,
      country,
      age,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },
  'eit.remove'(eitId) {
    check(eitId, String);

    const eit = Eits.findOne(eitId);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (eit.createdBy != this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Eits.remove(eitId);
  },
  'eit.update'(eitId, {firstname, surname, country, age}) {
    check(firstname, String);
    check(surname, String);
    check(country, String);
    check(age, String);
    check(eitId, String);

    const eit = Eits.findOne(eitId);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Eits.update(eitId, { $set: {firstname, surname, country, age} });
  },
});
