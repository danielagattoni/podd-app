import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import HomeView from 'views/HomeView.js';
import StoreView from 'views/StoreView.js';

class App extends Component {
  render() {
    return(
      <Router>
        <div className="App">
          <Header />
          <main className="MainContent">
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/stores" component={StoreView} />
            </Switch>
          </main>
          <Footer />
        </div>
    </Router>
    );
  }
}

export default App;
