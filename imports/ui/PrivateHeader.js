import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

// export default class PrivateHeader extends React.Component {
//   onLogout() {
//     Accounts.logout(); //con esto haces logout
//   }
//   render(){
    // return (
    //   <div>
    //     <h2>{this.props.title}</h2>
    //     <button onClick={this.onLogout.bind(this)}>Hola</button>
    //   </div>
    // );
//   }
// }

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--links-text" onClick={() => Accounts.logout()}>logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
