import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingFull from "./LoadingFull"
import publicIp from "public-ip"

export default function TermsAndCondition({ isConsent, authenData }) {
  const navigate = useNavigate()

  // STATES

  const [termsConditionsHTML, setTermsConditionsHTML] = useState("")
  const [isCheckedInput, setIsCheckedInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ip, setIP] = useState("")

  // HOOKS
  useEffect(async () => {
    if (authenData.CONTROLKEY && !termsConditionsHTML) {
      await getTermsConditions()
    }
    if (termsConditionsHTML && isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [termsConditionsHTML])

  useEffect(async () => {
    const userIP = await publicIp.v4()
    setIP(userIP)
  }, [ip.length])

  // FUNCTIONS
  async function getTermsConditions() {
    console.log("getTermsConditions")
    try {
      const { data } = await axios.get(`/consent/getmasterconsent`, {
        params: {
          masterConsentCode: "MC-LINEOA-001",
          system: "LINEOA",
          project: "LINEOA-001",
        },
      })
      setTermsConditionsHTML(data?.masterConsent?.consentBodyHtmlText)
      if (termsConditionsHTML && isLoading) {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
      return Promise.resolve(data)
    } catch (err) {
      console.error(err)
      return Promise.reject(err)
    }
  }

  async function submitSaveConsent() {
    try {
      const { data } = await axios.post("/consent/saveconsentinfo", {
        system: "LINEOA",
        project: "LINEOA-001",
        channel: "LINE",
        masterConsentCode: "MC-LINEOA-001",
        masterConsentVersion: 1,
        consentHeaderHtmlText: "",
        consentBodyHtmlText: "",
        consentFooterHtmlText: "",
        consentFullHtmlText: "",
        identityKeyType: "LINE_ID",
        identityKey: "ID-001",
        isAccept: true,
        clientIpAddress: ip,
        clientInfo: "IPHONE15",
      })
      if (data.msgCode === "SUCCESS") navigate("/verify-identity")
      else console.error("Cannot save consent")
      navigate("/verify-identity") // Mock for dev
      return Promise.resolve(data)
    } catch (err) {
      console.error(err)
      return Promise.reject(err)
    }
  }

  function handleToggleInput() {
    setIsCheckedInput((prevIsCheckedInput) => !prevIsCheckedInput)
  }

  return (
    <>
      {/* {isLoading ? (
        <LoadingFull isLoading={isLoading} />
      ) : ( */}
      <div className="terms-conditions">
        <div className="terms-conditions-container">
          {termsConditionsHTML && (
            <div dangerouslySetInnerHTML={{ __html: termsConditionsHTML }} />
          )}
        </div>
        <div className="input-button-wrapper">
          <label className="input-wrapper">
            <input
              type="checkbox"
              name="accept-terms-conditions"
              onChange={() => handleToggleInput()}
            />
            <span className="checkmark"></span>
            <span className="input-label">
              ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการให้บริการนี้
              กรณีไม่ยอมรับจะไม่สามารถเข้าตรวจสอบข้อมูลได้
            </span>
          </label>
          <div className="button-wrapper flex">
            <button
              onClick={submitSaveConsent}
              className={`btn btn-primary ${
                isCheckedInput ? "" : "btn-disabled"
              }`}
              disabled={!isCheckedInput}
            >
              ยอมรับ
            </button>
            <button className="btn btn-cancel">ไม่ยอมรับ</button>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}
