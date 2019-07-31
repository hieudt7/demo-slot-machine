
import React from 'react'
import lodash from 'lodash'
const mapClass = (status) => {
  if (!status) { return }
}
export default ({ rewards }) =>
  <React.Fragment>
    <h3 className="md-header">quà có thể nhận</h3>
    <div className="fire-success">
      <div className="pop-gift-recieve">
        {(rewards) &&
          <div className="recent-gift">
            {mapClass(rewards)}
            {rewards.map((reward, index) => (
              <div className="group-item">
                <ul>
                  {reward.map((item, idx) => (
                    <li key={idx}>
                      <img src={item.image} alt={item.product_name} />
                    </li>
                  ))}
                </ul>
                <img src="images/gift-line.png" className="gline" alt="" />
              </div>
            ))
            }
          </div>
        }
      </div>
    </div>
  </React.Fragment>
