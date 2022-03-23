import axios from "axios"
import React, { useEffect, useState } from "react"
import OTPConfirmPopup from "./OTPConfirmPopup"
import { useNavigate } from "react-router-dom"
import { Event } from "@material-ui/icons"
import { MinimalSpinner } from "loading-animations-react"

export default function VerifyIdentity({
  lineId,
  userInfo,
  birthDateStore,
  appendData,
  userId,
}) {
  // STATES

  const [isFormValid, setIsFormValid] = useState(false)
  const [idPassport, setIdPassport] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({})
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otpRefData, setOtpRefData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // HOOKS
  const navigate = useNavigate()

  useEffect(() => {}, [birthDateStore])

  // เมื่อเข้ามาหน้า verfication และ user กรอกฟอร์มครบแล้ว เมื่อกดตรวจสอบจะเรียกฟังชั่น submitCustomerIdentifying()
  // เพื่อยิง API ไปตรวจสอบว่ามีข้อมูลของลูกค้าหรือไม่ ถ้าไม่มีจะไปหน้า NoUser.jsx
  // แต่ถ้ามีข้อมูลจะเรียกฟังชั่น submitOTPRequest() เพื่อขอ OTP ผ่านทาง sms และเมื่อลูกค้ากรอกข้อมูลที่ได้ลงไป และกดยืนยันยังเรียกฟังชั่น submitConfirmOTP() เพื่อทำการยืนยัน
  // เมื่อยืนยันผ่าน ระบบจะพาไปหน้าของกรมธรรม์หลัก Policy.jsx
  useEffect(() => {
    if (otpRefData) {
      setShowOtpPopup(true)
    }
  }, [form, otpRefData])

  // API FUNCTIONS
  async function submitCustomerIdentifying(e) {
    e.preventDefault()
    setForm({
      identityValue: idPassport,
      dateOfBirthString: birthDate,
      mobileNo: phoneNumber,
    })

    if (checkIsFormValid()) {
      setIsLoading(true)
      try {
        const { data } = await axios.post("/api/customer/identifying", {
          system: "LINEOA",
          project: "LINEOA",
          channel: "LINE",
          masterConsentCode: "MC-LINEOA-001",
          identityType: "LINE_ID",
          identityKey: userId,
          identityValue: idPassport,
          dateOfBirthString: birthDate.split("-").reverse().join("-"),
        })

        if (data.msgCode === "VALID") {
          submitOTPRequest()
          setIsLoading(false)
        } else if (data.msgCode === "INVALID") {
          navigate("/verify-identity/no-user")
        }
      } catch (err) {
        setIsLoading(false)
        return Promise.reject(err)
      }
    } else {
      setIsLoading(false)
      console.log("Form is not valid")
    }
  }

  async function submitOTPRequest() {
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/customer/otp/request", {
        system: "LINEOA",
        project: "LINEOA",
        channel: "LINE",
        masterConsentCode: "MC-LINEOA-001",
        identityType: "LINE_ID",
        identityValue: idPassport,
        dateOfBirthString: birthDate.split("-").reverse().join("-"),
        identityKey: userId,
        mobileNo: phoneNumber,
      })
      if (data.msgCode === "SUCCESS") {
        setOtpRefData(data.data)
        setIsLoading(false)
      } else if (
        data.msgCode === "FAILED" &&
        data.msgDescription.includes("Ready customer identity")
      ) {
        navigate("/policy")
        setIsLoading(false)
      }
      appendData({
        birthDateStore: birthDate.split("-").reverse().join("-"),
      })
    } catch (err) {
      setIsLoading(false)
      return Promise.reject(err)
    }
  }

  async function submitConfirmOTP(otpString) {
    if (otpString.length === 6) {
      setIsLoading(true)
      try {
        const { data } = await axios.post("/api/customer/otp/confirm", {
          system: "LINEOA",
          project: "LINEOA",
          channel: "LINE",
          identityKey: userId,
          mobileNo: phoneNumber,
          optRef: otpRefData.optRef,
          otp: otpString,
        })
        if (data.msgCode === "SUCCESS") {
          handleCloseOtpPopup()
          navigate("/policy")
          setIsLoading(false)
        }
        return Promise.resolve()
      } catch (err) {
        setIsLoading(false)
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
      {isLoading ? (
        <MinimalSpinner color="#3B90FE" text="" className="loading" />
      ) : (
        ""
      )}
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
          <Event className="calendar-icon" />
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
        {/* <button
          onClick={() => {
            setShowOtpPopup(true)
          }}
        >
          OpenPopup
        </button> */}
      </form>
      {showOtpPopup && (
        <OTPConfirmPopup
          phoneNumber={phoneNumber}
          otpRefData={otpRefData}
          handleCloseOtpPopup={handleCloseOtpPopup}
          submitConfirmOTP={submitConfirmOTP}
          submitOTPRequest={submitOTPRequest}
        />
      )}
    </div>
  )
}
