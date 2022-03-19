import axios from "axios"
import React, { useEffect, useState } from "react"
import OTPConfirmPopup from "./OTPConfirmPopup"
import { useNavigate } from "react-router-dom"

export default function VerifyIdentity({
  lineId,
  userInfo,
  birthDateStore,
  appendData,
}) {
  // STATES

  const [isFormValid, setIsFormValid] = useState(false)
  const [idPassport, setIdPassport] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({})
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otpRefData, setOtpRefData] = useState(null)

  // HOOKS
  const navigate = useNavigate()

  useEffect(() => {}, [birthDateStore])

  useEffect(() => {
    if (otpRefData) {
      setShowOtpPopup(true)
    }
  }, [form, otpRefData])

  // FUNCTIONS
  async function submitCustomerIdentifying(e) {
    e.preventDefault()
    setForm({
      identityValue: idPassport,
      dateOfBirthString: birthDate,
      mobileNo: phoneNumber,
    })

    if (checkIsFormValid()) {
      try {
        const { data } = await axios.post("/api/customer/identifying", {
          system: "LINEOA",
          project: "LINEOA",
          channel: "LINE",
          masterConsentCode: "MC-LINEOA-001",
          identityType: "LINE_ID",
          identityKey: "ID-001",
          identityValue: idPassport,
          dateOfBirthString: birthDate.split("-").reverse().join("-"),
        })

        if (data.msgCode === "VALID") {
          submitOTPRequest()
        } else if (data.msgCode === "INVALID") {
          navigate("/verify-identity/no-user")
        }
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      console.log("Form is not valid")
    }
  }

  async function submitOTPRequest() {
    try {
      const { data } = await axios.post("/api/customer/otp/request", {
        system: "LINEOA",
        project: "LINEOA",
        channel: "LINE",
        masterConsentCode: "MC-LINEOA-001",
        identityType: "LINE_ID",
        identityValue: idPassport,
        dateOfBirthString: birthDate.split("-").reverse().join("-"),
        identityKey: "ID-001",
        mobileNo: phoneNumber,
      })
      if (data.msgCode === "SUCCESS") {
        setOtpRefData(data.data)
      } else if (
        data.msgCode === "FAILED" &&
        data.msgDescription.includes("Ready customer identity")
      ) {
        navigate("/policy")
      }
      appendData({
        birthDateStore: birthDate.split("-").reverse().join("-"),
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function onSubmitOtp(otpString) {
    if (otpString.length === 6) {
      try {
        const { data } = await axios.post("/api/customer/otp/confirm", {
          system: "LINEOA",
          project: "LINEOA",
          channel: "LINE",
          identityKey: "ID-001",
          mobileNo: phoneNumber,
          optRef: otpRefData.optRef,
          otp: otpString,
        })
        if (data.msgCode === "SUCCESS") {
          handleCloseOtpPopup()
          navigate("/policy")
        }
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
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

  function checkIsFormValid() {
    return (
      idPassport.length === 13 && birthDate.length === 10 && phoneNumber.length
    )
  }

  return (
    <div className="verify-identity">
      <h3 className="m-t-16 m-b-16">การยืนยันตัวตน</h3>
      <form
        className="verify-identity-form"
        onSubmit={submitCustomerIdentifying}
      >
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
            pattern="\d*"
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
        <button
          onClick={() => {
            setShowOtpPopup(true)
          }}
        >
          OpenPopup
        </button>
      </form>
      {/* {otpRefData?.optRef
        ? showOtpPopup && ( */}
      {showOtpPopup && (
        <OTPConfirmPopup
          phoneNumber={phoneNumber}
          otpRefData={otpRefData}
          handleCloseOtpPopup={handleCloseOtpPopup}
          onSubmitOtp={onSubmitOtp}
          submitOTPRequest={submitOTPRequest}
        />
      )}
      {/* //   )
        // : showOtpPopup && "Loading..."} */}
    </div>
  )
}
