import {
  CURRENT_USER_REQUEST_ERROR,
  CURRENT_USER_REQUEST_SUCCESS,
  CURRENT_USER_FETCHING,
  SHOW_MODAL,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_ERROR,
  UPDATE_HIS_SUCCESS,
  UPDATE_USER_STATUS_SUCCESS,
} from './actions'

const initialState = {
  loading: false,
  login: false,
  currentUser: {},
  isShowModal: null,
  information: null,
}

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        currentUser: action.payload,
        information: action.payload,
      }
      break;
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          user:action.payload.user
        }
      }
      break;
    case CURRENT_USER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        information: action.payload,
      }
      break;
    case UPDATE_INFO_ERROR:
      return {
        ...state,
        loading: false,
        information: action.payload,
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
    default:
      return state
  }
}
