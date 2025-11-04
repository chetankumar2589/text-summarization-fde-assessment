import React, { Component } from 'react';
import './ResultDisplay.css';

class ResultDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleCopy() {
    const { summary } = this.props;
    if (!summary) return;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summary);
    }
  }

  handleClear() {
    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  render() {
    const { summary, error, loading } = this.props;

    return (
      <div className="rd-root">
        <div className="rd-header">
          <h2 className="rd-title">Summary</h2>
          <div className="rd-actions">
            <button
              type="button"
              className="rd-btn rd-btn-secondary"
              onClick={this.handleClear}
              disabled={loading && !error && !summary}
            >
              Clear
            </button>
            <button
              type="button"
              className="rd-btn rd-btn-primary"
              onClick={this.handleCopy}
              disabled={!summary}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>

        {loading && (
          <div className="rd-loadingbar">
            <span className="rd-spinner" aria-hidden="true" />
            <span className="rd-loading-text">Generating summary…</span>
          </div>
        )}

        {error && (
          <div className="rd-error" role="alert">{error}</div>
        )}

        <div className={`rd-surface ${loading ? 'rd-surface-loading' : ''} ${summary ? 'rd-success' : ''}`}>
          {summary ? (
            <p className="rd-text">{summary}</p>
          ) : (
            <p className="rd-placeholder">Your summary will appear here.</p>
          )}
        </div>
      </div>
    );
  }
}

export default ResultDisplay;


