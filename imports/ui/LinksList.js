import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import {LinksStored} from '../api/linksStored.js';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {//una vez que se recargue el componente va a hacer sutorun con el nuevo link y lo va a mostrar
    console.log('component did mount LinksList');
    this.linksTracker = Tracker.autorun(()=>{
      Meteor.subscribe('linksPub');
      const links = LinksStored.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links: links});//el state va a ser igual a la lista de todos los links almacenados en el minimongo que son los que estan almacenados en mongo
    });
  }
  componentWillUnmount() {
    console.log('console will unmount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {//mostrar los items que estan en la base de datos
    if (this.state.links.length === 0) {
      return(
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;//le estas dando a LinksListItem todas las propiedades de link y el id
      // return <p key={link._id}>{link.url}</p>
    });
  }
  render() {
    return(
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
