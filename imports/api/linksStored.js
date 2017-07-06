import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const LinksStored = new Mongo.Collection('linksStored');

/*===Create a publication*/
if (Meteor.isServer){//publish solo corre en el servidor
  Meteor.publish('linksPub', function () {//publish require de dos argumentos, un string que sera el nombre de la que vas a colocar y la funciòn
    //Meteor.userId(); //esto no funciona en el servidor
    return LinksStored.find({userId: this.userId});//busca los documentos creados por este usuario
  });
}
//name conventio== nombre.action por ejemplo si le pongo links.insert el argumento links no tiene nada que ver con cuaquier otro argumento donde se mencione el mismo nombre
Meteor.methods({
  'links.insert'(url){
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

      new SimpleSchema({
        url:{
          type: String,
          label: 'Your Link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url})

    LinksStored.insert({
      _id: shortid.generate(),//genera un id corto
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  'links.setVisibility'(_id, visible){
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    new SimpleSchema({
      _id:{
        type: String,
        min: 1
      },
      visible:{
        type: Boolean
      }
    }).validate({_id, visible});

    LinksStored.update({
      _id: _id,//el id de la base de datos es del mismo objeto en que se esta haciendo la accion
      userId: this.userId//solo el usuario adecuado puede hacer los cambios
    }, {
      $set:{ visible: visible }//lo que voy a cambiar
    });
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id:{
        type: String,
        min: 1
      }
    }).validate({_id});

    LinksStored.update({_id}, {
      $set:{
        lastVisitedAt: new Date().getTime()
      },
      $inc:{
        visitedCount: 1
      }
    })
  },
  'links.deleteDocument'(_id){
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }
    new SimpleSchema({
      _id:{
        type: String,
        min: 1
      }
    }).validate({_id});
    LinksStored.remove({_id});
  }
});
