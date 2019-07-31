import React from 'react'
export default ({ special_peice,renderSpecialPiece }) =>
  <React.Fragment>
    <div className="fire-success">
      <h3 className="md-header">Tặng mảnh</h3>
      <div className="share-piece">
        <div className="box-piece">
          {((special_peice.length > 0) && special_peice) &&
            special_peice.map((item, index) => (
              <a href="javascript:void(0)" className={`item ${item.length > 1 ? 'active' : ''}`} key={'peice' + index} onClick={renderSpecialPiece(item.reward_id,item.item_name)} >
                <span className="number">x<b>{item.length - 1}</b></span>
                <img src={item[0].item_url} alt="" className="img-mode" />
              </a>
            ))}
        </div>
      </div>
    </div>
  </React.Fragment>
