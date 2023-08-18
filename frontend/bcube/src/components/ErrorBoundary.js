import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      statusCode: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state when an error occurs
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error and error info here
    console.error(error, info);

    // Check if the error is related to a failed API request
   
  }

  render() {
    if (this.state.hasError) {
      // Render an error message based on the status code
      switch (this.state.statusCode) {
        case 404:
          return <div>404 - Not Found</div>;
        case 500:
          return <div>500 - Internal Server Error</div>;
        default:
          return <div>An error occurred</div>;
      }
    }

    // If no error, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;