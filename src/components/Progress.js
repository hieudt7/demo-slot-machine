import React from 'react'
const checkClassItem = (nWin, index) => {
  if (!nWin || !index && nWin !== 0 || nWin == undefined) {
    return
  }
  let className = (index <= nWin) ? 'can_redeem' : 'not_able_to_redeem'
  return className
}
export default ({ event, closeHandler }) =>
  (event) &&
  <React.Fragment>
    <div className="fire-success">
      <h3 className="md-header">cập nhật tiến độ nhiệm vụ mỗi ngày</h3>
      <div className="game-progress">
        <div className="list-item-arrow">
          <div className={`item ${checkClassItem(event.user.no_add_spin_today, 1)}`}>
            <p className="accumulate">
              <span>trận 1</span>
            </p>
          </div>
          <div className={`item ${checkClassItem(event.user.no_add_spin_today, 2)}`}>
            <p className="accumulate">
              <span>trận 2</span>
            </p>
          </div>
          <div className={`item ${checkClassItem(event.user.no_add_spin_today, 3)}`}>
            <p className="accumulate">
              <span>trận 3</span>
            </p>
          </div>
          <div className={`item ${checkClassItem(event.user.no_add_spin_today, 4)}`}>
            <p className="accumulate">
              <span>trận 4</span>
            </p>
          </div>
          <div className={`item ${checkClassItem(event.user.no_add_spin_today, 5)}`}>
            <p className="accumulate">
              <span>trận 5</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center grp-btn">
        <a href="javascript:void(0)" className="skew-btn-action"  onClick={closeHandler}><span>Xác nhận</span></a>
      </div>
    </div>
  </React.Fragment>
