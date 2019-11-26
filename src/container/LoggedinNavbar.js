import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logoutUser } from '../actions'
import firebase from '../plugins/firebase'

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = dispatch => {
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
