import "./styles/App.scss";
import React from "react";
import axios from "axios";

import { Navigate, Routes, Route } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import TermsAndCondition from "./components/TermsAndCondition";
import VerifyIdentity from "./components/VerifyIdentity";
import { useEffect, useState } from "react";
import liff from "@line/liff";

function App() {
  // function useQuery() {
  //   const { search } = useLocation();
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }
  // const query = useQuery();

  // const [pictureUrl, setPictureUrl] = useState("");
  const [idToken, setIdToken] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");
  // const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initLine = async () => {
    await liff.init(
      { liffId: "1656915926-p1LyQKPo" },
      () => {
        if (liff.isLoggedIn()) runApp();
        else liff.login();
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken().then(() => {
      setIdToken(idToken);
    });
    liff.getProfile().then((profile) => {
      console.log(profile);
      setProfile(profile);
    });
  };

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <Header />
      {{ profile }}
      <Routes>
        <Route path="/terms-conditions" element={<TermsAndCondition />} />
        <Route path="/verify-identity" element={<VerifyIdentity />} />
        <Route path="*" element={<Navigate to="/terms-conditions" replace />} />
      </Routes>
    </div>
  );
}

export default App;
