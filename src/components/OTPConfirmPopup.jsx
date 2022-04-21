import React, { useEffect, useState } from "react"
import { Close, Refresh } from "@material-ui/icons"

export default function OTPConfirmPopup(props) {
  const {
    otpRefData,
    phoneNumber,
    handleCloseOtpPopup,
    submitConfirmOTP,
    submitOTPRequest,
    isOtpConfirmError,
    clearErrorOTPConfirm,
  } = props

  // STATES
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""])
  const [otpString, setOtpString] = useState("")
  const [count, setCount] = useState(30)
  const [canClickSendOtpAgain, setCanClickSendOtpAgain] = useState(false)

  // HOOKS
  useEffect(() => {
    if (count === 0) {
      setCanClickSendOtpAgain(true)
    }
  }, [count])

  // เมื่อ Popup นี้แสดงขึ้นจะถูกต้องเวลา 30 วินาทีถอยหลัง เพื่อกันไม่ให้ลูกค้ากดปุ่ม ขอรหัส OTP อีกครั้งย้ำ ๆ จะกดได้อีกครั้งก็ต่อเมื่อเวลา ครบ 30 วินาที และจะทำการขอรหัส OTP อีกครั้ง
  useEffect(() => {
    if (otpString) {
      submitConfirmOTP(otpString)
    }
  }, [otpString])

  useEffect(() => {
    if (otpRefData) {
      startTimer(30)
    }
  }, [])

  useEffect(() => {}, [isOtpConfirmError])

  // OTHER FUNCTIONS
  function handleInputOtp(e, digitStr, index) {
    const { maxLength, value, name } = e.target
    const [fieldName, fieldIndex] = name.split("-")

    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 6) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=otp-${parseInt(fieldIndex, 10) + 1}]`
        )
        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus()
        }
      }
    }
    let currentOtpDigits = [...otpDigits]
    currentOtpDigits[index] = e.target.value
    setOtpDigits(currentOtpDigits)
  }

  // PREPARE OTP
  function handleSubmit() {
    if (otpDigits.includes("")) {
      // you have white space in otp input please fill all input otherwise return this fuction
      return
    }
    const stringWithComma = otpDigits.toString()
    const stringNoComma = stringWithComma.replaceAll(",", "")
    setOtpString(stringNoComma)
  }

  // TIMER FUNCTION FOR OTP RESENDING
  var timer
  var startTimer = (duration) => {
    timer = duration
    var seconds
    const myInterval = setInterval(function () {
      seconds = parseInt(timer % 60, 10)
      setCount(seconds)
      --timer
      if (timer < 0) {
        timer = 0
        clearInterval(myInterval)
      }
    }, 1000)
  }

  function handleRefreshOtp() {
    clearErrorOTPConfirm()
    submitOTPRequest()
    setCanClickSendOtpAgain(false)
    timer = 30
    startTimer(timer)
    setOtpDigits(["", "", "", "", "", ""])
  }

  return (
    <div className="modal-container">
      <div className="otp-confirm-popup">
        <Close className="close-icon" onClick={() => handleCloseOtpPopup()} />
        <div className="wrapper flex flex-column">
          <h3>ยืนยันรหัส OTP</h3>
          <div className="text-desc-wrapper">
            <p>กรุณากรอกรหัส OTP 6 หลัก</p>
            <p>
              ที่ส่งไปยังเบอร์โทรศัพท์ {phoneNumber.slice(0, 3)}-
              {phoneNumber.slice(3, 6)}-XXXX
            </p>
            <p>(Ref: {otpRefData?.optRef})</p>
          </div>
          <div>
            <div className="flex otp-input-wrapper">
              {otpDigits.map((digitStr, index) => {
                return (
                  <input
                    className="one-digit-input text-center"
                    type="text"
                    pattern="\d*"
                    key={index}
                    name={`otp-${index + 1}`}
                    maxLength={1}
                    value={otpDigits[index]}
                    onFocus={(e) => {
                      e.target.select()
                    }}
                    onChange={(e) => handleInputOtp(e, digitStr, index)}
                  />
                )
              })}
            </div>
            {isOtpConfirmError ? (
              <div className="otp-error-warning">
                <span>รหัสผิด กรุณากรอกใหม่อีกครั้ง</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {canClickSendOtpAgain ? (
            <div className="refresh" onClick={() => handleRefreshOtp()}>
              <Refresh />
              <span>ขอรหัส OTP อีกครั้ง</span>
            </div>
          ) : (
            <div>
              ขอรหัส OTP ใหม่ได้อีกครั้งใน<span id="time"> {count}</span> วินาที
            </div>
          )}
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
