import React from 'react';
import {RouteComponentProps} from 'react-router-dom'
import { withRouter } from 'react-router'
import getRedirectResult from '../plugins/getRedirectResult'
import auth from '../plugins/auth'
import getUnixTime from '../plugins/getUnixTime'
import uuid from 'uuid/v4'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { loginUser, checkingAuth } from '../actions';
import { Dispatch } from 'redux'
import { StateInterface, UserInterface } from '../reducers'

const db = firebase.firestore()

class Auth extends React.Component<PropsInterface> {
  componentDidMount = async () => {
    const authUser = await auth()
    if (authUser === false) {
      this.props.finishCheckingAuth()
      console.log('not login')
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
        const username = uuid().split('-').join('')
        const newPublicUserData: UserInterface = {
          uid: userUid,
          name: userData.displayName,
          picture: userData.photoURL.replace('_normal', ''),
          created,
          username
        }

        const newSecretUserData = {
          uid: userUid,
          email: userData.email,
          created
        }
        await Promise.all([
          await db
            .collection('users')
            .doc(userUid)
            .set(newPublicUserData),
          await db
            .collection('secretUsers')
            .doc(userUid)
            .set(newSecretUserData)
        ])
        this.props.loginUser(newPublicUserData)
        this.props.history.push('/settings?mode=signUp')
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
    console.log('通常アクセス')
    // 通常アクセス
    const user = await db
      .collection('users')
      .doc(authUser.uid)
      .get()
    this.props.loginUser(user.data() as UserInterface)
    this.props.finishCheckingAuth()
  }

  render() {
    return this.props.children
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

interface PropsInterface extends RouteComponentProps {
  loginUserInfo: UserInterface,
  isLogin: Boolean,
  loginUser: (user: UserInterface) => void,
  finishCheckingAuth: () => void
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Auth))
