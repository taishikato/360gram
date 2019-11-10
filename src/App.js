import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import 'firebase/firestore'
import Top from './top/Top'
import Profile from './profile/Profile'
import Photo from './photo/Photo'
import settings from './settings/Settings'
import './assets/Bulma.scss';
import './App.scss';
import firebase from './plugins/firebase'
import auth from './plugins/auth'

const firestore = firebase.firestore()

export default class App extends React.Component {
  componentDidMount = async () => {
    console.log('componentDidMount')
    const authResult = await auth()
    console.log({ authResult })
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
              <Route path="/settings" component={settings} />
            </div>
          </ScrollToTop>
        </Router>
      </div>
    )
  }
}
