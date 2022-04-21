import axios from "axios"
import React, { useEffect, useState } from "react"
import OTPConfirmPopup from "./OTPConfirmPopup"
import { useNavigate } from "react-router-dom"
import { MinimalSpinner } from "loading-animations-react"

export default function VerifyIdentity({
  birthDateStore,
  appendData,
  userId,
  apiPath,
}) {
  // STATES

  const [idPassport, setIdPassport] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form, setForm] = useState({})
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otpRefData, setOtpRefData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpConfirmError, setIsOtpConfirmError] = useState(false)

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
        const { data } = await axios.post(apiPath.CUSTOMER_IDENTIFY_PATH, {
          identityKey: userId || "",
          identityValue: idPassport,
          dateOfBirthString: birthDate,
          dateTime: new Date(),
        })

        if (data.msgCode === "VALID") {
          submitOTPRequest()
          setIsLoading(false)
        } else if (
          data.msgCode === "INVALID" ||
          data.msgCode === "SYSTEM_ERROR"
        ) {
          navigate("/verify-identity/no-user")
        }
      } catch (err) {
        setIsLoading(false)
        return Promise.reject(err)
      }
    } else {
      setIsLoading(false)
    }
  }

  async function submitOTPRequest() {
    setIsLoading(true)
    try {
      const { data } = await axios.post(apiPath.OTP_REQUEST_PATH, {
        identityValue: idPassport,
        dateOfBirthString: birthDate,
        identityKey: userId || "",
        mobileNo: phoneNumber,
        dateTime: new Date(),
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
        birthDateStore: birthDate,
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
        const { data } = await axios.post(apiPath.OTP_CONFIRM_PATH, {
          identityKey: userId || "",
          mobileNo: phoneNumber,
          optRef: otpRefData.optRef,
          otp: otpString,
          dateTime: new Date(),
        })
        if (data.msgCode === "SUCCESS") {
          handleCloseOtpPopup()
          navigate("/policy")
          setIsOtpConfirmError(false)
          setIsLoading(false)
        } else if (data.msgCode === "FAILED") {
          setIsOtpConfirmError(true)
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
      let birthDateBeforeFormat = e.target.value
      setBirthDate(birthDateBeforeFormat.replaceAll("/", "-"))
    }
    if (type === "phoneNumber") {
      setPhoneNumber(e.target.value)
    }
  }

  function handleCloseOtpPopup() {
    setShowOtpPopup(false)
    clearErrorOTPConfirm()
  }

  function clearErrorOTPConfirm() {
    setIsOtpConfirmError(false)
  }

  function checkIsFormValid() {
    return (
      idPassport.length === 13 &&
      birthDate.length === 10 &&
      phoneNumber.length === 10 &&
      /([aA-zZ])+/g.test(phoneNumber) === false
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
            วัน/เดือน/ปีเกิด(ค.ศ.)*
          </label>
          <input
            className="input-item"
            name="birth-date"
            placeholder="DD/MM/YYYY"
            pattern="[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]*"
            size={10}
            maxlength={10}
            onChange={(e) => handleChange(e, "birthDate")}
            onKeyUp={(e) => {
              e.target.value = e.target.value
                .replace(/^(\d\d)(\d)$/g, "$1/$2")
                .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
                .replace(/[^\d\/]/g, "")
            }}
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
            placeholder="0xxxxxxxxxx"
            size={10}
            maxlength={10}
            value={phoneNumber}
            onChange={(e) => handleChange(e, "phoneNumber")}
            onKeyUp={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "")
            }}
          />
          {/([aA-zZ])+/g.test(phoneNumber) ? (
            <span className="warning-label">กรุณาระบุตัวเลขเท่านั้น</span>
          ) : (
            ""
          )}
        </div>
        <button
          className={`btn btn-primary verify-button ${
            checkIsFormValid() ? "" : "btn-disabled"
          }`}
          type="submit"
          disabled={!checkIsFormValid()}
        >
          ตรวจสอบ
        </button>
      </form>
      {showOtpPopup && (
        <OTPConfirmPopup
          phoneNumber={phoneNumber}
          otpRefData={otpRefData}
          handleCloseOtpPopup={handleCloseOtpPopup}
          submitConfirmOTP={submitConfirmOTP}
          submitOTPRequest={submitOTPRequest}
          isOtpConfirmError={isOtpConfirmError}
          clearErrorOTPConfirm={clearErrorOTPConfirm}
        />
      )}
    </div>
  )
}
