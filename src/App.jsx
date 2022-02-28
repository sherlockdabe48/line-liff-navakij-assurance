import "./styles/App.scss";
import React from "react";
import axios from "axios";

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
  const initLine = async () => {
    await liff.init(
      { liffId: "1656915926-LAjMq7EB" },
      () => {
        if (liff.isLoggedIn()) runApp();
        else liff.login();
      },
      (err) => console.error(err)
    );
  };

  const runApp = async () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    const profile = await liff.getProfile();
    console.log(profile);
    setDisplayName(profile.displayName);
    setPictureUrl(profile.pictureUrl);
    setStatusMessage(profile.statusMessage);
    setUserId(profile.userId);
  };

  // const openWindow = () => {
  //   liff.openWindow
  // }

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const pushClaimMessageMenu = async () => {
    const token =
      "Wy1Zsg1vsejOrMQFpybSvM/OMbYvMmyaf4iYxsHOxexJcVKs1+4uZP+jcRcJSDUkstjVtcFRyst1Hq3WyAgFiNnZ4WiVJHCJpKGG8PbmahPk+t8IUTuxvyBNkyNRIBCY6EvOaAaA6sFirOtTEIY91gdB04t89/1O/w1cDnyilFU=";
    try {
      await axios.post(
        "https://cors-anywhere.herokuapp.com/https://api.line.me/v2/bot/message/push",
        {
          to: "U39b4954db3c1a4e88fd9d14c0b210e0a",
          messages: [
            {
              type: "flex",
              altText: "ผลิตภัณฑ์ประกันภัยและสินค้า",
              contents: {
                type: "carousel",
                contents: [
                  {
                    type: "bubble",
                    direction: "ltr",
                    hero: {
                      type: "image",
                      url: "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                      size: "full",
                      aspectRatio: "1.51:1",
                      aspectMode: "fit",
                      action: {
                        type: "uri",
                        uri: "https://www.navakij.co.th/th/products/motor-insurance",
                      },
                    },
                  },
                  {
                    type: "bubble",
                    direction: "ltr",
                    hero: {
                      type: "image",
                      url: "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                      size: "full",
                      aspectRatio: "1.51:1",
                      aspectMode: "fit",
                      action: {
                        type: "uri",
                        uri: "https://www.navakij.co.th/th/products/miscellaneous-insurance",
                      },
                    },
                  },
                  {
                    type: "bubble",
                    direction: "ltr",
                    hero: {
                      type: "image",
                      url: "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                      size: "full",
                      aspectRatio: "1.51:1",
                      aspectMode: "fit",
                      action: {
                        type: "uri",
                        uri: "https://www.navakij.co.th/th/products/property-insurance",
                      },
                    },
                  },
                  {
                    type: "bubble",
                    direction: "ltr",
                    hero: {
                      type: "image",
                      url: "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
                      size: "full",
                      aspectRatio: "1.51:1",
                      aspectMode: "fit",
                      action: {
                        type: "uri",
                        uri: "https://www.navakij.co.th/th/products/marine--transportation-insurance",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // liff.closeWindow();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    initLine();
    if (query.get("products")) pushClaimMessageMenu();
  }, []);

  return (
    <div className="App">
      <Header />
      Version 2.0
      <button onClick={logout}>Logout</button>
      <br />
      <img src={pictureUrl} alt="" />
      <br />
      idToken: {idToken}
      <br />
      displayName: {displayName}
      <br />
      statusMessage: {statusMessage}
      <br />
      userId: {userId}
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
