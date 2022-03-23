import React from "react"

export default function PolicyMainCard(props) {
  const { isCustomDetail, userInfo, birthDateStore } = props
  return (
    <div className="policy-main-card">
      <div className="logo-wrapper">
        <img className="logo" src="../navakij-logo.png" alt="logo" />
      </div>
      {isCustomDetail ? (
        props.children
      ) : (
        <div className="user-detail-wrapper">
          <div className="flex-column">
            <div className="name">
              {userInfo.firstName} {userInfo.lastName}
            </div>
            <div className="detail-wrapper">
              <div className="detail-label-wrapper">
                <label className="label">เลขที่บัตรประชาชน/Passport</label>
                <span className="value">{userInfo.id}</span>
              </div>
              <div className="detail-label-wrapper">
                <label className="label">วัน/เดือน/ปีเกิด</label>
                <span className="value">{birthDateStore}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
