import React from "react"

export default function InsuranceDetail({ insuranceDetail }) {
  return (
    <div className="insurance-detail">
      <div className="title-wrapper flex-column">
        <div className="title">ข้อมูลกรมธรรม์โดยย่อ</div>
        <div className="triangle-icon">
          <img src="../triangle.png" />
        </div>
      </div>
      <div className="detail-wrapper">
        <div>
          {Object.keys(insuranceDetail).map((itemKey, index) => {
            return (
              <>
                <div className="list flex" key={itemKey}>
                  <div className="label">{itemKey}</div>
                  <span className="value">{insuranceDetail[itemKey]}</span>
                </div>
                <div className="hr-line" />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
