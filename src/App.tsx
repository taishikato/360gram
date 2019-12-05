import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoggedinNavbar from './container/LoggedinNavbar'
import ScrollToTop from './components/ScrollToTop'
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
import { loginUser, checkingAuth } from './actions';
import getUnixTime from './plugins/getUnixTime'
import uuid from 'uuid/v4'
import { Dispatch } from 'redux'
import { StateInterface, UserInterface } from './reducers'

const db = firebase.firestore()

class App extends React.Component<PropsInterface> {
  constructor(props: PropsInterface) {
    super(props)
  }
  componentDidMount = async () => {
    const authUser = await auth()
    if (authUser === false) {
      this.props.finishCheckingAuth()
      return
    }
    const result = await getRedirectResult()
    if (result.user !== null) {
      if (result.additionalUserInfo.isNewUser) {
        const created = getUnixTime()
        // Sign Up
        console.log('新規ユーザー')
        // ユーザー保存
        const userData = result.user
        const userUid = userData.uid
        const newPublicUserData: UserInterface = {
          uid: userUid,
          name: userData.displayName,
          picture: userData.photoURL.replace('_normal', ''),
          created,
          username: uuid().split('-').join('')
        }
        await db
          .collection('users')
          .doc(userUid)
          .set(newPublicUserData)
        this.props.loginUser(newPublicUserData)
      } else {
        const user = await db
          .collection('users')
          .doc(authUser.uid)
          .get()
        this.props.loginUser(user.data() as UserInterface)
      }
      this.props.finishCheckingAuth()
      return
    }
    // 通常アクセス
    const user = await db
      .collection('users')
      .doc(authUser.uid)
      .get()
    this.props.loginUser(user.data() as UserInterface)
    this.props.finishCheckingAuth()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop>
            <LoggedinNavbar />
            <div>
              <Route exact path="/" component={Top} />
              <Route path="/user/:username" component={Profile} />
              <Route path="/photo/:id" component={Photo} />
              <Route path="/settings" component={settings} />
            </div>
          </ScrollToTop>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state: StateInterface) => {
  return {
    isLogin: state.isLogin,
    loginUserInfo: state.loginUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loginUser: (user: UserInterface): void => {
      dispatch(loginUser(user))
    },
    finishCheckingAuth: (): void => {
      dispatch(checkingAuth(false))
    }
  }
}

interface PropsInterface {
  loginUserInfo: UserInterface,
  isLogin: Boolean,
  loginUser: (user: UserInterface) => void,
  finishCheckingAuth: () => void
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
