import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logoutUser } from '../actions'
import firebase from '../plugins/firebase'
import { Dispatch } from 'redux'
import { UserInterface, StateInterface } from '../reducers'

const mapStateToProps = (state: StateInterface) => {
  return {
    loginUser: state.loginUser,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logoutUser: async () => {
      await firebase.auth().signOut()
      dispatch(logoutUser())
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
  logoutUser: () => void
}
