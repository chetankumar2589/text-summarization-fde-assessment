import React, { Component } from 'react';
import './TextAnalyzer.css';

class TextAnalyzer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: props.value || '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Keep optional sync with parent if value prop changes
    if (typeof this.props.value === 'string' && this.props.value !== prevProps.value) {
      this.setState({ textInput: this.props.value });
    }
  }

  handleChange(event) {
    const nextValue = event.target.value;
    this.setState({ textInput: nextValue, error: '' });
    if (this.props.onChange) {
      this.props.onChange(nextValue);
    }
  }

  handleSubmit() {
    const { textInput } = this.state;
    const trimmed = textInput.trim();
    if (trimmed.length < 10) {
      this.setState({ error: 'Please enter at least 10 characters.' });
      return;
    }
    this.setState({ error: '' });
    if (this.props.handleSubmit) {
      this.props.handleSubmit(trimmed);
    }
  }

  render() {
    const { textInput, error } = this.state;

    // Compute visible rows between 3 and 10 based on line count
    const lineCount = textInput.split('\n').length;
    const rows = Math.min(10, Math.max(3, lineCount));

    const isDisabled = textInput.trim().length === 0 || this.props.loading;
    const charCount = textInput.length;

    return (
      <div className="ta-root">
        <label className="ta-label" htmlFor="ta-input">Enter text to summarize</label>
        <textarea
          id="ta-input"
          className={`ta-input ${error ? 'ta-input-error' : ''}`}
          placeholder="Enter text to summarize (minimum 10 characters)..."
          value={textInput}
          onChange={this.handleChange}
          rows={rows}
          disabled={this.props.loading}
        />
        <div className="ta-meta">
          <span className={`ta-count ${charCount < 10 ? 'ta-count-warn' : ''}`}>{charCount} chars</span>
        </div>
        {error && (
          <div className="ta-error" role="alert">{error}</div>
        )}
        <div className="ta-actions">
          <button
            type="button"
            className="ta-button"
            onClick={this.handleSubmit}
            disabled={isDisabled}
          >
            {this.props.loading ? 'Summarizing…' : 'Summarize Text'}
          </button>
        </div>
      </div>
    );
  }
}

export default TextAnalyzer;


