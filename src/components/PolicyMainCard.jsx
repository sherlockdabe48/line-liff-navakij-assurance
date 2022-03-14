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
            <div className="flex detail-wrapper">
              <div className="detail-label-wrapper">
                <p>เลขที่บัตรประชาชน/Passport</p>
                <p>วัน/เดือน/ปีเกิด</p>
              </div>
              <div className="detail-value-wrapper">
                <p>{userInfo.id}</p>
                <p>{birthDateStore}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}