import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Footer from './Footer'
import Header from './Header'
import swal from "sweetalert2"
import { getCurrentUser, getHistory, updateInfo } from 'authentication/actions'
// import { getCurrentUser} from 'routes/Home/modules/actions'
class PageLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
    }
  }
  componentDidMount() {
    $(window).resize(function() {
      let e = $(window).width();
      e >= 1920 ? $("html").css("font-size", "10px") : e >= 1200 ? $("html").css("font-size", 10 * e / 1920 + "px") : e >= 1100 ? $("html").css("font-size", "8px") : $("html").css("font-size", 10 * e / 1300 + "px")
    })
    $(window).trigger('resize')
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
   
  }

  render() {
    const { modal } = this.state
    return (
      <div id={`wrapper`}>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}
PageLayout.propTypes = {
  children: PropTypes.node,
}

const mapDispatchToProps = {
  getCurrentUser: getCurrentUser,
  updateInfo: updateInfo,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  location: state.location,
  home: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
