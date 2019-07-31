import React from 'react'
import moment from 'moment'
const mapEvenStatus = (status) => {
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
const mapCodeStatus = (code, array) => {
  if (!code || !array || array.length <= 0 || array == undefined) { return }
  let codeStatus = 'Đã dùng';
  let result = array.filter(obj => {
    return obj.code === code
  })
  if (result.length > 0) {
    codeStatus = 'Chưa dùng'
  }
  return codeStatus
}
const mapClass = (status) => {
  if (!status) { return }
  let statusClass;
  switch (status) {
    case 2:
      statusClass = ''
      break;
    default:
      statusClass = 'txt-bold'
      break;
  }
  return statusClass
}
export default ({ history }) =>
  <React.Fragment>
    <div className="fire-success">
      <h3 className="md-header">lịch sử</h3>
      <div className="pop-hisotry-piece">
        <ul className="nav nav-tabs">
          <li><a className="active show" data-toggle="tab" href="#menu3"><span> Đổi quà</span></a></li>
          <li><a data-toggle="tab" href="#menu1"><span>Tặng mảnh</span></a></li>
          <li><a data-toggle="tab" href="#menu2"><span> Nhận mảnh</span></a></li>

        </ul>
        <div className="tab-content">

          <div id="menu3" className="tab-pane fade active show">
            <table className="tbl-history">
              <thead>
                <tr>
                  <th>vật phẩm</th>
                  <th>thời gian nhận</th>
                  <th>trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {(history.reward_infos) &&
                  history.reward_infos.filter(item => item.event === 3).map((his, index) => (
                    <tr key={index}>
                      <td className="txt-bold">{his.item_name}</td>
                      <td>{moment(his.create_time).format('DD/MM/YYYY HH:mm')}</td>
                      <td><span className={`${mapClass(his.status)}`}>{mapEvenStatus(his.status)}</span></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div id="menu1" className="tab-pane fade">
            <table className="tbl-history">
              <thead>
                <tr>
                  <th>Tên mảnh</th>
                  <th>Code</th>
                  <th>Thời gian tạo</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {(history.share_history) &&
                  history.share_history.map((his, index) => (
                    <tr key={index}>
                      <td className="txt-bold">{his.item_name}</td>
                      <td>{his.code}</td>
                      <td>{moment(his.create_time).format('DD/MM/YYYY HH:mm')}</td>
                      <td><span>{mapCodeStatus(his.code, history.user.user_special_reward_infos)}</span></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div id="menu2" className="tab-pane fade">
            <table className="tbl-history">
              <thead>
                <tr>
                  <th>Tên mảnh</th>
                  <th>Code</th>
                  <th>thời gian nhận</th>
                </tr>
              </thead>
              <tbody>
                {(history.receive_history) &&
                  history.receive_history.map((his, index) => (
                    <tr key={index}>
                      <td className="txt-bold">{his.item_name}</td>
                      <td>{his.code}</td>
                      <td>{moment(his.create_time).format('DD/MM/YYYY HH:mm')}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  </React.Fragment>
