import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoggedinNavbar from './container/LoggedinNavbar'
import ScrollToTop from './components/ScrollToTop'
import Top from './top/Top'
import Profile from './profile/Profile'
import Photo from './photo/Photo'
import settings from './settings/Settings'
import './App.scss';
import NotFound from './notFound/NotFound'
import Auth from './components/Auth'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Auth>
          <ScrollToTop>
            <LoggedinNavbar />
            <div>
              <Switch>
                <Route exact path="/" component={Top} />
                <Route path="/user/:username" component={Profile} />
                <Route path="/photo/:id" component={Photo} />
                <Route path="/settings" component={settings} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </ScrollToTop>
        </Auth>
      </Router>
    </div>
  )
}

export default App
