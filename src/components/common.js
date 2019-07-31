export function showErrorWithCode(errCode) {
  let errorMess
  switch (errCode) {
    case 'not_logged_in':
      errorMess = 'Bạn chưa đăng nhập'
      break;
    case 'missing_account_id':
      errorMess = 'Tài khoản này chưa có HLV, vui lòng tạo HLV và quay lại sau'
      break;
    case 'server_error':
      errorMess = 'Xảy ra lỗi, hãy thử lại sau!'
      break;
    case 'api_error':
      errorMess = 'Thao tác không thực hiện được, xin vui lòng thử lại sau'
      break;
    case 'update_info_required':
      errorMess = 'Vui lòng cập nhật thông tin'
      break;
    case 'error_zero_spin':
      errorMess = 'Bạn đã hết lượt quay'
      break;
    case 'invalid_action':
      errorMess = 'Thao tác không thực hiện được'
      break;
    case 'event_not_open_yet':
      errorMess = 'Sự kiện chưa bắt đầu'
      break;
    case 'already_shared':
      errorMess = 'Bạn đã share thành công và đóng góp cổ vũ ngày hôm nay.'
      break;
    case 'not_enough_shoot_balance':
      errorMess = 'Bạn đã hết lượt nã pháo'
      break;
    case 'error_reward_not_found':
      errorMess = 'Phần quà không tồn tại'
      break;
    case 'match_ended':
      errorMess = 'Trận đấu đã kết thúc.'
      break;
    case 'time_is_up':
      errorMess = 'Đã hết thời gian dự đoán trận đấu này.'
      break;
    case 'event_ended':
      errorMess = 'Sự kiện đã kết thúc.'
      break;
    case 'error_limit_exchange':
      errorMess = 'Bạn đã đổi vật phẩm này. Hãy chọn vật phẩm khác nhé.'
      break;
    case 'error_not_meet_requirement':
      errorMess = 'Bạn không đủ điều kiện nhận quà tặng này. Hãy kiểm tra lại nhé.'
      break;
      case 'error_have_claimed':
        errorMess = 'Bạn đã nhận vật phẩm này.'
        break;
      
    default:
      errorMess = 'Có lỗi xảy ra. Vui lòng thử lại sau';
      break;
  }
  return errorMess
}


