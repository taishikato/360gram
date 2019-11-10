import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Navbar'
import Top from './top/Top'
import Profile from './profile/Profile'
import Photo from './photo/Photo'
import ScrollToTop from './ScrollToTop'
import './Bulma.scss';
import './App.scss';

export default class App extends React.Component {
  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop>
            <Navbar />
            <div>
              <Route exact path="/" component={Top} />
              <Route path="/user/:id" component={Profile} />
              <Route path="/photo/:id" component={Photo} />
            </div>
          </ScrollToTop>
        </Router>
      </div>
    )
  }
}
