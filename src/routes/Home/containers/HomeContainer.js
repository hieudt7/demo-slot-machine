import { connect } from 'react-redux'
import HomeView from '../components/HomeView'

import {
  getCurrentUser,
  shareFB,
} from '../modules/actions'

const mapDispatchToProps = {
  getCurrentUser,
  shareFB,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  home: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
