import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Course crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          margin: '1rem'
        }}>
          <p style={{ fontSize: '3rem' }}>😕</p>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            This page had an issue loading. Please go back and try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '0.8rem 2rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ← Go Back
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
