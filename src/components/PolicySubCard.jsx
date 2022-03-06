import React from "react"

export default function PolicySubCard({ policyData, navigateToEachPolicy }) {
  return (
    <div className="policy-sub-card flex">
      <div className="label-wrapper">
        {Object.keys(policyData).map((itemKey) => {
          return (
            <div className="flex" key={itemKey}>
              <div className="label">{itemKey}</div>
              <div className="value">{policyData[itemKey]}</div>
            </div>
          )
        })}
      </div>
      <div className="next-button-wrapper">
        <img
          src="../next-icon.png"
          alt="next"
          onClick={() => navigateToEachPolicy(policyData.ประเภท)}
        />
      </div>
    </div>
  )
}
