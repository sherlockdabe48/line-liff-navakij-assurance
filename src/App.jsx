import "./styles/App.scss"
import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { appendData } from "./action"

import { Navigate, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import TermsAndCondition from "./components/TermsAndCondition"
import VerifyIdentity from "./components/VerifyIdentity"
import { useEffect, useState } from "react"
import liff from "@line/liff"
import Policy from "./components/Policy"
import PolicyEach from "./components/PolicyEach"
import NoUser from "./components/NoUser"
import { useNavigate } from "react-router-dom"

function App({
  appendData,
  userInfo,
  policyTypeCodeToName,
  birthDateStore,
  policyDataListStore,
  policyStatusCodeToName,
}) {
  // STATE MANAGEMENT
  const [authenData, setAuthenData] = useState({})
  // const [headers, setHeaders] = useState({})
  const [controlKey, setControlKey] = useState(null)
  const [authorization, setAuthorization] = useState(null)
  // const [pictureUrl, setPictureUrl] = useState("");
  // const [idToken, setIdToken] = useState("")
  // const [displayName, setDisplayName] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");
  // const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null)
  const [isConsent, setIsConsent] = useState(null)

  // GLOBAL CONSTANT
  axios.defaults.headers = {
    CONTROLKEY: authenData.CONTROLKEY,
    Authorization: `Bearer ${authenData.Authorization}`,
    "content-Type": "application/json",
  }

  // HOOKS

  const navigate = useNavigate()

  useEffect(async () => {
    // runApp()
    if (!authenData.CONTROLKEY) {
      await loginNavakij()
    }

    //  ถ้าได้ค่า CONTROLKEY ซึ่งมาจาก API login แล้ว แต่ยังไม่รู้ว่า Consent หรือยัง (null) ให้ไปเช็ก checkIsConsent()
    if (authenData.CONTROLKEY && isConsent === null) {
      await checkIsConsent()
    }

    // ถ้า Consent แล้ว ไปหน้า /verify-identity ถ้าไม่ให้ไปหน้า /terms-condition
    if (isConsent) navigate("/verify-identity")
    else navigate("/terms-condition")
  }, [authenData, isConsent])

  // LINE LIFF FUNCTIONS

  const runApp = async () => {
    await liff.init({ liffId: "1656915926-p1LyQKPo" })
    // getUserProfile()
  }

  // async function getUserProfile() {
  //   const profile = await liff.getProfile()
  //   setProfile(profile)
  //   console.log("profile " + profile)
  // }

  // API CALL NAVAKIJ FUNCTIONS

  async function loginNavakij() {
    console.log("loginNavakij")
    try {
      const res = await axios.post("/login/token", {
        username: "test.call.nauth@navakij.co.th",
        password: "iydKk8;k,x]vf4yp2565",
        system: "APICALL",
        project: "APICALL",
      })
      setAuthenData(res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function checkIsConsent() {
    console.log("checkIsConsent")
    try {
      const { data } = await axios.get("/consent/checkisconsent", {
        params: {
          masterConsentCode: "MC-LINEOA-001",
          system: "LINEOA",
          project: "LINEOA-001",
          identityKey: "ID-001",
        },
      })
      console.log(data)
      setIsConsent(data.isConsent)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Header />
      {/* <div>profile: {profile}</div> */}
      <Routes>
        <Route
          path="/terms-conditions"
          element={
            <TermsAndCondition authenData={authenData} isConsent={isConsent} />
          }
        />
        <Route
          path="/verify-identity"
          element={
            <VerifyIdentity
              userInfo={userInfo}
              birthDateStore={birthDateStore}
              appendData={appendData}
            />
          }
        />
        <Route path="/verify-identity/no-user" element={<NoUser />} />
        <Route
          path="/policy"
          element={
            <Policy
              policyDataListStore={policyDataListStore}
              userInfo={userInfo}
              birthDateStore={birthDateStore}
              appendData={appendData}
              policyTypeCodeToName={policyTypeCodeToName}
            />
          }
        />
        <Route
          path="/policy/*"
          element={
            <PolicyEach
              policyDataListStore={policyDataListStore}
              userInfo={userInfo}
              policyTypeCodeToName={policyTypeCodeToName}
              policyStatusCodeToName={policyStatusCodeToName}
            />
          }
        />
        <Route path="*" element={<Navigate to="/terms-conditions" replace />} />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  policyTypeCodeToName: state.policyTypeCodeToName,
  birthDateStore: state.birthDateStore,
  policyDataListStore: state.policyDataListStore,
  policyStatusCodeToName: state.policyStatusCodeToName,
})

const mapDispatchToProps = {
  appendData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
