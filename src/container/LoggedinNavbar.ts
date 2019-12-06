import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logoutUser } from '../actions'
import firebase from '../plugins/firebase'
import { Dispatch } from 'redux'
import { UserInterface, StateInterface } from '../reducers'

const mapStateToProps = (state: StateInterface) => {
  return {
    loginUser: state.loginUser,
    isLogin: state.isLogin,
    checkingAuth: state.checkingAuth
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logoutUser: async (history: any) => {
      await firebase.auth().signOut()
      dispatch(logoutUser())
      history.push('/')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export interface PropsInterface {
  isLogin: StateInterface['isLogin'],
  loginUser: UserInterface,
  checkingAuth: StateInterface['checkingAuth'],
  logoutUser: (history: any) => void
}
