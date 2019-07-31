import { connect } from 'react-redux'
import EventView from '../components/EventView'

import {
  getCurrentUser,
  GetMission,
  ClaimMission,
  GetReward,
  getWin,
  shareFB,
  GetHistory,
  GetSpin,
  UpdateMission,
  SharePiece,
  ReceivePiece,
  ExchangePiece,
  UpdateInfo,
  GetNews,
  claimCake

} from '../modules/actions'

const mapDispatchToProps = {
  getCurrentUser,
  GetMission,
  ClaimMission,
  GetReward,
  getWin,
  shareFB,
  GetHistory,
  GetSpin,
  UpdateMission,
  SharePiece,
  ReceivePiece,
  ExchangePiece,
  UpdateInfo,
  GetNews,
  claimCake
}

const mapStateToProps = (state) => ({
  event: state.event
})

export default connect(mapStateToProps, mapDispatchToProps)(EventView)
