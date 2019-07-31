import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const GET_WIN = 'GET_WIN'
export const GET_WIN_SUCCESS = 'GET_WIN_SUCCESS'
export const GET_WIN_ERROR = 'GET_WIN_ERROR'
export const IS_GET_WIN = 'IS_GET_WIN'
export const SHOW_MODAL = 'SHOW_MODAL'
export const IS_GET_SPIN = 'IS_GET_SPIN'
export const GET_SPIN_SUCCESS = 'GET_SPIN_SUCCESS'
export const IS_SHARE_PIECE = 'IS_SHARE_PIECE'
export const SHARE_PIECE_SUCCESS = 'SHARE_PIECE_SUCCESS'
export const IS_RECEIVE_PIECE = 'IS_RECEIVE_PIECE'
export const RECEIVE_PIECE_SUCCESS = 'RECEIVE_PIECE_SUCCESS'
export const IS_GET_MISSION = 'IS_GET_MISSION'
export const GET_MISSION_SUCCESS = 'GET_MISSION_SUCCESS'
export const IS_UPDATE_MISSION = 'IS_UPDATE_MISSION'
export const UPDATE_MISSION_SUCCESS = 'UPDATE_MISSION_SUCCESS'
export const IS_GET_REWARD = 'IS_GET_REWARD'
export const GET_REWARD_MISSION_SUCCESS = 'GET_REWARD_MISSION_SUCCESS'
export const GET_REWARD_SPIN_SUCCESS = 'GET_REWARD_SPIN_SUCCESS'
export const GET_REWARD_EXCHANGE_SUCCESS = 'GET_REWARD_EXCHANGE_SUCCESS'
export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST'
export const CURRENT_USER_REQUEST_ERROR = 'CURRENT_USER_REQUEST_ERROR'
export const CURRENT_USER_REQUEST_SUCCESS = 'CURRENT_USER_REQUEST_SUCCESS'
export const CURRENT_USER_FETCHING = 'CURRENT_USER_FETCHING'
export const SHARE_FB_SUCCESS = 'SHARE_FB_SUCCESS'
export const SHARE_FACEBOOK = 'facebook.share';
export const IS_GET_NEWS = 'IS_GET_NEWS'
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
export const CLAIM_MISSION_SUCCESS = 'CLAIM_MISSION_SUCCESS';
export const IS_GET_HISTORY = 'IS_GET_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const IS_EXCHANGE_PIECE = 'IS_EXCHANGE_PIECE';
export const EXCHANGE_PIECE_SUCCESS = 'EXCHANGE_PIECE_SUCCESS';
export const IS_UPDATE_INFO = 'IS_UPDATE_INFO';
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS';
export const CLAIM_CAKE_SUCCESS = 'CLAIM_CAKE_SUCCESS';
//popup
export const showModal = (mdType) => {
  return {
    type: SHOW_MODAL,
    payload: mdType
  }
}
//user
export const isCurrentUserFetching = () => {
  return {
    type: CURRENT_USER_FETCHING
  }
}
export const getCurrentUser = () => {
  return (dispatch, getState) => {
    dispatch(isCurrentUserFetching());
    request('api/user/get').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getCurrentUserSuccess(response));
      } else {
        dispatch(getCurrentUserError(response))
        if (response.error_code == 'error_account_not_found')
          swal({
            title: 'Thông báo',
            html: '<p class="pop-content">Bạn chưa có tài khoản FO4. Vui lòng tạo tài khoản để tham gia sự kiện</p>',
            animation: false,
            confirmButtonText: 'Đóng',
            customClass: 'custom-modal animated zoomIn'
          })
      }
    })
  }
}
export const getCurrentUserSuccess = (response) => {
  return {
    type: CURRENT_USER_REQUEST_SUCCESS,
    payload: response.payload.user
  }
}
export const getCurrentUserError = (response) => {
  return {
    type: CURRENT_USER_REQUEST_ERROR,
    payload: response
  }
}
//update win
export const isGetWin = () => {
  return {
    type: IS_GET_WIN
  }
}
export const getWin = () => {
  return (dispatch, getState) => {
    dispatch(isGetWin());
    request('api/user/update_win').then(function (response) {
      if (response.status == 'successful') {
        dispatch(getWinSuccess(response));
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const getWinSuccess = (response) => {
  return {
    type: GET_WIN_SUCCESS,
    payload: response.payload
  }
}
//spin action
export const isGetSpin = () => {
  return {
    type: IS_GET_SPIN
  }
}
export const GetSpin = (machine1,callback) => {
  return (dispatch, getState) => {
    dispatch(isGetSpin());
    request('api/reward/spin').then(function (response) {
      if (response.status == 'successful') {
        dispatch(GetSpinSuccess(response));
        let list = getState().event.reward_list_spin
        let indexOfItem = list.map(e => e.reward_id).indexOf(response.payload.reward.reward_id);
        callback(indexOfItem)
        console.log(indexOfItem)
        dispatch(GetSpinSuccess(response));
        $('.btn-spin').addClass('active-spin')
        machine1.shuffle(8, () =>{
          $('.btn-spin').removeClass('active-spin')
          setTimeout(() => {
            swal({
              title: 'Thông báo',
              html: '<p class="pop-content">Chúc mừng bạn đã nhận được ' + response.payload.reward.item_name + '</p><div class="text-center"><img src="' + response.payload.reward.item_url + '" alt="" class="spin-img-gift"></div>',
              animation: false,
              confirmButtonText: 'Đóng',
              customClass: 'custom-modal animated zoomIn'
            })
          }, 800);
        }
        );
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
        $('.wheel').removeClass('disable-click')
      }
    })
  }
}
export const GetSpinSuccess = (response) => {
  return {
    type: GET_SPIN_SUCCESS,
    payload: response.payload
  }
}
//share piece
export const isSharePiece = () => {
  return {
    type: IS_SHARE_PIECE
  }
}
export const SharePiece = (reward_id, callback) => {
  return (dispatch, getState) => {
    dispatch(isSharePiece());
    request('api/reward/share', 'POST', {
      body: JSON.stringify({
        reward_id: reward_id
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(SharePieceSuccess(response))
        callback(response.payload.code)
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const SharePieceSuccess = (response) => {
  return {
    type: SHARE_PIECE_SUCCESS,
    payload: response.payload
  }
}
//receive piece
export const isReceivePiece = () => {
  return {
    type: IS_RECEIVE_PIECE
  }
}
export const ReceivePiece = (code, callback) => {
  return (dispatch, getState) => {
    dispatch(isReceivePiece());
    request('api/reward/receive', 'POST', {
      body: JSON.stringify({
        code: code,
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(ReceivePieceSuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chúc mừng bạn đã nhận được ' + response.payload.item_name + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        callback()
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const ReceivePieceSuccess = (response) => {
  return {
    type: RECEIVE_PIECE_SUCCESS,
    payload: response.payload
  }
}
//exchange piece
export const isExchangePiece = () => {
  return {
    type: IS_EXCHANGE_PIECE
  }
}
export const ExchangePiece = (reward_ids, callback) => {
  return (dispatch, getState) => {
    dispatch(isExchangePiece());
    request('api/reward/exchange', 'POST', {
      body: JSON.stringify({
        reward_ids: reward_ids,
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(ExchangePieceSuccess(response))
        callback()
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chúc mừng bạn đã nhận được ' + response.payload.reward_infos.item_name + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const ExchangePieceSuccess = (response) => {
  return {
    type: EXCHANGE_PIECE_SUCCESS,
    payload: response.payload
  }
}
//get mission
export const isGetMission = () => {
  return {
    type: IS_GET_MISSION
  }
}
export const GetMission = () => {
  return (dispatch, getState) => {
    dispatch(isGetMission());
    request('api/missions/get_available').then(function (response) {
      if (response.status == 'successful') {
        dispatch(GetMissionSuccess(response));
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const GetMissionSuccess = (response) => {
  return {
    type: GET_MISSION_SUCCESS,
    payload: response.payload
  }
}
//update mission
export const isUpdateMission = () => {
  return {
    type: IS_UPDATE_MISSION
  }
}
export const UpdateMission = () => {
  return (dispatch, getState) => {
    dispatch(isUpdateMission());
    request('api/missions/update_status').then(function (response) {
      if (response.status == 'successful') {
        dispatch(UpdateMissionSuccess(response));
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const UpdateMissionSuccess = (response) => {
  return {
    type: UPDATE_MISSION_SUCCESS,
    payload: response.payload
  }
}
//get reward
export const isGetReward = () => {
  return {
    type: IS_GET_REWARD
  }
}
export const GetReward = (event, callback) => {
  return (dispatch, getState) => {
    dispatch(isGetReward());
    request('api/reward/get_rewards_by_event?event=' + event).then(function (response) {
      if (response.status == 'successful') {
        if (event === 1) {
          dispatch(GetRewardMissionSuccess(response))
        }
        else if (event === 2) {
          dispatch(GetRewardSpinSuccess(response))
          setTimeout(() => {
            callback()
          }, 500);
        }
        else if (event === 3) {
          dispatch(GetRewardExchangeSuccess(response))
        }
      } else {
        console.log(response.error_code)
      }
    })
  }
}
export const GetRewardMissionSuccess = (response) => {
  return {
    type: GET_REWARD_MISSION_SUCCESS,
    payload: response.payload
  }
}
export const GetRewardSpinSuccess = (response) => {
  return {
    type: GET_REWARD_SPIN_SUCCESS,
    payload: response.payload
  }
}
export const GetRewardExchangeSuccess = (response) => {
  return {
    type: GET_REWARD_EXCHANGE_SUCCESS,
    payload: response.payload
  }
}
//share FB
export const shareFB = (url) => {
  let type = SHARE_FACEBOOK;
  return (dispatch) => {
    FB.ui({
      method: 'share',
      href: url,
      hashtag: '##Sinhnhật1tuổiFIFAOnline4',
      quote:"FIFA Online 4 mừng sinh nhật tất bật quà tặng. Vào chơi nhận ngay mấy ông ơi!!!",
    }, response => {
      if (response && !response['error_code']) {
        request('api/user/redeem_share_fb').then(function (response) {
          if (response.status == 'successful') {
            dispatch(shareFBSuccess(response));
            swal({
              title: 'Thông báo',
              html: '<p class="pop-content">Chia sẻ thành công. Bạn nhận được thêm lượt quay.</p>',
              confirmButtonText: 'Đóng',
              animation: false,
              customClass: 'custom-modal animated zoomIn'
            })
          }
          else {
            swal({
              title: 'Thông báo',
              html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
              confirmButtonText: 'Đóng',
              animation: false,
              customClass: 'custom-modal animated zoomIn'
            })
          }
        })
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chia sẻ không thành công. Vui lòng thử lại</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    });
    dispatch(() => { type: SHARE_FACEBOOK })
  }
}
export const shareFBSuccess = (response) => {
  return {
    type: SHARE_FB_SUCCESS,
    payload: response.payload
  }
}
//
export const isGetNews = () => {
  return {
    type: IS_GET_NEWS
  }
}
export const GetNews = () => {
  return (dispatch, getState) => {
    dispatch(isGetNews());
    request('api/missions/receive').then(function (response) {
      if (response.status == 'successful') {
        dispatch(GetNewsSuccess(response));
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Nhận nhiệm vụ thành công</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const GetNewsSuccess = (response) => {
  return {
    type: GET_NEWS_SUCCESS,
    payload: response.payload
  }
}
//claim mission
export const isClaimMission = () => {
  return {
    type: IS_UPDATE_INFO
  }
}
export const ClaimMission = (mission_id) => {
  return (dispatch, getState) => {
    dispatch(isReceivePiece());
    request('api/reward/claim_mission_reward', 'POST', {
      body: JSON.stringify({
        mission_id: mission_id,
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(ClaimMissionSuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chúc mừng bạn đã nhận được ' + response.payload.reward_infos.item_name + ' Quà sẽ được gửi vào trong game trong vòng 24h</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const ClaimMissionSuccess = (response) => {
  return {
    type: CLAIM_MISSION_SUCCESS,
    payload: response.payload
  }
}
//get history

export const isGetHistory = () => {
  return {
    type: IS_GET_HISTORY
  }
}
export const GetHistory = (round_id) => {
  return (dispatch, getState) => {
    dispatch(isGetHistory());
    request('api/reward/get_rewards_user_infos').then(function (response) {
      if (response.status == 'successful') {
        dispatch(GetHistorySuccess(response));
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          animation: false,
          confirmButtonText: 'Đóng',
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const GetHistorySuccess = (response) => {
  return {
    type: GET_HISTORY_SUCCESS,
    payload: response.payload
  }
}
//update info
export const isUpdateInfo= () => {
  return {
    type: IS_UPDATE_INFO
  }
}
export const UpdateInfo = (phone_number,full_name,address,email) => {
  return (dispatch, getState) => {
    dispatch(isUpdateInfo());
    request('api/user/update_info', 'POST', {
      body: JSON.stringify({
        phone_number: phone_number,
        full_name:full_name,
        address:address,
        email:email,
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(UpdateInfoSuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Cập nhập thông tin thành công</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
        $('body').removeClass('modal-open')
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const UpdateInfoSuccess = (response) => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: response
  }
}
//claim cake
export const claimCake = (event) => {
  return (dispatch, getState) => {
    dispatch(isReceivePiece());
    request('api/reward/claim_cake_event_reward', 'POST', {
      body: JSON.stringify({
        event: event,
      })
    }).then(function (response) {
      if (response.status == 'successful') {
        dispatch(ClaimMissionSuccess(response))
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">Chúc mừng bạn đã nhận được ' + response.payload.reward_infos.item_name + ' Quà sẽ được gửi vào trong game trong vòng 24h</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      } else {
        swal({
          title: 'Thông báo',
          html: '<p class="pop-content">' + showErrorWithCode(response.error_code) + '</p>',
          confirmButtonText: 'Đóng',
          animation: false,
          customClass: 'custom-modal animated zoomIn'
        })
      }
    })
  }
}
export const claimCakeSuccess = (response) => {
  return {
    type: CLAIM_CAKE_SUCCESS,
    payload: response.payload
  }
}