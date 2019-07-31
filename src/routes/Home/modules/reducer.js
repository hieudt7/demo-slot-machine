import {
  GET_WIN_SUCCESS,
  GET_WIN_ERROR,
  IS_GET_WIN,
  SHOW_MODAL,
  IS_GET_SPIN,
  GET_SPIN_SUCCESS,
  IS_SHARE_PIECE,
  SHARE_PIECE_SUCCESS,
  IS_RECEIVE_PIECE,
  RECEIVE_PIECE_SUCCESS,
  IS_GET_MISSION,
  GET_MISSION_SUCCESS,
  IS_UPDATE_MISSION,
  UPDATE_MISSION_SUCCESS,
  IS_GET_REWARD,
  CURRENT_USER_REQUEST_ERROR,
  CURRENT_USER_REQUEST_SUCCESS,
  CURRENT_USER_FETCHING,
  SHARE_FB_SUCCESS,
  IS_GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_HISTORY_SUCCESS,
  IS_GET_HISTORY,
  GET_REWARD_MISSION_SUCCESS,
  GET_REWARD_SPIN_SUCCESS,
  GET_REWARD_EXCHANGE_SUCCESS,
  IS_EXCHANGE_PIECE,
  EXCHANGE_PIECE_SUCCESS,
  CLAIM_MISSION_SUCCESS,
  IS_UPDATE_INFO,
  UPDATE_INFO_SUCCESS
} from './actions'

const initialState = {
  isShowModal: null,
  isGetWin: false,
  isGetSpin: false,
  isGetNews: false,
  isGetVote: false,
  isGetPredict: false,
  isGetMission: false,
  isUpdateMission: false,
  isGetReward: false,
  loading: false,
  login: false,
  user: {},
  news_list: null,
  isUpdateInfo: false,
  mission_infos: null,
  isGetHistory: false,
  reward_list_mission: null,
  reward_list_spin: null,
  reward_list_exchange: null,
  receive_history: null,
  reward_infos: null,
  share_history: null,
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        user: action.payload,
      }
      break;
    case CURRENT_USER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
      }
      break;
    case CURRENT_USER_FETCHING:
      return {
        ...state,
        loading: true
      }
      break;
    case SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload
      }
      break;
    case GET_WIN_SUCCESS:
      return {
        ...state,
        isGetWin: false,
        user: {
          ...state.user,
          n_previous_special_match: action.payload.user_status.n_previous_special_match,
          no_add_spin_today: action.payload.user_status.no_add_spin_today,
          no_receive_reward_today: action.payload.user_status.no_receive_reward_today,
          no_share_reward_today: action.payload.user_status.no_share_reward_today,
          total_no_spin: action.payload.user_status.total_no_spin,
          total_no_spun: action.payload.user_status.total_no_spun,
          user_mission_infos: action.payload.user_mission_infos
        }
      }
      break;
    case CLAIM_MISSION_SUCCESS:
      return {
        ...state,
        isGetWin: false,
        user: {
          ...state.user,
          user_mission_infos: action.payload.user_missions
        }
      }
      break;
    case SHARE_FB_SUCCESS:
      return {
        ...state,
        isGetWin: false,
        user: {
          ...state.user,
          n_previous_special_match: action.payload.n_previous_special_match,
          no_add_spin_today: action.payload.no_add_spin_today,
          no_receive_reward_today: action.payload.no_receive_reward_today,
          no_share_reward_today: action.payload.no_share_reward_today,
          total_no_spin: action.payload.total_no_spin,
          total_no_spun: action.payload.total_no_spun,
        }
      }
      break;
    case IS_GET_WIN:
      return {
        ...state,
        isGetWin: true
      }
      break;
    case GET_WIN_ERROR:
      return {
        ...state,
        isGetWin: false,
      }
      break;
    case IS_GET_SPIN:
      return {
        ...state,
        isGetSpin: true
      }
      break;
    case GET_SPIN_SUCCESS:
      return {
        ...state,
        isGetSpin: false,
        user: {
          ...state.user,
          total_no_spin: action.payload.user_status.total_no_spin,
          total_no_spun: action.payload.user_status.total_no_spun,
          user_special_reward_infos: action.payload.user_special_reward_infos,
        }
      }
      break;
    case IS_SHARE_PIECE:
      return {
        ...state,
        isGetVote: true
      }
      break;
    case SHARE_PIECE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          user_special_reward_infos: action.payload.user_special_reward_infos,
          no_share_reward_today: action.payload.user_status.no_share_reward_today
        },
      }
      break;
    case IS_EXCHANGE_PIECE:
      return {
        ...state,
        isGetVote: true
      }
      break;
    case EXCHANGE_PIECE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          user_special_reward_infos: action.payload.user_special_reward_infos,
          mission_types: action.payload.mission_types
        },
      }
      break;
    case IS_RECEIVE_PIECE:
      return {
        ...state,
        isGetPredict: true
      }
      break;
    case RECEIVE_PIECE_SUCCESS:
      return {
        ...state,
        isGetPredict: false,
        user: {
          ...state.user,
          user_special_reward_infos: action.payload.user_special_reward_infos,
          no_receive_reward_today: action.payload.user_status.no_receive_reward_today
        },
      }
      break;
    case IS_GET_MISSION:
      return {
        ...state,
        isGetMission: true,

      }
      break;
    case GET_MISSION_SUCCESS:
      return {
        ...state,
        isGetMission: false,
        mission_infos: action.payload.mission_infos
      }
      break;
    case IS_UPDATE_MISSION:
      return {
        ...state,
        isUpdateMission: true
      }
      break;
    case UPDATE_MISSION_SUCCESS:
      return {
        ...state,
        isUpdateMission: false,
        user: {
          ...state.user,
          user_mission_infos: action.payload.user_missions,
        }
      }
      break;
    case IS_GET_REWARD:
      return {
        ...state,
        isGetReward: true
      }
      break;
    case GET_REWARD_MISSION_SUCCESS:
      return {
        ...state,
        isGetReward: false,
        reward_list_mission: action.payload.reward_infos
      }
      break;
    case GET_REWARD_SPIN_SUCCESS:
      return {
        ...state,
        isGetReward: false,
        reward_list_spin: action.payload.reward_infos
      }
      break;
    case GET_REWARD_EXCHANGE_SUCCESS:
      return {
        ...state,
        isGetReward: false,
        reward_list_exchange: action.payload.reward_infos
      }
      break;



    case IS_GET_NEWS:
      return {
        ...state,
        isGetNews: true
      }
      break;
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        isGetNews: false,
        news_list: action.payload.new_infos
      }
      break;
    case IS_GET_HISTORY:
      return {
        ...state,
        isGetHistory: true
      }
      break;
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        isGetHistory: false,
        receive_history: action.payload.receive_history,
        reward_infos: action.payload.reward_infos,
        share_history: action.payload.share_history,
      }
      break;
    case IS_UPDATE_INFO:
      return {
        ...state,
        isUpdateInfo: true
      }
      break;
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        isUpdateInfo: false,
        user: {
          ...state.user,
          address: action.payload.payload.user.address,
          email: action.payload.payload.user.email,
          full_name: action.payload.payload.user.full_name,
          phone_number: action.payload.payload.user.phone_number
        }
      }
      break;
    default:
      return state
  }
}
