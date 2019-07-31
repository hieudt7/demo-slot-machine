import React from 'react'
const mapEvenStatus = (status) => {
  if (!status) { return }
  let eventStatus;
  switch (status) {
    case 'init':
      eventStatus = 'Đang xử lý'
      break;
    case 'no_send':
      eventStatus = ''
      break;
    case 'success':
      eventStatus = 'Đã gửi'
      break;
    case 'sending':
      eventStatus = 'Đang xử lý'
      break;
    case 'fail':
      eventStatus = 'Đang xử lý'
      break;
    default:
      break;
  }
  return eventStatus
}
const mapEvenName = (status) => {
  if (!status) { return }
  let eventStatus;
  switch (status) {
    case 'lucky_envelop':
      eventStatus = 'Hái lộc'
      break;
    case 'shop':
      eventStatus = 'Shop Đặc Biệt Tết'
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
    case 'init':
      statusClass = 'progress-txt'
      break;
    default:
      statusClass = ''
      break;
  }
  return statusClass
}
export default ({ }) =>
  <React.Fragment>
    <div className="fire-success">
    <h3 className="md-header">Quà có thể nhận</h3>
    </div>
  </React.Fragment>
