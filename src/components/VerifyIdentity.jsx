import axios from "axios"
import React, { useState } from "react"
import OTPConfirmPopup from "./OTPConfirmPopup"

export default function VerifyIdentity() {
  const [isFormValid, setIsFormValid] = useState(false)
  const [idPassport, setIdPassport] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({})
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otpRefData, setOtpRefData] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("form: ", form)
    try {
      // const { data } = await axios.post('https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/customer/otp/request', {}, { headers })
      const data = {
        msgCode: "SUCCESS",
        msgDescription: "",
        msgContent: "",
        data: {
          optRef: "Brw8zh",
          otpExpiredOnString: "2022-02-25 13:39:26",
        },
      }
      if (data.msgCode === "SUCCESS") {
        console.log(data.data)
        console.log(otpRefData)
        setOtpRefData(data.data)
        setShowOtpPopup(true)
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }

  function checkIsFormValid() {
    if (
      idPassport.length === 13 &&
      birthDate.length === 10 &&
      phoneNumber.length >= 10
    ) {
      setIsFormValid(true)
    } else setIsFormValid(false)
    // if (!idPassport.length === 13) setIsFormValid(false)
    // else if (!birthDate) setIsFormValid(false)
    // else if (!phoneNumber === 10) setIsFormValid(false)
  }

  function handleChange(e, type) {
    if (type === "id") {
      setIdPassport(e.target.value)
    }
    if (type === "birthDate") {
      setBirthDate(e.target.value)
    }
    if (type === "phoneNumber") {
      setPhoneNumber(e.target.value)
    }

    setForm({
      identityValue: idPassport,
      dateOfBirthString: birthDate,
      mobileNo: phoneNumber,
    })

    checkIsFormValid()
  }

  function handleCloseOtpPopup() {
    setShowOtpPopup(false)
  }

  function onSubmitOtp(otpString) {
    console.log(otpString)
    handleCloseOtpPopup()
  }

  return (
    <div className="verify-identity">
      <h3 className="m-t-16 m-b-16">การยืนยันตัวตน</h3>
      {/* Valid: {isFormValid ? "Yes" : "No"} <br />
      {idPassport.length}
      <br />
      {birthDate.length}
      <br />
      {phoneNumber.length} */}
      <form className="verify-identity-form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label className="form-label" htmlFor="id-passport">
            เลขประจำตัวบัตรประชาชน / Passport*
          </label>
          <input
            className="input-item"
            type="text"
            name="id-passport"
            minLength={13}
            maxLength={13}
            value={idPassport}
            onChange={(e) => handleChange(e, "id")}
          />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="birth-date">
            วัน/เดือน/ปีเกิด*
          </label>
          <input
            className="input-item"
            type="date"
            name="birth-date"
            value={birthDate}
            onChange={(e) => handleChange(e, "birthDate")}
          />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="phone-number">
            เบอร์โทรศัพท์*
          </label>
          <input
            className="input-item"
            type="text"
            name="phone-number"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
          />
        </div>
        <button
          className={`btn btn-primary verify-button ${
            isFormValid ? "" : "btn-disabled"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          ตรวจสอบ
        </button>
      </form>
      {otpRefData?.optRef
        ? showOtpPopup && (
            <OTPConfirmPopup
              phoneNumber={phoneNumber}
              otpRefData={otpRefData}
              handleClose={handleCloseOtpPopup}
              onSubmitOtp={onSubmitOtp}
            />
          )
        : showOtpPopup && "Loading..."}
    </div>
  )
}
