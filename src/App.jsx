import "./styles/App.scss";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TermsAndCondition from "./components/TermsAndCondition";
import VerifyIdentity from "./components/VerifyIdentity";

function App() {
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
