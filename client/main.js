import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import Routes from '../imports/startup/Routes';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('react-target'));
});