export function smoothScroll(target) {
  if (!target) {
    return
  }
  $('html,body').stop().animate({
    scrollTop: $(target).offset().top
  }, 1000);
}
export const gallery = [
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1920x1080-NH.jpg',id:'1','name':''
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1920x1080-VD.jpg',id:'2','name':''
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1920x1080-VL.jpg',id:'3','name':''
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1920x1080-VT.jpg',id:'4','name':''
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1920x1080-VTH.jpg',id:'5','name':''
  },
]
export const galleryMobile = [
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1000x1500-NH.jpg',id:'1'
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1000x1500-VD.jpg',id:'2'
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1000x1500-VL.jpg',id:'3'
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1000x1500-VT.jpg',id:'4'
  },
  {
    link: 'https://cdn.vn.garenanow.com/web/fo3/fo4/f04-birthday-2019/images/Wallpaper_1000x1500-VTH.jpg',id:'5'
  },
]
export const player = [
  {
    'id': 'player_1',
    'fname': 'Quế',
    'lname':'Ngọc Hải',
    'class':'avt-qnh',
    'avatar': 'images/slide_nh_act.png',
    'general': { 'label': ['CB'], "data": [86] },
    'dob': '15.05.1993',
    'salary': '14',
    'height': '180cm',
    'weight': '76kg',
    'look': 'Nhỏ',
    'footPointR': '5',
    'footPointL': '3',
    "detail": { "label": ['Tốc độ', 'Sút', 'Chuyền', 'Rê Bóng', 'Phòng thủ', 'Thể lực'], "data": [87, 58, 73, 77, 86, 85] },
    "HideIndex": { "label": ['Đánh đầu mạnh'], "data": [22],"des": ['Có thể thực hiện pha đánh đầu mạnh']  },
    'Rating': '2',
  },
  {
    'id': 'player_2',
    'fname': 'Phan',
    'lname':'Văn Đức',
    'class':'avt-vd',
    'avatar': 'images/slide_vd_act.png',
    'general': { 'label': ['LF', 'LM', 'ST'], "data": [85, 84, 84] },
    'dob': '11.04.1996',
    'salary': '15',
    'height': '173cm',
    'weight': '64kg',
    'look': 'Nhỏ',
    'footPointR': '5',
    'footPointL': '4',
    "detail": { "label": ['Tốc độ', 'Sút', 'Chuyền', 'Rê Bóng', 'Phòng thủ', 'Thể lực'], "data": [94, 84, 81, 85, 53, 75] },
    "HideIndex": { "label": ['Sút xoáy', 'Tinh tế', 'Ma tốc độ', 'Qua người'], "data": [13,14,17,42], "des": ['Cầu thủ giỏi sút xoáy','Khả năng thực hiện những kĩ năng điệu nghệ','Cầu thủ có khả năng chạy nhanh','Kỹ thuật cá nhân xuất sắc khi rê bóng 1vs1'] },
    'Rating': '4',
  },
  {
    'id': 'player_3',
    'fname': 'Đặng',
    'lname':'Văn Lâm',
    'class':'avt-vl',
    'avatar': 'images/slide_vl_act.png',
    'general': { 'label': ['GK'], "data": [79] },
    'dob': '13.08.1993',
    'salary': '8',
    'height': '188cm',
    'weight': '85kg',
    'look': 'TB',
    'footPointR': '2',
    'footPointL': '5',
    "detail": { "label": ['Bay người', 'Bắt bóng', 'Phát bóng', 'Phản xạ', 'Tốc độ', 'Chọn vị trí'], "data": [78, 77, 74, 88, 54, 78] },
    "HideIndex": { "label": ['TM ném xa','TM cản tạt bóng'], "data": [21,49], "des": ['TM có khả năng ném bóng xa','TM có khuynh hướng lao ra cản pha tạt bóng']  },
    'Rating': '1',
  },
  {
    'id': 'player_4',
    'fname': 'Vũ',
    'lname':'Văn Thanh',
    'class':'avt-vth',
    'avatar': 'images/slide_vth_act.png',
    'general': { 'label': ['RB', 'LB', 'LM'], "data": [80, 80, 80] },
    'dob': '14.04.1996',
    'salary': '11',
    'height': '173cm',
    'weight': '72kg',
    'look': 'TB',
    'footPointR': '5',
    'footPointL': '3',
    "detail": { "label": ['Tốc độ', 'Sút', 'Chuyền', 'Rê Bóng', 'Phòng thủ', 'Thể lực'], "data": [92, 72, 75, 81, 75, 79] },
    "HideIndex": { "label": ['Tạt bóng sớm', 'Ma tốc độ'], "data": [12,17], "des": ['Thường xuyên tung ra đường tạt bóng sớm','Cầu thủ có khả năng chạy nhanh'] },
    'Rating': '3',
  },
  {
    'id': 'player_5',
    'fname': 'Nguyễn',
    'lname':'Văn Toàn',
    'class':'avt-vt',
    'avatar': 'images/slide_vt_act.png',
    'general': { 'label': ['ST', 'RW', 'LW'], "data": [84, 85, 85] },
    'dob': '12.04.1996',
    'salary': '15',
    'height': '170cm',
    'weight': '63kg',
    'look': 'Nhỏ',
    'footPointR': '5',
    'footPointL': '4',
    "detail": { "label": ['Tốc độ', 'Sút', 'Chuyền', 'Rê Bóng', 'Phòng thủ', 'Thể lực'], "data": [95, 85, 81, 84, 61, 79] },
    "HideIndex": { "label": ['Sút xoáy', 'Tinh tế', 'Ma tốc độ', 'Qua người'], "data": [13,14,17,42], "des": ['Cầu thủ giỏi sút xoáy','Khả năng thực hiện những kĩ năng điệu nghệ','Cầu thủ có khả năng chạy nhanh','Kỹ thuật cá nhân xuất sắc khi rê bóng 1vs1'] },
    'Rating': '4',
  }
]
