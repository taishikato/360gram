import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Navbar'
import Top from './Top'
import Profile from './Profile'
import './Bulma.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Route exact path="/" component={Top} />
          <Route path="/user/:id" component={Profile} />
        </div>
      </Router>
    </div>
  );
}

export default App;
