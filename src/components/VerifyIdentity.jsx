import React from "react";
import OTPConfirmPopup from "./OTPConfirmPopup";

export default function VerifyIdentity() {
  const handleSubmit = () => {
    console.log("form");
  };

  return (
    <div className="verify-identity">
      <h3>การยืนยันตัวตน</h3>
      <form className="verify-identity-form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label className="form-label" htmlFor="id-passport">
            เลขประจำตัวบัตรประชาชน / Passport*
          </label>
          <input
            className="input-item"
            type="text"
            name="id-passport"
            maxLength={13}
          />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="birth-date">
            วัน/เดือน/ปีเกิด*
          </label>
          <input className="input-item" type="date" name="birth-date" />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="phone-number">
            เบอร์โทรศัพท์*
          </label>
          <input className="input-item" type="number" name="phone-number" />
        </div>
        <button className="btn btn-primary verify-button" type="submit">
          ตรวจสอบ
        </button>
      </form>

      <OTPConfirmPopup />
    </div>
  );
}
