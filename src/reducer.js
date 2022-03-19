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
    "A": 'Active', 
    "C": 'Cancel',
    "E": 'Expire',
    "W": 'อยู่ในระยะผ่อนผันการจ่ายเบี้ยประกัน'
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