import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super();
    this.state = {
      sushis: [],
      currentPage: 1,
      maxPages: 1,
      customerBalance: 105,
      eatenSushis: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getMaxPages = (itemCount, perPage) => {
    return Math.ceil(itemCount / perPage);
  }

  getData = () => {
    fetch(API)
      .then(r => r.json())
      .then(data => this.updateData(data));
  }

  updateData = data => {
    let pages = this.getMaxPages(data.length, 4);
    const updatedSushis = data.map(sushi => { return { ...sushi, eaten: false } });
    this.setState({
      sushis: updatedSushis,
      maxPages: pages
    });
  }

  paginateData = data => {
    let perPage = 4;
    let start = ((this.state.currentPage - 1) * perPage);
    let end = start + perPage;
  
    return data.slice(start, end);
  }

  buySushi = (sushiId, sushis = this.state.sushis) => {
    let balance = this.state.customerBalance;
    let eatenSushiId = null;

    let updatedSushis = sushis.map(sushi => {
      let sId = parseInt(sushiId, 10);
      if (sushi.id === sId) {
        if (balance < sushi.price) {
          console.log(`Your remaining balance of $${balance} can't buy this sushi priced at $${sushi.price}`);
          return sushi;
        } else {
          console.log(`Buying sushi for: $${sushi.price}`)
          balance = balance - sushi.price;
          eatenSushiId = sId;
          return { ...sushi, eaten: true }
        }
      } else {
        return sushi;
      }
    });

    // update state only after a sushi has been successfully bought and eaten.
    if (eatenSushiId != null) {
      this.setState({
        sushis: updatedSushis,
        customerBalance: balance,
        eatenSushis: [...this.state.eatenSushis, eatenSushiId]
      });
    }

  }

  handleSushiClick = e => {
    e.preventDefault();
    this.buySushi(e.target.id);
  }

  handleMoreClick = e => {
    e.preventDefault();
    let {currentPage, maxPages} = this.state;
    let page = currentPage === maxPages ? 1 : (currentPage + 1);
    this.setState({
      currentPage: page
    });
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushis={this.paginateData(this.state.sushis)}
          handleSushiClick={e => this.handleSushiClick(e)}
          handleMoreClick={(e) => this.handleMoreClick(e)}
        />
        <Table balance={this.state.customerBalance} eatenSushis={this.state.eatenSushis} />
      </div>
    );
  }
}

export default App;

