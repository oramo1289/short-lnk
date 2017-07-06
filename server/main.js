import { Meteor } from 'meteor/meteor';
import { WebApp} from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import { LinksStored } from '../imports/api/linksStored';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
  
  WebApp.connectHandlers.use((req, res, next) => {//es un middleware para comprobar si el url contiene un link _id
    const _id = req.url.slice(1);//obtiene el link de localhost:3000/linkqueobtiene
    const link = LinksStored.findOne({ _id });//comprueba que la const _id sea igual a la guardada en la base de datos

    if (link) {//si es verdadero te redirecciona al link
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });


});
