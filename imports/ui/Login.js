import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props){//tendremos acceso a todos lor props
    super(props);//si vamos a reescribir el constructor que viene de default en React.component necesitamos super();
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();//trim remove whitespaces from both sides of the string
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {//tres argumentos: con lo que te registatete en este caso el email, segundo password y tercero el callback error
      //console.log('login callback', err);
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });

  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}
