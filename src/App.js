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
import 'firebase/firestore'
import getRedirectResult from './plugins/getRedirectResult'
import auth from './plugins/auth'
import { connect } from 'react-redux'
import { loginUser } from './actions';
import getUnixTime from './plugins/getUnixTime'

const db = firebase.firestore()

class App extends React.Component {
  componentDidMount = async () => {
    const authUser = await auth()
    if (authUser === false) return
    const result = await getRedirectResult()
    if (result.user !== null) {
      if (result.additionalUserInfo.isNewUser) {
        const created = getUnixTime()
        // Sign Up
        console.log('新規ユーザー')
        // ユーザー保存
        const userData = result.user
        const userUid = userData.uid
        const newPublicUserData = {
          uid: userUid,
          name: userData.displayName,
          picture: userData.photoURL.replace('_normal', ''),
          created
        }
        await db
          .collection('users')
          .doc(userUid)
          .set(newPublicUserData)
        this.props.loginUser(newPublicUserData)
      } else {
        console.log('既存ユーザーログイン')
        const user = await db
          .collection('users')
          .doc(authUser.uid)
          .get()
        this.props.loginUser(user.data())
      }
      return
    }
    // 通常アクセス
    const user = await db
      .collection('users')
      .doc(authUser.uid)
      .get()
    this.props.loginUser(user.data())
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
