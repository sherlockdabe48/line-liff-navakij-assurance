import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TermsAndCondition({ headers, apiPath }) {
  const navigate = useNavigate()

  const [isConsent, setIsConsent] = useState(false)
  const [termsConditionsHTML, setTermsConditionsHTML] = useState("")

  const getIsConsent = () => {
    // const res = await axios.get("")
    return false
  }

  const getTermsConditions = async () => {
    const { data } = await axios.get(
      `${apiPath}consent/getmasterconsent/`,
      {
        masterConsentCode: "MC-LINEOA-001",
        system: "LINEOA",
        project: "LINEOA-001",
      },
      { headers: headers }
    )
    setTermsConditionsHTML(data.masterConsent?.consentBodyHtmlText)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${apiPath}consent/checkisconsent`,
        {
          masterConsentCode: "MC-LINEOA-001",
          system: "LINEOA",
          project: "LINEOA-001",
          identityKey: "sherlock48",
        },
        { headers: headers }
      )
      setIsConsent(data.isConsent)
    })()

    if (isConsent) navigate("/verify-identity")
    else getTermsConditions()
  }, [isConsent, navigate])

  return (
    <div className="terms-conditions">
      <div className="terms-conditions-container">{termsConditionsHTML}</div>
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
