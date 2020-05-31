import React from 'react';
import { fetchQuotes } from './fetchQuotes';
import './App.css';

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: {},
      quoteToDisplay: {}
    }
  }
  
  async componentWillMount() {
    const quotes = await fetchQuotes();
    this.setState({quotes: quotes}, () => this.getQuote());
  }

  getQuote = () => {
    const len = this.state.quotes.length;
    if (len > 1) {
      const randomQuoteIndexx = Math.floor(Math.random() * len);
      const quote = this.state.quotes[randomQuoteIndexx];
      this.setState({
        quoteToDisplay: quote
      })
    }
    
  }

  render() {
    const quoteToDisplay = this.state.quoteToDisplay;
    return (
      <div id="quote-box">
        <div>
          <p id="text">
            {`"${quoteToDisplay.quote || ''}"`}
          </p>
        </div>
        <div>
          <p id="author">
            {`-- ${quoteToDisplay.author || ''}`}
          </p>
        </div>
        <div className="btn-group">
          <input type="button" id="new-quote" value="New Quote" onClick={this.getQuote}/>
          <a id="tweet-quote" href="twitter.com/intent/tweet">Tweet Quote</a>
        </div>
    	</div>
    )
  }
};

export default QuoteBox;