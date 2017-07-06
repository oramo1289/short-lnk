import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';


Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();//userId es un metodo que te va a rrojar un string con todos los datos del user que se conectó
  onAuthChange(isAuthenticated);
  console.log('is Authenticated', isAuthenticated);
});



Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
