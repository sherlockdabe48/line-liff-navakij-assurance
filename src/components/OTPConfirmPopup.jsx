import React, { useEffect, useState } from "react"
import { Close, Refresh } from "@material-ui/icons"
// import RefreshIcon from "@mui/icons-material/Refresh"

export default function OTPConfirmPopup(props) {
  const { otpRefData, phoneNumber, handleClose, onSubmitOtp } = props

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""])
  const [otpString, setOtpString] = useState("")

  function handleInputOtp(e, digitStr, index) {
    let currentOtpDigits = [...otpDigits]
    currentOtpDigits[index] = e.target.value
    setOtpDigits(currentOtpDigits)
  }

  function handleSubmit() {
    if (otpDigits.includes("")) {
      console.log("you have white space")
      return
    }
    const stringWithComma = otpDigits.toString()
    const stringNoComma = stringWithComma.replaceAll(",", "")
    setOtpString(stringNoComma)
  }

  useEffect(() => {
    if (otpString) {
      onSubmitOtp(otpString)
    }
  }, [otpString])

  return (
    <div className="modal-container">
      <div className="otp-confirm-popup">
        <Close className="close-icon" onClick={handleClose} />
        <div className="wrapper flex flex-column">
          <h3>ยืนยันรหัส OTP</h3>
          <div className="text-desc-wrapper">
            <p>กรุณากรอกรหัส OTP 6 หลัก</p>
            <p>
              ที่ส่งไปยังเบอร์โทรศัพท์ {phoneNumber} (Ref: {otpRefData.otpRef})
            </p>
          </div>
          <div className="flex otp-input-wrapper">
            {otpDigits.map((digitStr, index) => {
              return (
                <input
                  className="one-digit-input text-center"
                  type="text"
                  key={index}
                  maxLength={1}
                  value={otpDigits[index]}
                  onChange={(e) => handleInputOtp(e, digitStr, index)}
                />
              )
            })}
          </div>
          <div className="refresh">
            <Refresh />
            <span>ส่งรหัส OTP ได้อีกครั้งใน 04.50 นาที</span>
          </div>
          <button
            className="btn btn-primary m-l-40 m-r-40"
            onClick={handleSubmit}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  )
}
