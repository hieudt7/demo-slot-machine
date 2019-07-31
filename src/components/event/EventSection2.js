import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from '../Modal'
import Progress from '../Progress'
import History from '../History'
import swal from "sweetalert2"
import moment from 'moment'
let el1, machine1;
let $target = this;
class EventSection2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            reward_list_spin: null,
            spinIdex: 0,
            pName: '',
            pPhone: '',
            pAddress: '',
            pEmail: '',
        }
        this.callbackSlot = this.callbackSlot.bind(this)
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
        if ($(window).width() < 1023) {
            this.setState({
              isMobile: true,
            })
          }
        this.props.eventProps.GetReward(2, this.callbackSlot)
    }
    callbackSlot() {
        let $this = this
        el1 = document.querySelector('#machine1')
        machine1 = new SlotMachine(el1, {
            active: 4,
            delay: 350,
            randomize() {
                console.log($this.state.spinIdex)
                return $this.state.spinIdex;
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.eventProps.event.reward_list_spin != null) {
            this.setState({
                reward_list_spin: nextProps.eventProps.event.reward_list_spin,
            })
        }
    }
    handleUpdateProgress() {
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
        this.props.eventProps.getWin()
        this.handleOpenPopup('progress')
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
            return
        }
        this.props.eventProps.GetHistory()
        this.handleOpenPopup('history')
    }
    handleSpin() {
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
        else if (this.props.eventProps.event.user.total_no_spin - this.props.eventProps.event.user.total_no_spun <= 0) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn đã hết lượt quay.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        else if (this.props.eventProps.event.user.address == null || this.props.eventProps.event.user.email == null || this.props.eventProps.event.user.full_name == null || this.props.eventProps.event.user.phone_number == null) {
            this.handleOpenPopup('udateInfo')
            return
        }
        this.props.eventProps.GetSpin(machine1, this.callBackSlotIndex.bind(this))
    }
    callBackSlotIndex(idx) {
        this.setState({
            spinIdex: idx
        })
    }
    onChangeName(evt) {
        this.setState({
            pName: evt.target.value
        });
    }
    onChangePhone(evt) {
        this.setState({
            pPhone: evt.target.value
        });
    }
    onChangeAddress(evt) {
        this.setState({
            pAddress: evt.target.value
        });
    }
    onChangeEmail(evt) {
        this.setState({
            pEmail: evt.target.value
        });
    }
    onUpdateInfo() {
        if (this.state.pName.trim() == '' || this.state.pPhone.trim() == '' || this.state.pAddress.trim() == '' || this.state.pEmail.trim() == '') {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn phải điền đầy đủ thông tin cá nhân trước khi tham gia sự kiện</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            return
        }
        this.props.eventProps.UpdateInfo(this.state.pPhone, this.state.pName, this.state.pAddress, this.state.pEmail)
        this.setState({
            modal: null
        })
    }
    onClosePopInfo() {
        $('body').removeClass('modal-open');
        this.setState({
            modal: null,
            pName: '',
            pPhone: '',
            pAddress: '',
            pEmail: '',
        })
    }
    render() {
        const { modal, isMobile, reward_list_spin, pName, pPhone, pAddress, pEmail } = this.state
        return (
            <React.Fragment>
                <div className="sec-3" id="section2">
                    <div className="s3-content">
                    {
                        isMobile&&
                        <div className="s3-left">
                            <div className="wrap-content-left">
                                <h4 className="event-sec-title" data-aos="fade-right" data-aos-delay="300">
                                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/vongquay_title.png" alt="" />
                                </h4>
                                <p className="des" data-aos="fade-left" data-aos-delay="450">
                                    Thời gian: <b>14/06 - 21/06</b> <br/>
    Hãy cùng FIFA Online 4 đón sinh nhật 1 tuổi thật hoành tráng với cơ hội rinh trọn combo “Xe máy AirBlade” và “Chuyến tham dự Offline sinh nhật tại TPHCM” cùng hàng ngàn quà tặng hấp dẫn giá trị khác
    
                            </p>
                                <p className="remaining">lượt quay còn lại: <b>{this.props.eventProps.event.user.total_no_spin - this.props.eventProps.event.user.total_no_spun || 0}</b></p>
                                <div className="group-btn" data-aos="fade-up" data-aos-delay="500">
                                    <a href="javascript:void(0)" className="skew-btn purple-color" onClick={e => this.props.eventProps.shareFB('http://sinhnhat.fo4.garena.vn')}><span>share nhận lượt</span></a>
                                    <a href="javascript:void(0)" className="skew-btn green-color" onClick={e => this.handleUpdateProgress()}><span>cập nhật tiến độ</span></a>
                                    <a href="javascript:void(0)" className="skew-btn blue-color-2" onClick={e => this.handleOpenPopup('gift-spin')}><span>quà có thể nhận</span></a>
                                    <a href="javascript:void(0)" className="skew-btn orange-color" onClick={e => this.handleGetHistory()}><span>lịch sử nhận quà</span></a>
                                    <a href="javascript:void(0)" className="skew-btn blue-color" onClick={e => this.handleOpenPopup('rule-psin')}><span>hướng dẫn</span></a>
                                </div>
                            </div>
                        </div>
                  
                    }
                        <div className="s3-right">
                            <div className="spin">
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin-machine.png" alt="" className="bg-spin" />
                                <div className="wrap-spin">
                                    <div className="spin-container">
                                        <div id="machine1" className="randomizeMachine">
                                            {(reward_list_spin) &&
                                                reward_list_spin.map((item, index) => (
                                                    <div className="item-slot" key={'slot_' + index}>
                                                        <img className="machine-img" src={item.item_url} alt={item.item_name} />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:void(0)" className="btn-spin" title="Quay thưởng" onClick={e => this.handleSpin()}>
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/joystick.png" alt="" />
                                </a>
                                <span className="arrow"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin-arrow.png" alt="" /></span>
                                <div className="spin-bubls">
                                    <div className="wrap-relative">
                                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin_bulb_2.png" alt="" />
                                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin_bulb.png" alt="" className="effect" />
                                    </div>
                                </div>
                                <div className="spin-bubls">
                                    <div className="wrap-relative">
                                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin_bulb_s_2.png" alt="" />
                                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin_bulb_s.png" alt="" className="effect effect-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       {
                           !isMobile&&
                        <div className="s3-left">
                            <div className="wrap-content-left">
                                <h4 className="event-sec-title" data-aos="fade-right" data-aos-delay="300">
                                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/vongquay_title.png" alt="" />
                                </h4>
                                <p className="des" data-aos="fade-left" data-aos-delay="450">
                                    Thời gian: <b>14/06 - 21/06</b> <br/>
    Hãy cùng FIFA Online 4 đón sinh nhật 1 tuổi thật hoành tráng với cơ hội rinh trọn combo “Xe máy AirBlade” và “Chuyến tham dự Offline sinh nhật tại TPHCM” cùng hàng ngàn quà tặng hấp dẫn giá trị khác
    
                            </p>
                                <p className="remaining">lượt quay còn lại: <b>{this.props.eventProps.event.user.total_no_spin - this.props.eventProps.event.user.total_no_spun || 0}</b></p>
                                <div className="group-btn" data-aos="fade-up" data-aos-delay="500">
                                    <a href="javascript:void(0)" className="skew-btn purple-color" onClick={e => this.props.eventProps.shareFB('http://sinhnhat.fo4.garena.vn')}><span>share nhận lượt</span></a>
                                    <a href="javascript:void(0)" className="skew-btn green-color" onClick={e => this.handleUpdateProgress()}><span>cập nhật tiến độ</span></a>
                                    <a href="javascript:void(0)" className="skew-btn blue-color-2" onClick={e => this.handleOpenPopup('gift-spin')}><span>quà có thể nhận</span></a>
                                    <a href="javascript:void(0)" className="skew-btn orange-color" onClick={e => this.handleGetHistory()}><span>lịch sử nhận quà</span></a>
                                    <a href="javascript:void(0)" className="skew-btn blue-color" onClick={e => this.handleOpenPopup('rule-psin')}><span>hướng dẫn</span></a>
                                </div>
                            </div>
                        </div>
                       }
                  
                    </div>
                    <div className="sec-3-glitch">
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/spin_glitch.png" alt="" />
                    </div>
                    <div className="spin-deco">
                        <div className="dc1"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_1.png" alt="" data-aos="fade-down-left" data-aos-delay="100" /></div>
                        <div className="dc2"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_2.png" alt="" data-aos="fade-left" data-aos-delay="200" /></div>
                        <div className="dc3"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_3.png" alt="" data-aos="fade-down-left" data-aos-delay="300" /></div>
                        <div className="dc4"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_4.png" alt="" data-aos="fade-left" data-aos-delay="100" /></div>
                        <div className="dc5"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_5.png" alt="" data-aos="fade-up-left" data-aos-delay="200" /></div>
                        <div className="dc6"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-vietnam-player/images/deco_6.png" alt="" data-aos="fade-left" data-aos-delay="300" /></div>
                    </div>
                </div>
                <Modal show={modal === 'progress'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <Progress event={this.props.eventProps.event} closeHandler={() => this.handleClosePopup()}></Progress>
                </Modal>
                <Modal show={modal === 'history'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <History history={this.props.eventProps.event.reward_infos} closeHandler={() => this.handleClosePopup()}></History>
                </Modal>
                <Modal show={modal === 'rule-psin'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-Huongdanvongquaydaitiec.png" alt="" />
                </Modal>
                <Modal show={modal === 'gift-spin'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-Quacothenhan.png" alt="" />
                </Modal>
                <Modal show={modal === 'udateInfo'} customClass={'pop-xs'} closeHandler={() => this.onClosePopInfo()}>
                    <div className="info-account">
                        <h3 className="md-header">thông tin tài khoản</h3>
                        <p className="note">Bạn hãy cung cấp thông tin cá nhân thật đầy đủ và chính xác vì đây chính là cơ sở để FIFA Online 4 có thể gửi quà đến tận tay bạn.
Trong trường hợp bạn điền thông tin sai, FIFA Online 4 sẽ không đủ thông tin và từ chối trao phần thưởng đó.</p>
                        <div className="group-info">
                            <div className="lbel">họ và tên</div>
                            <div>
                                <input type="text" value={pName || ''} onChange={e => this.onChangeName(e)} />
                            </div>
                        </div>
                        <div className="group-info">
                            <div className="lbel">số điện thoại</div>
                            <div>
                                <input type="text" value={pPhone || ''} onChange={e => this.onChangePhone(e)} />
                            </div>
                        </div>
                        <div className="group-info">
                            <div className="lbel">địa chỉ nhận quà</div>
                            <div>
                                <input type="text" value={pAddress || ''} onChange={e => this.onChangeAddress(e)} />
                                <p className="addNote">(Vui lòng điền đầy đủ số nhà, đường, phường, quận/huyện, tỉnh/thành phố)</p>
                            </div>
                        </div>
                        <div className="group-info">
                            <div className="lbel">EMAIL</div>
                            <div>
                                <input type="text" value={pEmail || ''} onChange={e => this.onChangeEmail(e)} />
                            </div>
                        </div>
                        <div className="text-center grp-btn">
                            <a href="javascript:void(0)" className="skew-btn-action" onClick={e => this.onUpdateInfo()}><span>Xác nhận</span></a>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EventSection2
