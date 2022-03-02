import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TermsAndCondition() {
  const navigate = useNavigate()

  const [isConsent, setIsConsent] = useState(false)

  const getIsConsent = async () => {
    // const res = await axios.get("")
    return false
  }

  useEffect(() => {
    const checkIsConsent = () => {
      if (isConsent) navigate("/verify-identity")
    }
    setIsConsent(getIsConsent())
    checkIsConsent()
  }, [isConsent, navigate])

  return (
    <div className="terms-conditions">
      <div className="terms-conditions-container"></div>
      <div className="input-button-wrapper">
        <label className="input-wrapper">
          <input type="checkbox" name="accept-terms-conditions" />
          <span className="checkmark"></span>
          <span className="input-label">
            ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการให้บริการนี้
            กรณีไม่ยอมรับจะไม่สามารถเข้าตรวจสอบข้อมูลได้
          </span>
        </label>
        <div className="button-wrapper flex">
          <button
            onClick={() => navigate("/verify-identity")}
            className="btn btn-primary"
          >
            ยอมรับ
          </button>
          <button className="btn">ไม่ยอมรับ</button>
        </div>
      </div>
    </div>
  )
}
