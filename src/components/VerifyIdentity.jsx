import axios from "axios"
import React, { useEffect, useState } from "react"
import OTPConfirmPopup from "./OTPConfirmPopup"
import { useNavigate } from "react-router-dom"

export default function VerifyIdentity() {
  const navigate = useNavigate()

  const [isFormValid, setIsFormValid] = useState(false)
  const [idPassport, setIdPassport] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({})
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otpRefData, setOtpRefData] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setForm({
      identityValue: idPassport,
      dateOfBirthString: birthDate,
      mobileNo: phoneNumber,
    })

    if (checkIsFormValid()) {
      try {
        console.log("POST API /customer/otp/request")
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
          setOtpRefData(data.data)
        }
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      console.log("Form is not valid")
    }
  }

  function checkIsFormValid() {
    return (
      idPassport.length === 13 && birthDate.length === 10 && phoneNumber.length
    )
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
  }

  function handleCloseOtpPopup() {
    setShowOtpPopup(false)
  }

  function onSubmitOtp(otpString) {
    console.log(otpString)
    handleCloseOtpPopup()
    if (otpString.length === 6) {
      try {
        // const { data } = await axios.post(
        //   "https://uat-web.navakij.co.th/myinformation-api-1.0.0/api/customer/otp/confirm",
        //   {
        //     system: "LINEOA",
        //     project: "LINEOA",
        //     channel: "LINE",
        //     identityKey: "ID-001",
        //     mobileNo: phoneNumber,
        //     optRef: otpRefData.optRef,
        //     otp: otpString,
        //   },
        //   { headers: headers }
        // )
        console.log("POST API customer/otp/confirm")
        console.log("Payload: ", {
          system: "LINEOA",
          project: "LINEOA",
          channel: "LINE",
          identityKey: "ID-001",
          mobileNo: phoneNumber,
          optRef: otpRefData.optRef,
          otp: otpString,
        })
        navigate("/policy")
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }

  useEffect(() => {
    console.log("form: ", form)
    console.log("otpRefData: ", otpRefData)
    if (otpRefData) {
      setShowOtpPopup(true)
    }
  }, [form, otpRefData])

  return (
    <div className="verify-identity">
      <h3 className="m-t-16 m-b-16">การยืนยันตัวตน</h3>
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
            value={phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
          />
        </div>
        <button
          className={`btn btn-primary verify-button ${
            phoneNumber && birthDate && idPassport ? "" : "btn-disabled"
          }`}
          type="submit"
          disabled={!phoneNumber || !birthDate || !idPassport}
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
