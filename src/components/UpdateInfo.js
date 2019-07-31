import React from 'react'
export default ({ }) =>
  <React.Fragment>
    <div className="info-account">
      <h3 className="md-header">thông tin tài khoản</h3>
      <p className="note">Lưu ý: Bạn cần nhập chính xác thông tin tài khoản để FIFA Online 4 có thể gửi những phần quà outgame đến đúng địa chỉ nếu bạn trúng thưởng.</p>
      <div className="group-info">
        <div className="lbel">họ và tên</div>
        <div>
          <input className={`${1 ? 'updated-info' : ''}`} type="text" value={pName || ''} onChange={e => this.onChangeName(e)} />
        </div>
      </div>
      <div className="group-info">
        <div className="lbel">số điện thoại</div>
        <div>
          <input className={`${1 ? 'updated-info' : ''}`} type="text" value={pPhone || ''} onChange={e => this.onChangePhone(e)} />
        </div>
      </div>
      <div className="group-info">
        <div className="lbel">địa chỉ nhận quà</div>
        <div>
          {/* hasInfo */}
          <input className={`${1 ? 'updated-info' : ''}`} type="text" value={pAddress || ''} onChange={e => this.onChangeAddress(e)} />
        </div>
      </div>
      <div className="group-info">
        <div className="lbel">EMAIL</div>
        <div>
          <input className={`${1 ? 'updated-info' : ''}`} type="text" value={pPhone || ''} onChange={e => this.onChangePhone(e)} />
        </div>
      </div>
      <div className="text-center grp-btn">
        <a href="javascript:void(0)" className="btn-img-xl" onClick={e => this.vote(voteID)}>
          <span>XÁC NHẬN</span>
          <img src="images/s2-btn-green.png" alt="" />
        </a>
        <a href="javascript:void(0)" className="btn-img-xl" onClick={() => this.setState({ modal: null })}>
          <span>HUỶ</span>
          <img src="images/s2-btn-orange.png" alt="" />
        </a>
      </div>
    </div>
  </React.Fragment>
