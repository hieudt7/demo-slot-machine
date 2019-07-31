import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from 'components/Modal'
import swal from "sweetalert2"
import moment from 'moment'
import { dummy } from 'components/common'
import ReactTooltip from 'react-tooltip'
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            mission_infos: [],
            isLogin: false,
            user_mission_infos: [],
            reward_list_mission: [],
            is_mission: 0,
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
        this.props.eventProps.GetMission()
        // this.props.eventProps.UpdateMission()
        setTimeout(() => {
            this.props.eventProps.GetReward(1)
        }, 1000);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.eventProps.event.mission_infos != null) {
            this.setState({
                mission_infos: nextProps.eventProps.event.mission_infos,
            })
        }
        if (nextProps.eventProps.event.user.user_mission_infos != null) {
            this.setState({
                user_mission_infos: nextProps.eventProps.event.user.user_mission_infos,
            })
        }
        if (nextProps.eventProps.event.reward_list_mission != null) {
            this.setState({
                reward_list_mission: nextProps.eventProps.event.reward_list_mission,
            })
        }
        if (nextProps.eventProps.event.user != null) {
            this.setState({
                is_mission: nextProps.eventProps.event.user.user_type,
            })
        }

    }
    checkItemStatus(item) {
        if (item == null || item == undefined) {
            return 'not-active'
        }
        let result = this.state.user_mission_infos.filter(mission => mission.mission_id === item.id)
        let classTxt = ''
        if (result.length > 0) {
            let status = result[0].status
            switch (status) {
                case 1:
                    classTxt = 'is-active'
                    break;
                case 2:
                    classTxt = 'is-done'
                    break;
                default:
                    break;
            }
        }
        return classTxt
    }
    checkDisplayButton(item) {
        if (item == null || item == undefined) {
            return
        }
        let result = this.state.user_mission_infos.filter(mission => mission.mission_id === item.id)
        let classTxt = 'CHƯA NHẬN'
        if (result.length > 0) {
            let status = result[0].status
            switch (status) {
                case 0:
                    classTxt = 'ĐÃ NHẬN NV'
                    break;
                case 1:
                    classTxt = 'NHẬN QUÀ'
                    break;
                case 2:
                    classTxt = 'ĐÃ NHẬN'
                    break;
                case 3:
                    classTxt = 'CHƯA NHẬN'
                    break;
                default:
                    break;
            }
        }
        return classTxt
    }
    claimMissionReward(mission_id) {
        this.props.eventProps.ClaimMission(mission_id)
    }
    getGiftURL(id) {
        if (id == null || id == undefined || id == '') {
            return
        }
        let logo = ''
        let result = this.state.reward_list_mission.filter(reward => reward.reward_id === id)
        if (result.length > 0) {
            logo = result[0].item_url
        }
        return logo
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
        setTimeout(() => {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Cập nhật tiến độ nhiệm vụ thành công.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
        }, 500);
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
    mapEvenStatus(status) {
        if (!status) { return }
        let eventStatus;
        switch (status) {
            case 1:
                eventStatus = 'Đang xử lý'
                break;
            case 2:
                eventStatus = 'Đã gửi'
                break;
            case 3:
                eventStatus = 'Đang xử lý'
                break;
            case 4:
                eventStatus = 'Đang xử lý'
                break;
            case 5:
                eventStatus = 'Đang xử lý'
                break;
            default:
                break;
        }
        return eventStatus
    }
    receiveMission() {
        this.props.eventProps.GetNews()
    }
    render() {
        const { modal, isMobile, mission_infos, is_mission } = this.state
        return (
            <React.Fragment>
                <div className="sec-2" id="section5">
                    <div className="s2-content">
                        <h4 className="event-sec-title" data-aos="fade-up">
                            <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/welcomefo4_title.png" alt="" />
                        </h4>
                        <div className="des" data-aos="fade-up" data-aos-delay="400">
                            Sự kiện diễn ra từ 14/06 - 21/06/2019, dành cho các HLV FO3 có một khởi đầu mạnh mẽ với FIFA Online 4 nhân dịp sinh nhật.
    Nhiệm vụ sẽ được mở mỗi ngày. Hãy đăng nhập vào trang sự kiện, nhấn "NHẬN NHIỆM VỤ", nhanh chóng hoàn thành nhiệm vụ và quay lại nhấn "Cập nhật tiến độ" và "Nhận quà"
 <br />
                        </div>
                        <p className="des text-left f-14">
                            Lưu ý: Dành cho các HLV FIFA Online 3 thỏa 1 trong 2 điều kiện sau: <br />
                            <ul className="no-bullet">
                                <li>- HLV FO3 vẫn còn đăng nhập FO3 từ 04/05/2019 - 04/06/2019 và dùng tài khoản này tạo mới HLV FIFA Online 4 từ 14/6/2019  </li>
                                <li>- Hoặc HLV FO3 vẫn còn đăng nhập FO3 từ 04/05/2019 - 04/06/2019 đã có tài khoản FIFA Online 4 nhưng chưa đăng nhập lại FO4 từ 04/05/2019 - 04/06/2019   </li>
                                <li>- Sự kiện bắt đầu được tính từ lần đầu tiên bạn đăng nhập vào trang sự kiện</li>
                            </ul>
                        </p>
                        <div className="clearfix list-mission">
                            {(mission_infos.length > 0) &&
                                mission_infos.map((item, index) => (
                                    <div className={`item ${this.checkItemStatus(item)}`} key={'mission' + index}>
                                        <div className="content">
                                            <div className="wrap-content">
                                                <div className="date">
                                                    <p className="g-date">
                                                        <span>ngày</span>
                                                        <span className="numb">0{index + 1}</span>
                                                    </p>
                                                </div>
                                                {item ? (

                                                    <React.Fragment>
                                                        <p className="ms-text"><span> {item.name || '???????'}</span></p>
                                                        {
                                                            index !== 10 ? (
                                                                <span className="gift"><img src={this.getGiftURL(item.reward_id)} alt="" data-tip='' data-for={`gtooltip-` + index} /></span>
                                                            ) :
                                                                (
                                                                    <span className="gift"><img src='https://cdn.vn.garenanow.com/web/fo4vn/sm/fullGR.png' alt="" data-tip='' data-for={`gtooltip-` + index} /></span>
                                                                )
                                                        }
                                                    </React.Fragment>

                                                ) : (
                                                        <React.Fragment>
                                                            <p className="ms-text"><span> {'??????? ??????? ???????'}</span></p>
                                                            <span className="gift"><img src='images/random-card.png' alt="" /></span>
                                                        </React.Fragment>
                                                    )}
                                            </div>
                                        </div>
                                        {item ? (
                                            <React.Fragment>
                                                <a href="javascript:void(0)" onClick={e => this.claimMissionReward(item.id)} className="btn-action">{this.checkDisplayButton(item)}</a>
                                                <ReactTooltip place="top" type="light" effect="float" id={`gtooltip-` + index}>
                                                    <div className="tool-tip-prod">
                                                        <div className="tooltip-body">
                                                            {index !== 10 ? (
                                                                <img src={this.getGiftURL(item.reward_id)} alt="" />
                                                            ) :
                                                                (
                                                                    <img src={'images/full-gfft.png'} alt="" />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </ReactTooltip>
                                            </React.Fragment>
                                        ) : (
                                                <a href="javascript:void(0)" className="btn-action">chưa diễn ra</a>
                                            )}
                                    </div>
                                ))}
                        </div>
                        {is_mission === 1 ? (
                            <div className="text-center mt-20 mission-group-btn">
                                <a href="javascript:void(0)" className="skew-btn blue-color-2" onClick={e => this.receiveMission()}><span>Nhận nhiệm vụ</span></a>
                                <a href="javascript:void(0)" className="skew-btn purple-color" onClick={e => this.handleUpdateProgress()}><span>cập nhật tiến độ</span></a>
                                <a href="javascript:void(0)" className="skew-btn orange-color" onClick={e => this.handleGetHistory()}><span>lịch sử nhận quà</span></a>
                                <a href="javascript:void(0)" className="skew-btn blue-color" onClick={e => this.handleOpenPopup('gift-mission')}><span>Hướng dẫn</span></a>
                            </div>
                        ) :
                            (
                                <div className="text-center mt-20">
                                    <p className="des">Bạn không đủ điền kiện tham dự sự kiện này</p>
                                    {/* <p className="des">Sự kiện sẽ bắt đầu vào 11h00 ngày 14/06/2019</p> */}
                                </div>
                            )
                        }

                    </div>
                </div>
                <Modal show={modal === 'history'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <div className="fire-success">
                        <h3 className="md-header">lịch sử nhận quà</h3>
                        <div className="pop-body-history">
                            <table className="tbl-history">
                                <thead>
                                    <tr>
                                        <th>vật phẩm</th>
                                        <th>thời gian nhận</th>
                                        <th>trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.props.eventProps.event.reward_infos) &&
                                        this.props.eventProps.event.reward_infos.filter(item => item.event === 1).map((his, index) => (
                                            <tr key={index}>
                                                <td className="txt-bold">{his.item_name}</td>
                                                <td>{moment(his.create_time).format('DD/MM/YYYY HH:mm')}</td>
                                                <td><span>{this.mapEvenStatus(his.status)}</span></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
                <Modal show={modal === 'gift-mission'} customClass={'pop-full-body pop-transperent'} closeHandler={() => this.handleClosePopup()}>
                    <img src="https://cdn.vn.garenanow.com/web/fo4vn/events/Popup-HuongdansukienWelcomeFO4.png" alt="" />
                </Modal>
            </React.Fragment>
        )
    }
}

export default EventSection1
