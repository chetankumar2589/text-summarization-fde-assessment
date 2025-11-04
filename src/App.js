import React, { Component } from 'react';
import './App.css';
import TextAnalyzer from './components/TextAnalyzer';
import ResultDisplay from './components/ResultDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      loading: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearResults = this.handleClearResults.bind(this);
  }

  async handleSubmit(textInput) {
    this.setState({ loading: true, error: '' });
    try {
      const response = await fetch('https://dbda8fb469cd.ngrok-free.app/webhook/text-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text_to_analyze: textInput })
      });

      if (!response.ok) {
        const message = `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const summary = data && typeof data.final_result === 'string' ? data.final_result : '';
      if (!summary) {
        this.setState({ summary: '', error: 'No summary returned from the server.' });
      } else {
        this.setState({ summary, error: '' });
      }
    } catch (err) {
      this.setState({
        error: 'Unable to summarize text at the moment. Please try again.',
        summary: ''
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleClearResults() {
    this.setState({ summary: '', error: '' });
  }

  render() {
    const { summary, loading, error } = this.state;

    return (
      <div className="app-root">
        <div className="app-container">
          <header className="app-header">
            <h1 className="brand">Text Summarizer</h1>
            <p className="subtitle">Summarize long text into concise insights</p>
          </header>

          <main className="app-content">
            <section className="panel">
              <TextAnalyzer handleSubmit={this.handleSubmit} loading={loading} />
            </section>
            <section className="panel">
              <ResultDisplay
                summary={summary}
                error={error}
                loading={loading}
                onClear={this.handleClearResults}
              />
            </section>
          </main>

          <footer className="app-footer">
            <span>Built with React Class Components</span>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
