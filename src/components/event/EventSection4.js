import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from '../Modal'
import HistoryPiece from '../HistoryPiece'
import SharePopup from '../SharePopup'
import swal from "sweetalert2"
import moment from 'moment'
import lodash from 'lodash'
import Clipboard from 'react-clipboard.js';
class EventSection3 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            reward_list_spin: [],
            spin_count: 0,
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
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.eventProps.event)
        if (nextProps.eventProps.event.spin_count != null) {
            this.setState({
                spin_count: nextProps.eventProps.event.spin_count
            })
        }

    }
    convertDateForIos(date) {
        var arr = date.split(/[- :]/);
        date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        return date;
    }
    countdownItem(time) {
        let runDate = this.convertDateForIos(moment.unix(time).format('YYYY-MM-DD HH:mm:ss'))
        console.log(runDate)
        setTimeout(() => {
            $('.countdown').countdown({
                date: runDate,
                render: function (data) {
                    $(this.el).html('còn lại ' + (parseInt(this.leadingZeros(data.hours, 2))+ parseInt(this.leadingZeros(data.days, 2)*24)) + ':' + this.leadingZeros(data.min, 2) + ':'+this.leadingZeros(data.sec, 2));
                }
            });
        }, 1000);
    }
    claimCake(targe) {
        this.props.eventProps.claimCake(targe)
    }
    render() {
        const { modal, isMobile, spin_count } = this.state
        return (
            <React.Fragment>
                <div className="happy-cake" id="section4">
                    <div className="fo4-container">
                        <div className="title">
                            <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/xaybanh_tittle.png" alt="" />
                        </div>
                        <p className="des">
                            Thời gian: <b>14/06 - 21/06</b> <br />
                            Mỗi vòng quay của các HLV từ vòng quay đại tiệc sẽ góp phần trang trí chiếc bánh sinh nhật FIFA Online 4 1 tuổi thêm phần hoành tráng. Khi đạt đủ mốc, các HLV đã đóng góp sẽ nhận được một món quà ngẫu nhiên thay cho lời cám ơn sâu sắc từ FIFA Online 4.
                        </p>
                        <div className="cake">
                            <div className="wrap-cake-base">
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/c-cake.png" alt="" className="base-cake" />
                                <div className="c-cake"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd-cake.png" alt="" /></div>
                                {
                                    spin_count >= 3000000 &&
                                    <div className="c-flag animated fadeInUp"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd-cake-flag.png" alt="" /></div>
                                }
                                <div className="c-1st"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd-1st.png" alt="" /></div>
                                {
                                    spin_count >= 1000000 &&
                                    <div className="c-deco animated zoomIn"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd-cake-deco.png" alt="" /></div>
                                }
                                {
                                    spin_count >= 2000000 &&
                                    <div className="c-card animated fadeInLeft"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/bd-cake-card.png" alt="" /></div>
                                }
                            </div>
                            <a href="javascript:void(0)" className="btn-gift" onClick={e => this.handleOpenPopup('gift-cake')}>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/btn-gift.png" alt="" />
                            </a>
                            <a href="javascript:void(0)" className="btn-end-time">
                                <div className="wrap-btn">
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/btn-end.png" alt="" />
                                    <div className="count-down">
                                        {
                                            this.props.eventProps.event.end_time &&
                                            <span className="countdown">{this.countdownItem(this.props.eventProps.event.end_time)}</span>
                                        }
                                        {/* <span className="countdown">00:00:00</span> */}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="progress-gift">
                            <div className="wrap-progress">
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/progress-bar.png" alt="" />
                                <div className="wrap-inner">
                                    <div className="pro-iner" title={spin_count} style={{ width: (spin_count / 5000000) * 100 + '%' }}></div>
                                    <a onClick={e => this.claimCake(4)} href="javascript:void(0)" className={`target target-1 ${spin_count >= 2000000 ? 'active' : ''}`}>
                                        <span>2.000.000</span>
                                        <div className="gift"></div>
                                    </a>
                                    <a onClick={e => this.claimCake(5)} href="javascript:void(0)" className={`target target-2 ${spin_count >= 5000000 ? 'active' : ''}`}>
                                        <span>5.000.000</span>
                                        <div className="gift"></div>
                                    </a>
                                    <span style={{ left: ((spin_count / 5000000) * 100) - 6.4 + '%' }} className="cake-tooltip">{spin_count} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cake-glich">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/cake_glitch.png" alt="" />
                    </div>
                </div>
                <Modal show={modal === 'gift-cake'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-Quangaunhien.png" alt="" />
                </Modal>
            </React.Fragment>

        )
    }
}

export default EventSection3
