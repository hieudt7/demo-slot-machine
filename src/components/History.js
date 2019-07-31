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
export default ({history}) =>
  <React.Fragment>
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
          {(history)&&
            history.filter(item => item.event === 2).map((his, index) => (
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
    </div>
  </React.Fragment>
