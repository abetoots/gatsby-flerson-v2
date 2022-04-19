import PropTypes from 'prop-types'
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
      // logError(error, info);
      // reportError(error, info);
}

  render() {
    if (this.state.hasError) {
      return <h1 className="p-3">{this.props.message}</h1>;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
    message: PropTypes.string
}

export default ErrorBoundary;
