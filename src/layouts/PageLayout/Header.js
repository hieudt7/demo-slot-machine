import React from "react";
import Modal from 'components/Modal'
import moment from 'moment'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      user_rewards_infos: null
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentUser.currentUser.user_rewards_infos != null) {
    //   this.setState({
    //     user_rewards_infos: nextProps.currentUser.currentUser.user_rewards_infos
    //   })
    // }
  }
  handleClosePopup() {
    this.setState({ modal: null })
    $('body').removeClass('modal-open');
  }
  handleOpenPopup(modal) {
    this.setState({ modal: modal })
    $('body').addClass('modal-open');
  }
  handleViewHistory() {
    this.handleOpenPopup('history')
  }
  ScrollMenu(element) {
    $('section').removeClass('animate-in')
    $(element).addClass('animate-in')
    if (element === '.information') {
      setTimeout(() => {
        $('#flatPlayerSlick .player-info').slick({
          dots: false,
          infinite: true,
          speed: 0,
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: '60px',
          initialSlide: 15,
          responsive: [
            {
              breakpoint: 969,
              settings: {
                dots: false,
                infinite: true,
                speed: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '60px',
                initialSlide: 15,
              }
            },
          ]
        });
      }, 100);
    }
  }
  commingSoon() {
    swal({
      title: 'Thông báo',
      html: '<p class="pop-content">Sự kiện sẽ bắt đầu vào 11h00 ngày 14/06/2019</p>',
      animation: false,
      confirmButtonText: 'Đóng',
      customClass: 'custom-modal animated zoomIn'
    })
    return
  }
  render() {
    let { currentUser } = this.props;
    const { modal, user_rewards_infos } = this.state
    console.log(currentUser.event)
    return (
      <React.Fragment>
        <header>
          <div className="fo4-container">
            <div className="moblie-nav">
              <ul>
                <li className="mlogo">
                  <img src="images/logo.png" alt="" />
                </li>
                <li className="mb-toogle">
                  <button data-toggle="collapse" data-target="#navbarSupportedContent" className="btn-menu-mobile">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </li>
                <li className="msocial">
                  <a target="_blank" href="https://fo4.garena.vn/"><img src="images/mb_home.png" alt="true" /></a>
                  <a target="_blank" href="https://www.facebook.com/officialfo4vn/"><img src="images/mb_fb.png" alt="true" /></a>
                  <a target="_blank" href="https://www.youtube.com/channel/UCrCqu1n0H52uGETAoSmgNdQ/featured"><img src="images/mb_yt.png" alt="true" /></a>
                </li>
              </ul>
            </div>
            <div className="collapse" id="navbarSupportedContent">
              <ul className="menu">
                <li className="nav-item logo">
                  <a className="nav-link" href="https://fo4.garena.vn/"><img src="images/logo.png" alt="" /></a>
                </li>
                <li className="menu-sub">
                  <ul>
                    <li>
                      <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section1')}><span> Home</span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section2')}><span> vòng quay</span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section3')}><span> đổi mảnh</span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section4')}><span> bánh sinh nhật</span></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section5')}><span> Sự kiện FO3</span></a>
                    </li>
                    {!currentUser.event.login ? (
                      <React.Fragment>
                        <li>
                          <a className="action" href="/user/login"><span>ĐĂNG NHẬP</span></a>
                        </li>
                      </React.Fragment>
                    ) : (
                        <React.Fragment>
                          <li className="user">
                            <a href="/user/logout" title="Đăng Xuất" className="txt-user">
                              <span>Xin chào HLV</span><b> {currentUser.event.user.nickname} ( đăng xuất)</b>
                            </a>
                          </li>
                        </React.Fragment>
                      )}
                    {/* <li>
                      <a href="/su-kien">sự kiện</a>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
