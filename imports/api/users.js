import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;//accedo al email

    new SimpleSchema({//creo mi schema para luego validar el email
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email });

  //console.log('this is the', user);
  return true;//con esto se crea
});
