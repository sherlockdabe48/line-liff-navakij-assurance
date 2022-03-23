import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingFull from "./LoadingFull"
import publicIp from "public-ip"
import { MinimalSpinner } from "loading-animations-react"

export default function TermsAndCondition({
  authenData,
  closeLIFF,
  userId,
  userOS,
}) {
  // STATES
  const [termsConditionsHTML, setTermsConditionsHTML] = useState("")
  const [isCheckedInput, setIsCheckedInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSmall, setIsLoadingSmall] = useState(false)
  const [ip, setIP] = useState("")

  // HOOKS
  const navigate = useNavigate()

  // เมื่อเข้า Component นี้แล้วจะ get term and conditions จาก API
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

  // ทำการ get user ip ก่อนตั้งแต่เข้ามาเก็บไว้เลย เพราะว่าเดี๋ยวจะนำไปใช้ตอน Post saveconsent
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
          project: "LINEOA",
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
    setIsLoadingSmall(true)
    try {
      const { data } = await axios.post("/consent/saveconsentinfo", {
        system: "LINEOA",
        project: "LINEOA",
        channel: "LINE",
        masterConsentCode: "MC-LINEOA-001",
        masterConsentVersion: 1,
        consentHeaderHtmlText: "",
        consentBodyHtmlText: "",
        consentFooterHtmlText: "",
        consentFullHtmlText: "",
        identityKeyType: "LINE_ID",
        identityKey: userId,
        isAccept: true,
        clientIpAddress: ip,
        clientInfo: userOS,
      })
      // If saveconsent is success go to verification page
      // ถ้า Consent สำเร็จ จะไปที่หน้า "/verify-identity" ถ้าไม่สำเร็จระบบจะค้างที่หน้า loading หมุน ๆ
      if (data.msgCode === "SUCCESS") {
        navigate("/verify-identity")
        setIsLoadingSmall(false)
      } else console.error("Cannot save consent")
      return Promise.resolve(data)
    } catch (err) {
      console.error(err)
      setIsLoadingSmall(false)
      return Promise.reject(err)
    }
  }

  function handleToggleInput() {
    setIsCheckedInput((prevIsCheckedInput) => !prevIsCheckedInput)
  }

  return (
    <>
      {isLoading ? (
        <LoadingFull isLoading={isLoading} />
      ) : (
        <div className="terms-conditions">
          {isLoadingSmall ? (
            <MinimalSpinner color="#3B90FE" text="" className="loading" />
          ) : (
            ""
          )}
          <div className="terms-conditions-container">
            {termsConditionsHTML && (
              <div dangerouslySetInnerHTML={{ __html: termsConditionsHTML }} />
            )}
          </div>
          <div className="input-button-wrapper">
            <label className="input-wrapper">
              <input
                className="checkbox-large"
                type="checkbox"
                name="accept-terms-conditions"
                onChange={() => handleToggleInput()}
              />
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
              <button className="btn btn-cancel" onClick={() => closeLIFF()}>
                ไม่ยอมรับ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
