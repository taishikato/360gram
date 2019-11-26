import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logoutUser } from '../actions'

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: dispatch(logoutUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
