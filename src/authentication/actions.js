import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from '../components/common'
export const CURRENT_USER_REQUEST         = 'CURRENT_USER_REQUEST'
export const CURRENT_USER_REQUEST_ERROR   = 'CURRENT_USER_REQUEST_ERROR'
export const CURRENT_USER_REQUEST_SUCCESS = 'CURRENT_USER_REQUEST_SUCCESS'
export const CURRENT_USER_FETCHING        = 'CURRENT_USER_FETCHING'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_ERROR = 'UPDATE_INFO_ERROR'
export const IS_UPDATE_INFO = 'IS_UPDATE_INFO'
export const UPDATE_HIS_SUCCESS = 'UPDATE_HIS_SUCCESS'
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS'
export const SHOW_MODAL = ''
export const isCurrentUserFetching = () => {
  return {
    type: CURRENT_USER_FETCHING
  }
}
export const showModal = (mdType) => {
  return {
    type: SHOW_MODAL,
    payload: mdType
  }
}
export const getCurrentUser = () => {
  return (dispatch, getState) => {
    dispatch(isCurrentUserFetching());
    request('api/user/get').then(function(response) {
      if(response.status == 'successful') {
        dispatch(getCurrentUserSuccess(response));
      } else {
        dispatch(getCurrentUserError(response))
      }
    })
  }
}

export const getCurrentUserSuccess = (response) => {
  return {
    type: CURRENT_USER_REQUEST_SUCCESS,
    payload: response.payload
  }
}

export const getCurrentUserError = (response) => {
  return {
    type: CURRENT_USER_REQUEST_ERROR,
    payload: response.payload
  }
}
export const isupdateInfo = () => {
  return {
    type: IS_UPDATE_INFO
  }
}
export const updateInfo = (response,isShare) => {
  return (dispatch, getState) => {
    console.log('run update info')
    console.log(response)
    if(isShare){
      dispatch(updateInfoError(response))
    }
    else{
      dispatch(updateInfoSuccess(response))
    }
  }
}
export const updateInfoSuccess = (response) => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: response.payload
  }
}
export const updateInfoError = (response) => {
  return {
    type: UPDATE_INFO_ERROR,
    payload: response.payload
  }
}
export const updateHistory = (response) => {
  return (dispatch, getState) => {
      dispatch(updateHistorySuccess(response))
  }
}

export const updateHistorySuccess = (response) => {
  return {
    type: UPDATE_HIS_SUCCESS,
    payload: response.payload
  }
}
export const updateUserStatus = (response) => {
  return (dispatch, getState) => {
      dispatch(updateUserStatusSuccess(response))
  }
}
export const updateUserStatusSuccess = (response) => {
  return {
    type: UPDATE_USER_STATUS_SUCCESS,
    payload: response.payload
  }
}