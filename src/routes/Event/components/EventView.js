import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Header from 'layouts/PageLayout/Header'
import Modal from 'components/Modal'
import EventSection1 from 'components/event/EventSection1'
import EventSection2 from 'components/event/EventSection2'
import EventSection3 from 'components/event/EventSection3'
import EventSection4 from 'components/event/EventSection4'
import swal from "sweetalert2"
import moment from 'moment'
import Scrollspy from 'react-scrollspy'
class EventView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      mission_infos: [],
    }
  }
  handleClosePopup() {
    this.setState({ modal: null })
    $('body').removeClass('modal-open');
  }
  handleOpenPopup(modal) {
    this.setState({ modal: modal })
    $('body').addClass('modal-open');
  }

  componentDidMount() {
    //--get api
    let $this = this
    setTimeout(() => {
      AOS.init({
        disable: 'mobile',
        offset: 0,
        easing: 'ease-out-back',
        duration: 1500
      });
    }, 500);
    if ($(window).width() < 1023) {
      this.setState({
        isMobile: true,
      })
    }
    this.props.getCurrentUser()
  }
  componentWillReceiveProps(nextProps) {
    //check if have value
    // if (nextProps.home.isShowModal != null && this.state) {
    //   this.setState({
    //     modal: nextProps.home.isShowModal,
    //   })
    // }
  }
  playNow() {
    $('html,body').stop().animate({
      scrollTop: $('.sec-3').offset().top
    }, 1000);
  }
  smoothScroll(target) {
    $('html,body').stop().animate({
      scrollTop: $(target).offset().top
    }, 1000);
  }
  commingSoon() {
    swal({
      title: 'Thông báo',
      html: '<p class="pop-content">Sự kiện sẽ bắt đầu vào 11h00 ngày 14/06/2019</p>',
      animation: false,
      confirmButtonText: 'Đóng',
      customClass: 'custom-modal animated zoomIn'
    })
  }
  render() {
    const { modal, isMobile, mission_infos } = this.state
    let { event } = this.props;
    return (
      <React.Fragment>
        {
          isMobile &&
          <Header currentUser={this.props}></Header>
        }
        {
          !isMobile &&
          <div className="social only-pc"><a target="_blank" href="https://fo4.garena.vn/"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s_home.png" alt="true" /></a><a target="_blank" href="https://www.youtube.com/channel/UCrCqu1n0H52uGETAoSmgNdQ/featured"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s_yt.png" alt="true" /></a><a target="_blank" href="https://www.facebook.com/officialfo4vn/"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s_fb.png" alt="true" /></a></div>
        }
        <div className="event-page">
          <div className="event-home" id="section1">
            <div className="loading-birthday">
              <div className="wrapper run-animation" id="animate">
                <div className="logo">
                  <span className="marvel">FIFA</span>
                  <span className="studios">ONLINE 4</span>
                  <div className="restart">Sinh Nhật 1 Tuổi</div>
                </div>
              </div>
              <div class="images"></div>
            </div>
            <div className="s1-content">
              <div className="fo4-container">
                {
                  !isMobile ? (
                    <div className="title">
                      <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/e-title.png" alt="" className="title-base" />
                      <div className="bd-bot animated fadeInUp">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_bot.png" alt="" />
                      </div>
                      <div className="bd-left animated fadeInLeft">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_left.png" alt="" />
                      </div>
                      <div className="bd-date animated fadeInDown">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_date.png" alt="" />
                      </div>
                      <div className="bd-1 animated zoomIn">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_1.png" alt="" />
                      </div>
                      <div className="bd-t animated fadeInRight">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_t.png" alt="" />
                      </div>
                      <div className="bd-u">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_u.png" alt="" />
                      </div>
                      <div className="bd-o animated fadeInRight">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_o.png" alt="" />
                      </div>
                      <div className="bd-i animated fadeInRight">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_i.png" alt="" />
                      </div>
                      <div className="bd-mark animated fadeInDown">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_mark.png" alt="" />
                      </div>
                      <div className="bd-fifa animated fadeInRight">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_fifa.png" alt="" />
                      </div>
                      <div className="bd-fire animated fadeIn">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd_fire.png" alt="" />
                      </div>
                    </div>
                  ) : (
                      <div className="title">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/e-title.png" alt="" />
                      </div>
                    )
                }
                <div className="main-character">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/e-s1-vanlam.png" alt="" />

                </div>
                {
                  !isMobile ? (
                    <React.Fragment>
                      <div className="sub-char-1">
                        <a href="https://fo4.garena.vn/dai-tiec-offline-sinh-nhat-1-tuoi/" target="_blank" className="wrap-box-dance box-4">
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b4_box.png" alt="" className="base" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b4_char.png" alt="" className="character" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b4_title.png" alt="" className="b-title" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b4_ico.png" alt="" className="b-icon" />
                        </a>
                      </div>
                      <div className="sub-char-2">
                        <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section2')} className="wrap-box-dance box-2">
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b2_box.png" alt="" className="base" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b2_char.png" alt="" className="character" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b2_title.png" alt="" className="b-title" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b2_ico.png" alt="" className="b-icon" />
                        </a>
                      </div>
                      <div className="sub-char-3">
                        <a href="https://vietnam.fo4.garena.vn/" target="_blank" className="wrap-box-dance box-3">
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b3_box.png" alt="" className="base" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b3_char.png" alt="" className="character" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b3_title.png" alt="" className="b-title" />
                          <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/fix.png" alt="" className="b-icon" />
                        </a>
                      </div>
                      <div className="sub-char-4">
                        <a href="https://fo4.garena.vn/chi-tiet-ban-cap-nhat-thang-6/" target="_blank" className="wrap-box-dance box-1">
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/dance_box_blue.png" alt="" className="base" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b1_char.png" alt="" className="character" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b1_title.png" alt="" className="b-title" />
                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/b1_ico.png" alt="" className="b-icon" />
                        </a>
                      </div>

                    </React.Fragment>
                  ) : (
                      <React.Fragment>
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1_1.png" alt="" className="mb_1" />
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1_2.png" alt="" className="mb_2" />
                        <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/s1_3.png" alt="" className="mb_3" />
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1_4.png" alt="" className="mb_4" />
                      </React.Fragment>
                    )
                }

              </div>
            </div>
            <div className="glichhh img-title">
              <div className="glitch-event">
                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1_glitch.png" alt="" />
                <div className="glitch-img"></div>
                <div className="glitch-img"></div>
                <div className="glitch-img"></div>
                <div className="glitch-img"></div>
                <div className="glitch-img"></div>
              </div>
            </div>
          </div>
          <EventSection2 eventProps={this.props}></EventSection2>
          <EventSection3 eventProps={this.props}></EventSection3>
          <EventSection4 eventProps={this.props}></EventSection4>
          <EventSection1 eventProps={this.props}></EventSection1>
          <div className="land-menu">
            <Scrollspy items={['section1', 'section2', 'section3', 'section4', 'section5']} currentClassName="active">
              <li className="side-home">
                <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section1')}><span> Home</span></a>
              </li>
              <li className="side-spin">
                <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section2')}><span> vòng quay</span></a>
              </li>
              <li className="side-piece">
                <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section3')}><span> đổi mảnh</span></a>
              </li>
              <li className="side-cake">
                <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section4')}><span> bánh sinh nhật</span></a>
              </li>
              <li className="side-mission">
                <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section5')}><span> Sự kiện FO3</span></a>
              </li>
              {!this.props.event.login ? (
                <li>
                  {/* <a href="javascript:void(0)" onClick={e => this.commingSoon()}><span>ĐĂNG NHẬP</span></a> */}
                  <a href="/user/login"><span>ĐĂNG NHẬP</span></a>
                </li>
              ) : (
                  <li className="active active-logout">
                    <a href="/user/logout" title="Đăng Xuất" className="txt-user" title="Đăng xuất">
                      <span>Hi,{this.props.event.user.nickname} (đăng xuất)</span>
                    </a>
                  </li>
                )}
            </Scrollspy>
          </div>
        </div>
        <Footer></Footer>
      </React.Fragment>
    )
  }
}

export default EventView
