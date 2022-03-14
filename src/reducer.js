const INITIAL_STATE = {
  userInfo: {
    firstName: '-',
    lastName: '-',
    id: '-',
    birthDate: '-'
  },
  birthDateStore: '-',
  policyTypeCodeToName: {
    "MC": "รถยนต์ภาคบังคับ",
    "MV": "รถยนต์ภาคสมัครใจ",
    "PA": "อุบัติเหตุ",
    "FI": "ทรัพย์สิน",
    "AH": "สุขภาพ",
    "TA": "เดินทาง",
    "MI": "อื่น ๆ",
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