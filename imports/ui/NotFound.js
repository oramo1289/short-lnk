import React from 'react';
import {Link} from 'react-router';


// export default class NotFound extends React.Component {
  // render() {
  //   return <p>NotFound component here</p>;
  // }
// }

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 - Page not Found</h1>
          <p>We're unable to find that page</p>
          <Link to="/" className="button button--links">Head Home</Link>
        </div>
      </div>
    );
};
