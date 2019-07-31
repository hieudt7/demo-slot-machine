import React from 'react'
import Modal from 'components/Modal'
import Header from 'layouts/PageLayout/Header'
import { player, gallery, galleryMobile } from 'components/common'
import Scrollbar from 'react-scrollbars-custom';
// import {geolocated} from 'react-geolocated';

let timmer, gridForLoop;
class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: 'youtube',
      isMobile: false,
      selectedItem: null,
      isShowDetail: false,
      seletecPlayer: null,
      selectedGallery: null,
      isCollapse: false,
      isAnimation: true,
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
    setTimeout(() => {
      AOS.init({
        offset: 0,
        easing: 'ease-out-back',
        duration: 1500
      });
    }, 500);
    if ($(window).width() < 1023) {
      this.setState({
        isMobile: true,
        selectedGallery: galleryMobile[0],
        isCollapse:true,
      })
      setTimeout(() => {
        $('#flatPlayerSlick .player-info').slick({
          dots: false,
          infinite: true,
          speed: 0,
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: '60px',
          initialSlide: 5,
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
              }
            },
          ]
        });
      }, 100);
    }
    else {
      this.setState({
        selectedGallery: gallery[0]
      })
      this.onePageScroll()
    }
  }

  componentWillReceiveProps(nextProps) {
  }
  showPlayerInfo(id, isSlide) {
    let result = player.filter(obj => {
      return obj.id === id
    })
    this.setState({
      isShowDetail: true,
      seletecPlayer: result[0],
      isAnimation: false,
    })
    setTimeout(() => {
      this.setState({
        isAnimation: true,
      })
    }, 500);
  }
  showListPlayer() {
    this.setState({
      isShowDetail: false
    })
    setTimeout(() => {
      $('#flatPlayerSlick .player-info').slick({
        dots: false,
        infinite: true,
        speed: 0,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: '60px',
        initialSlide: 5,
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
            }
          },
        ]
      });
    }, 100);
  }
  onePageScroll() {
    let scrollEnabled = true
    setTimeout(function () {
      $('section').find('[data-aos]').removeClass('aos-animate');
      $('.sec-1').find('[data-aos]').addClass('aos-animate');
    }, 100)
    $('main').on('DOMMouseScroll mousewheel', function (event) {
      if ($(event.target).hasClass('img-slide')) {
        return
      }
      event.stopPropagation()
      let currentSection = $('.animate-in');
      if ($(window).width() <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        return
      if (!scrollEnabled)
        return;
      let target;
      if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
        if (currentSection.next().is('section')) {
          currentSection.next().removeClass('animate-out').addClass('animate-in');
          currentSection.addClass('animate-out').removeClass('animate-in');
          target = currentSection.next().data('class');
          if (currentSection.next().hasClass('information')) {
            setTimeout(() => {
              $('#flatPlayerSlick .player-info').slick({
                dots: false,
                infinite: true,
                speed: 0,
                slidesToShow: 5,
                slidesToScroll: 1,
                centerPadding: '60px',
                initialSlide: 5,
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
                    }
                  },
                ]
              });
            }, 100);
          }
          setTimeout(function () {
            $('section').find('[data-aos]').removeClass('aos-animate');
            $(target).find('[data-aos]').addClass('aos-animate');
            currentSection.find('[data-aos]').removeClass('aos-animate');
          }, 100)
        }
      } else {
        if (currentSection.prev().is('section')) {
          currentSection.prev().removeClass('animate-out').addClass('animate-in');
          currentSection.addClass('animate-out').removeClass('animate-in');
          target = currentSection.prev().data('class');
          if (currentSection.prev().hasClass('information')) {
            setTimeout(() => {
              $('#flatPlayerSlick .player-info').slick({
                dots: false,
                infinite: true,
                speed: 0,
                slidesToShow: 5,
                slidesToScroll: 1,
                centerPadding: '60px',
                initialSlide: 5,
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
                    }
                  },
                ]
              });
            }, 100);
          }
          setTimeout(function () {
            $('section').find('[data-aos]').removeClass('aos-animate');
            $(target).find('[data-aos]').addClass('aos-animate');
          }, 100)
        }
      }
      scrollEnabled = false;
      setTimeout(function () {
        scrollEnabled = true;
      }, 1500);
      return false;
    });
  }
  getColorNumber(value) {
    value = parseInt(value);
    if (value <= 49) return "#ffffff"
    if (value <= 79) return "#ffffff"
    if (value <= 89) return "#2194d6"
    if (value <= 99) return "#175dde"
    if (value <= 109) return "#4f4cd6"
    if (value <= 119) return "#6e3bff"
    return "#dc0000"
  }
  getColorText(value) {
    if (['ST', 'CF', 'LW', 'RW', 'LF'].indexOf(value) >= 0) return "#b01b1b"
    if (['CAM', 'LAM', 'RAM', 'CM', 'LM', 'RM', 'CDM'].indexOf(value) >= 0) return "#69b24d"
    if (['CB', 'LB', 'RB', 'SW', 'LWB', 'RWB'].indexOf(value) >= 0) return "#2652aa"
    if (['GK'].indexOf(value) >= 0) return "#ffc107"
  }
  renderHideIndexs(item, index) {
    if (!item)
      return
    let key = this.state.seletecPlayer.HideIndex.data[index]
    let results = []
    results.push(
      <div
        id={"hiddenIndex" + index}
        className={"HiddenIndex animated fadeInRight"}
        key={index}
      >
        <img src={`https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-tournament-champion-2019/images/hideindexs/${key}.png`} alt="" data-toggle="tooltip" title={'<div class="wrapper-tooltip"><div class="title">' + item + '</div><div class="detail">' + this.state.seletecPlayer.HideIndex.des[index] + '</div></div>'} data-html="true" />
      </div>
    )

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip()
    }, 500);
    return results
  }
  renderSkillLevel(level) {
    level = parseInt(level);
    let gray = 5 - level;
    let results = []
    for (let i = 0; i < gray; i++) {
      results.push(<img key={i} src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/rating_gray.png" alt="" />)
    }
    for (let i = 0; i < level; i++) {
      results.push(<img key={i + 100} src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/rating_yellow.png" alt="" />)
    }
    return results
  }
  checkActiveSlide(id) {
    if (!this.state.seletecPlayer) {
      return
    }
    if (this.state.seletecPlayer.id == id) {
      return 'active'
    }
  }
  checkActiveGallery(id) {
    if (!this.state.selectedGallery) {
      return
    }
    if (id == this.state.selectedGallery.id) {
      return 'active'
    }
  }
  toDataURL(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
      var fileReader = new FileReader();
      fileReader.onloadend = function () {
        callback(fileReader.result);
      }
      fileReader.readAsDataURL(httpRequest.response);
    };
    httpRequest.open('GET', url);
    httpRequest.responseType = 'blob';
    httpRequest.send();
  }
  downloadGallery() {
    this.toDataURL(this.state.selectedGallery.link, function (dataUrl) {
      var a = $("<a>")
        .attr("href", dataUrl)
        .attr("download", "FO4_Wallpaper_1920x1080.jpg")
        .appendTo("body");
      a[0].click();
      a.remove();
    })
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
  render() {
    const { modal, isMobile, isShowDetail, seletecPlayer, selectedGallery, isCollapse, isAnimation } = this.state
    let { home } = this.props
    return (
      <React.Fragment>
        <Header />
        <div className="main-body onepage-scroll">
          <section className="sec-1 animate-in">
            <div className="title">
              <div className="glichhh img-title animated zoomIn">
                <div className="glitch-event">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1-title.png" alt="" />
                  <div className="glitch-img"></div>
                  <div className="glitch-img"></div>
                  <div className="glitch-img"></div>
                  <div className="glitch-img"></div>
                  <div className="glitch-img"></div>
                </div>
              </div>
            </div>
            <div className="bot-info">
              <div className="wrap-player">
                <div className="player-1 animated fadeIn">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_vd.png" alt="" />
                </div>
                <div className="player-2 animated fadeIn">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_nh.png" alt="" />
                </div>
                <div className="player-3 animated fadeIn">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_vl.png" alt="" />
                </div>
                <div className="player-4 animated fadeIn">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_vt.png" alt="" />
                </div>
                <div className="player-5 animated fadeIn">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_vth.png" alt="" />
                </div>
                <div className="vn-logo animated fadeInDown">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/vn-logo.png" alt="" />
                </div>
                <div className="vn-avatar animated fadeInUp">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1-logo.png" alt="" />
                </div>
              </div>
            </div>
            <div className="player-shadow">
              <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/p_shadow.png" alt="" />
            </div>
            <div className="glich-bg animated fadeIn">
              <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/s1-glicth.png" alt="" />
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
            </div>
            <a href="javascript:void(0)" onClick={() => this.handleOpenPopup('youtube')} className="view-trailler"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/btn_view_trailler.png" alt="" /></a>
            <div className="scroll-btn">
              <a href="javascript:void(0)" className="in-active"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-up.png" alt="" /></a>
              <a href="javascript:void(0)" onClick={() => this.ScrollMenu('.information')}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-down.png" alt="" /></a>
            </div>
          </section>
          <section className="information">
            <div className="info-container">
              {
                !isShowDetail ? (
                  <div id="flatPlayerSlick" className="player-list">
                    <ul className="player-info">
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_2')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd_act.png" alt="" className="active vd-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_1')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh_act.png" alt="" className="active nh-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_3')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_5')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt_act.png" alt="" className="active vt-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_4')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_2')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd_act.png" alt="" className="active vd-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_1')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh_act.png" alt="" className="active nh-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_3')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_5')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt_act.png" alt="" className="active vt-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_4')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_2')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd_act.png" alt="" className="active vd-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_1')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh_act.png" alt="" className="active nh-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_3')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_5')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt_act.png" alt="" className="active vt-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_4')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>

                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_2')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vd_act.png" alt="" className="active vd-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_1')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nh_act.png" alt="" className="active nh-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_3')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vl_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInDown">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_5')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vt_act.png" alt="" className="active vt-active" />
                          </span>
                        </a>
                      </li>
                      <li className="animated fadeInUp">
                        <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_4')}>
                          <span>
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth.png" alt="" />
                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vth_act.png" alt="" className="active" />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                    <React.Fragment>
                      {
                        seletecPlayer &&
                        <div className="player-Detail animated zoomIn">
                          <a className="btn_back" href="javascript:void(0)" onClick={() => this.showListPlayer('id')} title="Quay lại"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/back.png" alt="" /></a>
                          <div className="box-detail">
                            <div className="box-avatar">
                              <img src={seletecPlayer.avatar} alt="" className={`avatar ${seletecPlayer.class} animated fadeInLeft`} />
                            </div>
                            <div className="box-info">
                              {isAnimation &&
                                <div className="box-info-content">
                                  <div className="top-info animated fadeInLeft">
                                    <span className="pIndex">
                                      <span className="green" style={{ "color": this.getColorText(seletecPlayer.general.label[0]) }}>{seletecPlayer.general.label[0]}</span><span>{seletecPlayer.general.data[0]}</span>
                                    </span>
                                    <span className="pIndex">
                                      <span className="green" style={{ "color": this.getColorText(seletecPlayer.general.label[1]) }}>{seletecPlayer.general.label[1]}</span><span>{seletecPlayer.general.data[1]}</span>
                                    </span>
                                    <span className="pIndex">
                                      <span className="green" style={{ "color": this.getColorText(seletecPlayer.general.label[2]) }}>{seletecPlayer.general.label[2]}</span><span>{seletecPlayer.general.data[2]}</span>
                                    </span>
                                    <span className="pIndex dob">
                                      <span className="">NS</span><span>{seletecPlayer.dob}</span>
                                    </span>
                                  </div>
                                  <div className="person-info">
                                    <ul>
                                      <li className="animated fadeInDown">
                                        <span>lương</span>
                                        <span className="salary">
                                          <span>{seletecPlayer.salary}</span>
                                          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/salary.png" alt="" />
                                        </span>
                                      </li>
                                      <li className="animated fadeInDown iBig">{seletecPlayer.height}</li>
                                      <li className="animated fadeInDown iBig">{seletecPlayer.weight}</li>
                                      <li className="animated fadeInDown">{seletecPlayer.look}</li>
                                      <li className="animated fadeInDown">
                                        <div className={`foot-left ${seletecPlayer.footPointL >= 5 ? "active" : null}`}>
                                          <span>{seletecPlayer.footPointL}</span>
                                        </div>
                                        <div className={`foot-right ${seletecPlayer.footPointR >= 5 ? "active" : null}`}>
                                          <span>{seletecPlayer.footPointR}</span>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="detail-info">
                                    <div className="row-info">
                                      <ul>
                                        {
                                          seletecPlayer.detail.label.map((item, idx) => (
                                            <li>
                                              <span className="animated fadeInLeft">{item}</span>
                                              <span className="animated fadeInRight" style={{ "color": this.getColorNumber(seletecPlayer.detail.data[idx]) }}>{seletecPlayer.detail.data[idx]}</span>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="hide-index">
                                    <span className="animated fadeInLeft">Chỉ số ẩn gốc</span>
                                    <div className="hide-wrap">
                                      {
                                        seletecPlayer.HideIndex.label.map((item, idx) => (
                                          this.renderHideIndexs(item, idx)
                                        ))
                                      }
                                    </div>
                                  </div>
                                  <div className="tech">
                                    <span className="animated fadeInLeft">kỹ thuật</span>
                                    <span className="animated fadeInUp">{this.renderSkillLevel(seletecPlayer.Rating)}</span>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                          <ul className="slide-right">
                            <li className={`${this.checkActiveSlide('player_2')}`}>
                              <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_2', true)}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_pvd.png" alt="" />
                              </a>
                            </li>
                            <li className={`${this.checkActiveSlide('player_3')}`}>
                              <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_3', true)}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_dvl.png" alt="" />
                              </a>
                            </li>
                            <li className={`${this.checkActiveSlide('player_4')}`}>
                              <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_4', true)}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_vvt.png" alt="" />
                              </a>
                            </li>
                            <li className={`${this.checkActiveSlide('player_5')}`}>
                              <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_5', true)}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_nvt.png" alt="" />
                              </a>
                            </li>
                            <li className={`${this.checkActiveSlide('player_1')}`}>
                              <a href="javascript:void(0)" onClick={() => this.showPlayerInfo('player_1', true)}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide_qnh.png" alt="" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      }
                    </React.Fragment>
                  )
              }
            </div>
            <div className="glich-bg glith-section">
              <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bg_glitch.png" alt="" />
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
              <div className="glitch-img"></div>
            </div>
            <div className="scroll-btn">
              <a href="javascript:void(0)" onClick={() => this.ScrollMenu('.sec-1')}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-up.png" alt="" /></a>
              <a href="javascript:void(0)" onClick={() => this.ScrollMenu('.sec-gallery')}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-down.png" alt="" /></a>
            </div>
          </section>
          <section className="sec-gallery">
            <div className="animated fadeIn">
              <a href="javascript:void(0)" className={`btn-collapse ${isCollapse ? 'active' : ''}`} onClick={() => this.setState({ isCollapse: !isCollapse })}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/slide-arrow-img.png" alt="" /></a>
              <Scrollbar className={`wrap-left-slide ${isCollapse ? 'active' : ''}`}>
                <ul className="left-slide">
                  {!isMobile ? (
                    gallery.map((item, idx) => (
                      <li>
                        <a href="javascript:void(0)" className={`${this.checkActiveGallery(item.id)}`} onClick={() => this.setState({ selectedGallery: item })}>
                          <span className="count">
                            <span>{idx + 1}</span>
                          </span>
                          <img src={item.link} alt="" className="img-slide" />
                        </a>
                      </li>
                    ))
                  ) : (
                      <React.Fragment>
                        {
                          galleryMobile.map((item, idx) => (
                            <li>
                              <a href="javascript:void(0)" className={`${this.checkActiveGallery(item.id)}`} onClick={() => this.setState({ selectedGallery: item })}>
                                <span className="count">
                                  <span>{idx + 1}</span>
                                </span>
                                <img src={item.link} alt="" className="img-slide" />
                              </a>
                            </li>
                          ))
                        }
                      </React.Fragment>
                    )}
                </ul>
              </Scrollbar>
              <div className="slide-content">
                {
                  selectedGallery &&
                  <div className="slide-element">
                    <img src={selectedGallery.link} alt="" />
                  </div>
                }
              </div>
            </div>
            <a href="javascript:void(0)" className="btn_download" onClick={() => this.downloadGallery()}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/btn_download.png" alt="" /></a>
            <div className="scroll-btn">
              <a href="javascript:void(0)" onClick={() => this.ScrollMenu('.information')}><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-up.png" alt="" /></a>
              <a href="javascript:void(0)" className="in-active"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/ico-down.png" alt="" /></a>
            </div>
          </section>
        </div>
        <Modal show={modal === 'youtube'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
          <div className="pop-video">
            <a href="javascript:void(0)" className="close-pop" onClick={() => this.handleClosePopup()}>
              <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/close-pop.png" alt="" />
            </a>
            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/Popup-Clip.png" alt="" />
            <iframe src="https://www.youtube.com/embed/D4GcJtAOb-8?autoplay=1&amp;mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default HomeView
