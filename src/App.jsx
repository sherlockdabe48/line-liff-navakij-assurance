import "./styles/App.scss";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TermsAndCondition from "./components/TermsAndCondition";
import VerifyIdentity from "./components/VerifyIdentity";
// import { useEffect, useState } from 'react';
// import liff from '@line/liff'

function App() {
  // const [pictureUrl, setPictureUrl] = useState(logo)
  // const [idToken, setIdToken] = useState('')
  // const [displayName, setDisplayName] = useState('')
  // const [statusMessage, setStatusMessage] = useState('')
  // const [userId, setUserId] = useState('')

  // const initLine = () => {
  //   liff.init({ liffId: '1656915926-LAjMq7EB' }, () => {
  //     if (liff.isLoggedIn()) runApp()
  //     else liff.login()
  //   }, err => console.error(err))
  // }

  // const runApp = () => {
  //   const idToken = liff.getIDToken();
  //   setIdToken(idToken);
  //   liff.getProfile().then(profile => {
  //     console.log(profile);
  //     setDisplayName(profile.displayName);
  //     setPictureUrl(profile.pictureUrl);
  //     setStatusMessage(profile.statusMessage);
  //     setUserId(profile.userId);
  //   }).catch(err => console.error(err));
  // }

  // const logout = () => {
  //   liff.logout();
  //   window.location.reload()
  // }

  // useEffect(() => {
  //   initLine()
  // }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/terms-conditions" element={<TermsAndCondition />} />
        <Route path="/verify-identity" element={<VerifyIdentity />} />
        <Route path="*" element={<Navigate to="/terms-conditions" replace />} />
      </Routes>
    </div>
  );
}

export default App;
