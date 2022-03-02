import "./styles/App.scss"
import React from "react"
import axios from "axios"

import { Navigate, Routes, Route } from "react-router-dom"
// import { useLocation } from "react-router-dom";
import Header from "./components/Header"
import TermsAndCondition from "./components/TermsAndCondition"
import VerifyIdentity from "./components/VerifyIdentity"
import { useEffect, useState } from "react"
import liff from "@line/liff"

function App() {
  const apiPath = "https://uat-web.navakij.co.th/consentmanager-api-1.0.0/"

  // function useQuery() {
  //   const { search } = useLocation();
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }
  // const query = useQuery();

  // const [pictureUrl, setPictureUrl] = useState("");
  // const [idToken, setIdToken] = useState("")
  // const [displayName, setDisplayName] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");
  // const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null)

  const runApp = async () => {
    await liff.init({ liffId: "1656915926-p1LyQKPo" })
    // getUserProfile()
  }

  // async function getUserProfile() {
  //   const profile = await liff.getProfile()
  //   setProfile(profile)
  //   console.log("profile " + profile)
  // }

  useEffect(() => {
    runApp()
  }, [runApp])

  return (
    <div className="App">
      <Header />
      {/* <div>profile: {profile}</div> */}
      <Routes>
        <Route
          path="/terms-conditions"
          element={<TermsAndCondition apiPath={apiPath} headers={headers} />}
        />
        <Route path="/verify-identity" element={<VerifyIdentity />} />
        <Route path="*" element={<Navigate to="/terms-conditions" replace />} />
      </Routes>
    </div>
  )
}

export default App
