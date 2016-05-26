import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class MainHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary main_header">
        <a className="navbar-brand" href="#">Modulator</a>

        <div className="nav navbar-nav pull-right">
          <a className="nav-item nav-link active" href="#">Big Data Portal</a>
          <a className="nav-item nav-link" href="#">Features</a>
          <a className="nav-item nav-link" href="#">Pricing</a>
          <a className="nav-item nav-link" href="#">About</a>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MainHeader);
