import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TermsAndCondition({ headers, apiPath }) {
  const navigate = useNavigate()

  const [isConsent, setIsConsent] = useState(false)
  const [termsConditionsHTML, setTermsConditionsHTML] = useState("")

  axios.defaults.headers = {
    CONTROLKEY:
      "663FA29A4761FFEB89DC56944333A28296014D21F09BAF92A6F3027C99C61F2E",
    Authorization: "Bearer 32f452ff-41fb-50cd-9b13-156e56b84880",
    "content-Type": "application/json",
  }

  const getTermsConditions = async () => {
    const { data } = await axios.get(`${apiPath}consent/getmasterconsent/`, {
      masterConsentCode: "MC-LINEOA-001",
      system: "LINEOA",
      project: "LINEOA-001",
    })
    setTermsConditionsHTML(data.masterConsent?.consentBodyHtmlText)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get("/consent/checkisconsent", {
        masterConsentCode: "MC-LINEOA-001",
        system: "LINEOA",
        project: "LINEOA-001",
        identityKey: "sherlock48",
      })
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
