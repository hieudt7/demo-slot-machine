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
            special_peice: [],
            shareCode: '',
            exchange: [],
            exhangeType: '',
            shareCodeSuccess: '',
            copied: false,
            isEnoughPiece: false,
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
        if (nextProps.eventProps.event.reward_list_spin != null) {
            let peiceList = nextProps.eventProps.event.reward_list_spin.filter(obj => {
                return obj.special_type === 2
            })
            this.setState({
                reward_list_spin: peiceList
            })
        }
        if (nextProps.eventProps.event.user.user_special_reward_infos != null) {
            let defaulGroupEmpty = nextProps.eventProps.event.user.user_special_reward_infos.filter(obj => {
                return obj.code === ''
            })
            let defaulGroup = this.state.reward_list_spin.concat(defaulGroupEmpty)
            let groupReward = lodash.groupBy(defaulGroup, 'reward_id')
            this.setState({
                special_peice: Object.values(groupReward),
            })
        }
    }
    handleGetHistory() {
        if (!this.props.eventProps.event.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.event.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        this.props.eventProps.GetHistory()
        this.handleOpenPopup('history')
    }
    handleSharePop() {
        if (!this.props.eventProps.event.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.event.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        this.handleOpenPopup('share')
    }
    renderSpecialPiece(reward_id, name) {
        swal({
            title: 'Xác nhận',
            text: 'Bạn có chắc muốn tặng mảnh ' + name + ' không',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Chắc chắn",
            cancelButtonText: "Không",
            animation: false,
            customClass: 'custom-modal-confirm animated zoomIn',
            showCancelButton: true
        }).then(isConfirm => {
            if (isConfirm.value) {
                this.props.eventProps.SharePiece(reward_id, this.callBackShare.bind(this))
            }
        });
    }
    callBackShare(code) {
        this.setState({
            modal: 'shareSuccess',
            shareCodeSuccess: code
        })
    }
    onChangeCode(evt) {
        this.setState({
            shareCode: evt.target.value
        });
    }
    receivePeice() {
        if (!this.props.eventProps.event.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.event.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        this.props.eventProps.ReceivePiece(this.state.shareCode, this.handleClosePopup())
    }
    handleClosePopupRecieve() {
        this.setState({ modal: null, shareCode: '' })
        $('body').removeClass('modal-open');
    }
    exChangeReward(event, reward_id) {
        if (event.target.checked) {
            this.setState(({ exchange = [] }) => ({ exchange: [...exchange, reward_id] }))
        }
        else {
            this.setState(({ exchange }) => ({
                exchange: exchange.filter(
                    (value, index, arr) => {
                        return value !== reward_id;
                    }
                )
            }))
        }
    }
    onChangeExchangeGift(event, type) {
        if (!type || type == null || type == undefined) {
            return
        }
        if (event.target.checked) {
            this.setState({
                exhangeType: type
            })
        }
    }
    checkActiveGift(type) {
        let activeClass = ''
        if (!type || type == null || type == undefined) {
            return
        }
        if (type == this.state.exhangeType) {
            activeClass = 'active'
        }
        return activeClass
    }
    checkClicked(reward_id) {
        let classItem = ''
        let result = this.state.exchange.filter(obj => {
            return obj === reward_id
        })
        if (result.length > 0) {
            classItem = 'is-selected'
        }
        return classItem
    }
    stageClaim(stage) {
        if (this.props.eventProps.event.user.mission_types == null || this.props.eventProps.event.user.mission_types == undefined) {
            return
        }
        let status = ''
        let statusClass = this.props.eventProps.event.user.mission_types.find(item => item === stage);
        if (statusClass) {
            status = 'disable-click'
        }
        return status
    }
    confirmExchange() {
        if (this.state.exchange.length !== this.state.exhangeType) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn phải chọn đủ ' + this.state.exhangeType + ' mảnh để đổi quà.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            return
        }
        swal({
            title: 'Xác nhận',
            text: 'Bạn có chắc muốn đổi qùa ở mốc này không',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Chắn chắn",
            cancelButtonText: "Không",
            animation: false,
            customClass: 'custom-modal-confirm animated zoomIn',
            showCancelButton: true
        }).then(isConfirm => {
            if (isConfirm.value) {
                this.props.eventProps.ExchangePiece(this.state.exchange, this.callBackExchange())
            }
        });
    }
    callBackExchange() {
        this.setState({
            exchange: [],
            exhangeType: ''
        })
    }
    onClosePopExchange() {
        this.handleClosePopup()
        this.setState({
            exchange: [],
            exhangeType: ''
        })
    }
    handleOpenExchangePop() {
        if (!this.props.eventProps.event.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.event.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        this.handleOpenPopup('exchange')
    }
    onSuccess() {
        this.setState({
            copied: true
        })
        setTimeout(() => {
            this.setState({
                copied: false
            })
        }, 2000)
    }
    render() {
        const { modal, isMobile, special_peice, shareCode, shareCodeSuccess, exhangeType, reward_list_spin } = this.state
        return (
            <React.Fragment>

                <div className="sec-4" id="section3">
                    <div className="s4-content">
                        <div className="s4-right">
                            <h4 className="event-sec-title" data-aos="zoom-in">
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/e-s3-title.png" alt="" />
                            </h4>
                            <p className="des" data-aos="zoom-in-left" data-aos-delay="300">
                            Thời gian: <b>14/06 - 21/06</b> <br/>
Thu thập các “Mảnh cầu thủ Việt Nam” sẽ giúp các HLV đổi lấy nhận vật phẩm ingame cực “xịn” và hơn hết là cơ hội sở hữu các “Cầu thủ Việt Nam mới”. Ngoài ra, các HLV có thể tặng mảnh cho nhau để có thể thu thập nhanh chóng hơn.
                            </p>

                        </div>
                        <div className="s4-left">
                            <div className="box-piece">

                                {this.props.eventProps.event.login ? (
                                    <React.Fragment>
                                        {(special_peice.length > 0) &&
                                            special_peice.map((item, index) => (
                                                <div className={`item ${item.length > 1 ? 'active' : ''}`} key={'peice' + index}>
                                                    <span className="number">x<b>{item.length - 1}</b></span>
                                                    <img src={item[0].item_url} alt="" className="img-mode" />
                                                </div>
                                            ))}
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            {(reward_list_spin.length > 0) &&
                                                reward_list_spin.map((item, index) => (
                                                    <div className={`item`} key={'peice' + index}>
                                                        <span className="number">x<b>{0}</b></span>
                                                        <img src={item.item_url} alt={item.item_name} className="img-mode" />
                                                    </div>
                                                ))}
                                        </React.Fragment>
                                    )}

                                <div className={`item active`}>
                                    <img src={'https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/player_card.png'} alt="" className="img-mode" />
                                </div>
                            </div>
                        </div>
                        <div className="group-btn" data-aos="fade-up-right" data-aos-delay="500">
                            <a href="javascript:void(0)" className="skew-btn blue-color" onClick={e => this.handleOpenPopup('rule-piece')}><span>hướng dẫn</span></a>
                            <a href="javascript:void(0)" className="skew-btn purple-color" onClick={e => this.handleOpenPopup('gift-piece')}><span>phần thưởng</span></a>
                            <a href="javascript:void(0)" className="skew-btn green-color" onClick={e => this.handleOpenExchangePop()}><span>đổi phần thưởng</span></a>
                            <a href="javascript:void(0)" className="skew-btn blue-color-2" onClick={e => this.handleOpenPopup('receive')}><span>nhận mảnh</span></a>
                            <a href="javascript:void(0)" className="skew-btn orange-color" onClick={e => this.handleSharePop()}><span>tặng mảnh</span></a>
                            <a href="javascript:void(0)" className="skew-btn red-color" onClick={e => this.handleGetHistory()}><span>lịch sử mảnh</span></a>
                        </div>
                    </div>
                    <div className="glich-bg glith-section">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/piece_glitch.png" alt="" />
                        <div className="glitch-img"></div>
                        <div className="glitch-img"></div>
                        <div className="glitch-img"></div>
                        <div className="glitch-img"></div>
                        <div className="glitch-img"></div>
                    </div>
                </div>
                <Modal show={modal === 'history'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <HistoryPiece history={this.props.eventProps.event} closeHandler={() => this.handleClosePopup()}></HistoryPiece>
                </Modal>
                <Modal show={modal === 'share'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <div className="fire-success">
                        <h3 className="md-header">Tặng mảnh</h3>
                        <p className="des-italic">Điều đặc biệt trong sự kiện lần này, bạn có thể chia sẻ những mảnh tìm được cho bạn bè. Click vào mảnh bạn muốn chọn, sau đó xác nhận và gửi code ngay cho bạn bè nhé.
                            <br />Lưu ý:Mỗi ngày chỉ có thể tặng tối đa 3 mảnh </p>
                        <div className="share-piece">
                            <div className="box-piece box-3">
                                {((special_peice.length > 0) && special_peice) &&
                                    special_peice.map((item, index) => (
                                        <a href="javascript:void(0)" className={`item ${item.length > 1 ? 'active' : ''}`} key={'peice' + index} onClick={e => this.renderSpecialPiece(item[0].reward_id, item[0].item_name)}>
                                            <span className="number">x<b>{item.length - 1}</b></span>
                                            <img src={item[0].item_url} alt="" className="img-mode" />
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal show={modal === 'shareSuccess'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <div className="fire-success">
                        <h3 className="md-header">Tặng mảnh thành công</h3>
                        <p className="des-italic">Chúc mừng, bạn đã tặng mảnh thành công! Hãy gửi code bên dưới cho bạn bè nhé</p>
                        <div className="p-leated">
                            <div className="skew-input input-code">
                                <div className="sk-content">
                                    <input type="text" defaultValue={shareCodeSuccess || ''} id="url-copy" />
                                </div>
                                <Clipboard data-clipboard-text={shareCodeSuccess} onSuccess={this.onSuccess.bind(this)}>
                                    <a href="javascript:void(0)" title="Copy code" className="copy-code"><img src="images/copy-btn.png" alt="" /></a>
                                </Clipboard>
                            </div>
                            {this.state.copied && (<span className="pop-mess animated fadeInUp">Đã copy</span>)}
                        </div>
                    </div>
                </Modal>
                <Modal show={modal === 'exchange'} customClass={'pop-full-body'} closeHandler={() => this.onClosePopExchange()}>
                    <div className="fire-success">
                        <h3 className="md-header">ĐỔI PHẦN THƯỞNG</h3>
                        <p className="des-italic">
                            Trước tiên hãy chọn phần quà, sau đó hãy chọn những mảnh mà bạn muốn đổi lấy vật phẩm.
                        <p className="tnote text-left"> Lưu ý:</p>
                            <ul className="note">
                                <li>
                                    - Mỗi vật phẩm chỉ được đổi giới hạn 1 lần.
                            </li>
                                <li>
                                    - Các mảnh dùng để đổi phải khác nhau
                            </li>
                            </ul>
                        </p>
                        <ul className="piece-list-gift">
                            <li>
                                <label htmlFor={'gift_1'} className={`${this.checkActiveGift(2)} ${this.stageClaim(2)}`}>
                                    <img src={'https://cdn.vn.garenanow.com/web/fo4vn/events/620648.png'} alt="" className="img-gift-ex" />
                                    <input type="radio" name="gift" id={'gift_1'} onChange={e => this.onChangeExchangeGift(e, 2)} />
                                    <span className="ttt">đổi 2 mảnh</span>
                                </label>
                            </li>
                            <li>
                                <label htmlFor={'gift_2'} className={`${this.checkActiveGift(4)} ${this.stageClaim(4)}`}>
                                    <img src={'https://cdn.vn.garenanow.com/web/fo4vn/events/620649.png'} alt="" className="img-gift-ex" />
                                    <input type="radio" name="gift" id={'gift_2'} onChange={e => this.onChangeExchangeGift(e, 4)} />
                                    <span className="ttt">đổi 4 mảnh</span>
                                </label>
                            </li>
                            <li>
                                <label htmlFor={'gift_3'} className={`${this.checkActiveGift(6)} ${this.stageClaim(5)}`}>
                                    <img src={'https://cdn.vn.garenanow.com/web/fo4vn/events/620650.png'} alt="" className="img-gift-ex" />
                                    <input type="radio" name="gift" id={'gift_3'} onChange={e => this.onChangeExchangeGift(e, 6)} />
                                    <span className="ttt">đổi 6 mảnh</span>
                                </label>
                            </li>
                            <li>
                                <label htmlFor={'gift_4'} className={`${this.checkActiveGift(8)} ${this.stageClaim(8)}`}>
                                    <img src={'https://cdn.vn.garenanow.com/web/fo4vn/events/620651.png'} alt="" className="img-gift-ex" />
                                    <input type="radio" name="gift" id={'gift_4'} onChange={e => this.onChangeExchangeGift(e, 8)} />
                                    <span className="ttt">đổi 8 mảnh</span>
                                </label>
                            </li>
                        </ul>
                        <div className="chose-gift-ex">
                            <div className="share-piece">
                                <div className={`box-piece box-3 ${exhangeType != '' ? 'active active-' + exhangeType : ''}`}>
                                    {((special_peice.length > 0) && special_peice) &&
                                        special_peice.map((item, index) => (
                                            <label htmlFor={'item_' + index} className={`item cursor-pointer ${item.length > 1 ? 'active' : ''} ${this.checkClicked(item[0].reward_id)}`} key={'peice' + index}>
                                                <span className="number">x<b>{item.length - 1}</b></span>
                                                <img src={item[0].item_url} alt="" className="img-mode" />
                                                <input type="checkbox" id={'item_' + index} onChange={e => this.exChangeReward(e, item[0].reward_id)} />
                                            </label>
                                        ))}
                                </div>
                                <div className="text-center">
                                    <a href="javascript:void(0)" className={`skew-btn-action ${this.state.exchange.length === this.state.exhangeType ? '' : 'disable-click'}`} onClick={e => this.confirmExchange()}><span>Xác nhận</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal show={modal === 'receive'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopupRecieve()}>
                    <div className="fire-success">
                        <h3 className="md-header">Nhận mảnh</h3>
                        <div className="share-piece">
                            <p className="des-italic">
                                Việc nhận mảnh sẽ thông qua code mà bạn bè của bạn đã tặng. Nhập code mảnh vào chỗ trống dưới đây sẽ giúp bạn nhận được mảnh chứa trong code
                                <br />Lưu ý: Mỗi ngày chỉ có thể nhận tối đa 3 mảnh.
                             </p>
                            <div className="skew-input input-code">
                                <div className="sk-content">
                                    <input type="text" value={shareCode || ''} onChange={e => this.onChangeCode(e)} placeholder="NHẬP CODE TẠI ĐÂY..." />
                                </div>
                            </div>
                            <div className="text-center">
                                <a href="javascript:void(0)" className="skew-btn-action" onClick={e => this.receivePeice()}><span>Xác nhận</span></a>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal show={modal === 'gift-piece'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-Doimanhghep1.png" alt="" />
                </Modal>
                <Modal show={modal === 'rule-piece'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-Huongdanchonhanmanh.png" alt="" />
                </Modal>
            </React.Fragment>
        )
    }
}

export default EventSection3
