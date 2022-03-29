const INITIAL_STATE = {
  userInfo: {
    firstName: '-',
    lastName: '-',
    id: '-',
    birthDate: '-'
  },
  birthDateStore: '-',
  policyTypeCodeToName: {
    "MC": "ประกันรถยนต์ภาคบังคับ",
    "MV": "ประกันรถยนต์ภาคสมัครใจ",
    "PA": "ประกันอุบัติเหตุ",
    "FI": "ประกันทรัพย์สิน",
    "AH": "ประกันสุขภาพ",
    "TA": "ประกันเดินทาง",
    "MI": "ประกันอื่น ๆ",
  },
  policyDataListStore: [],
  policyStatusCodeToName: {
    "A": 'มีความคุ้มครอง', 
    "C": 'Cancel', // สถานะนี้จะไม่ถูกแสดง ถ้าเจอสถานะนี้ระบบจะพาไปหน้า "ขออภัยไม่พบข้อมูลของท่านในระบบ กรุณาติดต่อ 1748 หรือ component NoUser.jsx"
    "E": 'สิ้นสุดความคุ้มครอง',
    "W": '-' // อยู่ในระยะผ่อนผันการจ่ายเบี้ยประกัน Remark: ปัจจุบันไม่มีสเตตัสในการส่งให้ OIC
  },
  apiPath: {
    AUTHEN_PATH: "/login/token",
    CHECK_IS_CONSENT_PATH: "/consent/checkisconsent",
    GET_MASTER_CONSENT_PATH: "/consent/getmasterconsent",
    SAVE_CONSENT_INFO_PATH: "/consent/saveconsentinfo",
    CUSTOMER_IDENTIFY_PATH: "/api/customer/identifying",
    OTP_REQUEST_PATH: "/api/customer/otp/request",
    OTP_CONFIRM_PATH: "/api/customer/otp/confirm",
    POLICY_LIST_PATH: "/api/mypolicy/list",
  }
  
}

export default (state = INITIAL_STATE, action={}) => {
	switch(action.type) {
		case "SET_DATA":
			return {
				...state,
				...action.content
			};
		default:
			return state;
	}
};