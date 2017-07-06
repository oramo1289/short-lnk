import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props){//tendremos acceso a todos lor props
    super(props);//si vamos a reescribir el constructor que viene de default en React.component necesitamos super();
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 6) {
      return this.setState({error: 'please make a valid password'})
    }

    Accounts.createUser({email, password}, (err) => { //createUser() utiliza dos argumentos uno es el objeto donde esta email y password el segundo es un callback
      //console.log('Signup callback', err);
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });

    // this.setState({
    //   error:'Something went wrong'
    // });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}
