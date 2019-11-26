import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from './components/Navbar'
import LoggedinNavbar from './container/LoggedinNavbar'
import ScrollToTop from './components/ScrollToTop'
import 'firebase/firestore'
import Top from './top/Top'
import Profile from './profile/Profile'
import Photo from './photo/Photo'
import settings from './settings/Settings'
import './App.scss';
import firebase from './plugins/firebase'
import getRedirectResult from './plugins/getRedirectResult'
import auth from './plugins/auth'
import { connect } from 'react-redux'
import { loginUser } from './actions';

class App extends React.Component {
  componentDidMount = async () => {
    console.log('componentDidMount')
    const authUser = await auth()
    if (authUser === false) return
    console.log({ authUser })
    this.props.loginUser(authUser)
    const redirectResult = await getRedirectResult()
    console.log({ redirectResult })
    console.log('state確認')
    console.log(this.props.isLogin)
    console.log(this.props.loginUserInfo)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop>
            <LoggedinNavbar />
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

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    loginUserInfo: state.loginUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => {
      dispatch(loginUser(user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
