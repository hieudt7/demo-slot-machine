import React from 'react'
import { showErrorWithCode } from './common'
export default ({ children, show, closeHandler, customClass, customEffect }) =>
  <React.Fragment>
    <div className={`modal ${show ? 'show' : ''} ${customClass ? customClass : ''}`}>
      <div className={`modal-dialog ${customEffect ? customEffect : 'animated fadeInDown'}`}>
        <div className="modal-block">
          <div className="modal-content">
            <div className="modal-body">
            <img src="images/pop-top.png" alt="" className="pop-top-l"/>
            <img src="images/pop-top-r.png" alt="" className="pop-top-r"/>
            <img src="images/pop-bot.png" alt="" className="pop-bot-l"/>
            <img src="images/pop-bot-r.png" alt="" className="pop-bot-r"/>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div onClick={closeHandler} className={`modal-backdrop animated fade ${show ? 'show' : ''}`}></div>
    </div>
  </React.Fragment>