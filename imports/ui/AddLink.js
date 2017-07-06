import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e){
    const { url } = this.state;

    e.preventDefault();

    // if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if(!err){
          this.handleModalClose();
        } else {
          this.setState({error: err.reason});
        }
      });
      //LinksStored.insert({url, userId: Meteor.userId()});//vamos a asociar el userId con el url
      //this.refs.url.value='';
    // }
  }
  onChange(e){
    this.setState({
      url: e.target.value.trim()
    })
  }
  handleModalClose() {
    this.setState({
      url:'',
      isOpen: false,
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({url: '', isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          {this.state.error ? <p> {this.state.error} </p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
              <input
                type="text"
                placeholder="URL"
                ref='url'
                value={this.state.url}
                onChange={this.onChange.bind(this)}/>
              <button className="button">Add Link</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
