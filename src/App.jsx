import "./styles/App.scss";
import React from "react";

// import { Navigate, Routes, Route,  } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
// import TermsAndCondition from "./components/TermsAndCondition";
// import VerifyIdentity from "./components/VerifyIdentity";
import { useEffect, useState } from "react";
import liff from "@line/liff";

function App() {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  const [pictureUrl, setPictureUrl] = useState("");
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initLine = () => {
    liff.init(
      { liffId: "1656915926-LAjMq7EB" },
      () => {
        if (liff.isLoggedIn()) runApp();
        else liff.login();
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff
      .getProfile()
      .then((profile) => {
        console.log(profile);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  // const openWindow = () => {
  //   liff.openWindow
  // }

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  useEffect(() => {
    initLine();
  }, [initLine]);

  return (
    <div className="App">
      <Header />
      <button onClick={logout}>Logout</button>
      {pictureUrl}
      {idToken}
      {displayName}
      {statusMessage}
      {userId}
      <br />
      The products in the query string is "{query.get("products")}"
      <br />
      The claims in the query string is "{query.get("claims")}"
      {/* <Routes>
        <Route path="/terms-conditions" element={<TermsAndCondition />} />
        <Route path="/verify-identity" element={<VerifyIdentity />} />
        <Route path="*" element={<Navigate to="/terms-conditions" replace />} />
      </Routes> */}
    </div>
  );
}

export default App;
