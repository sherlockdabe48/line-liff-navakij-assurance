import "./styles/App.scss"
import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { appendData } from "./action"

import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import TermsAndCondition from "./components/TermsAndCondition"
import VerifyIdentity from "./components/VerifyIdentity"
import { useEffect, useState } from "react"
import Policy from "./components/Policy"
import PolicyEach from "./components/PolicyEach"
import NoUser from "./components/NoUser"
import { useNavigate } from "react-router-dom"

function App({
  appendData,
  apiPath,
  userInfo,
  policyTypeCodeToName,
  birthDateStore,
  policyDataListStore,
  policyStatusCodeToName,
}) {
  // STATE MANAGEMENT
  const [pictureUrl, setPictureUrl] = useState("")
  const [userId, setUserId] = useState("")
  const [userToken, setUserToken] = useState("")
  const [userOS, setUserOS] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isConsent, setIsConsent] = useState(null)

  // HOOKS
  const navigate = useNavigate()

  // useEffect Hook : ฟังชั่นที่อยู่ใน useEffect จะถูกเรียกในครั้งแรกที่มีการเข้าถึง Component นี้
  // และจะถูก Rerender อีกครั้งเมื่อค่าของตัวแปรที่อยู่ใน [] ด้านท้ายของฟังชั่นมีการเปลี่ยนแปลง หากใน [] เป็นค่าว่าง หมายถึงว่าฟังชั่นใน useEffect นั้น ๆ จะถูกเรียกแค่ครั้งดียวในครั้งแรก
  // ในกรณีนี้ runLiff() จะถูกเรียกแค่ครั้งแรกครั้งเดียวของการเข้าถึง App.jsx
  useEffect(async () => {
    await runLiff()
  }, [])

  useEffect(async () => {
    // หากได้ค่า userId มาจากการ init liff แล้วถึงจะนำ userId นี้ไปเช็ก consent ต่อไป
    if (userId.length) {
      await loginNavakij()

      // เมื่อยังไม่รู้ว่า Consent หรือยัง (null) ให้ไปเช็ก checkIsConsent()
      if (isConsent === null) {
        await checkIsConsent()
      }

      // ถ้า Consent แล้ว ให้เช็กว่า Verify หรือยัง ถ้า Verify แล้วให้ไปหน้า /policy ถ้าไม่ ให้ไปหน้า /terms-conditions
      if (isConsent) await checkIsVerify()
      else navigate("/terms-conditions")
    }
  }, [isConsent, userId.length])

  // LINE LIFF FUNCTIONS
  // Function runLiff จะเป็นการยิง API ไปหา Line เพื่อ initiate ก่อนที่จะข้อใช้ข้อมูลของ Line User
  async function runLiff() {
    // liffId ได้มาจาก console ของ line developer > Provider > Chanel > Liff Id "1656990746-QbJoG5ny"
    await liff.init({ liffId: "1656990746-QbJoG5ny" }).catch((err) => {
      throw err
    })
    // เมื่อ User login line แล้ว จะเรียกฟังชั่น liff.getProfile() เพื่อดึงข้อมูลของผู้ใช้
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile()
      const email = liff.getDecodedIDToken().email
      const userToken = liff.getIDToken()
      setPictureUrl(getProfile.pictureUrl)
      setUserId(getProfile.userId)
      setUserToken(userToken)
      setUserEmail(email)

      let getOS = liff.getOS()
      setUserOS(getOS)
    }
  }

  // API CALL NAVAKIJ FUNCTIONS
  async function loginNavakij() {
    try {
      const res = await axios.post(apiPath.AUTHEN_PATH)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function checkIsConsent() {
    try {
      const { data } = await axios.get(apiPath.CHECK_IS_CONSENT_PATH, {
        params: {
          masterConsentCode: "MC-LINEOA-001",
          system: "LINEOA",
          project: "LINEOA",
          identityKey: userId || "",
        },
      })
      setIsConsent(data.isConsent)
    } catch (err) {
      console.error(err)
    }
  }

  async function checkIsVerify() {
    try {
      const { data } = await axios.post(apiPath.POLICY_LIST_PATH, {
        system: "LINEOA",
        project: "LINEOA",
        channel: "LINE",
        identityKey: userId || "",
      })
      if (data.msgCode === "SUCCESS") {
        navigate("/policy")
      } else navigate("/terms-conditions")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/terms-conditions"
          element={
            <TermsAndCondition
              isConsent={isConsent}
              userId={userId}
              userOS={userOS}
              pictureUrl={pictureUrl}
              userEmail={userEmail}
              userToken={userToken}
              apiPath={apiPath}
            />
          }
        />
        <Route
          path="/verify-identity"
          element={
            <VerifyIdentity
              userInfo={userInfo}
              birthDateStore={birthDateStore}
              appendData={appendData}
              userId={userId}
              apiPath={apiPath}
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
              userId={userId}
              apiPath={apiPath}
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
        <Route path="/" element={<Home />} />
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
  apiPath: state.apiPath,
})

const mapDispatchToProps = {
  appendData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
