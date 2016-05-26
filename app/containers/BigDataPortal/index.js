import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BigDataNavControls from './NavControls'

class BigDataPortal extends Component {
  render() {
    return (
      <div className="big-data-portal">
        <BigDataNavControls />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(BigDataPortal);
