import React from "react"
import PolicyMainCard from "./PolicyMainCard"

export default function PolicyEach() {
  return (
    <div className="policy-each">
      <div className="policy-main-card-container">
        <PolicyMainCard isCustomDetail={true}>
          <div className="detail-wrapper flex-column">
            <div className="name-wrapper">
              <p className="user-name">
                <strong>นายประกัน ชั้นดี</strong>
              </p>
              <p className="policy-type">ประกันทรัพย์สิน</p>
            </div>
            <div className="policy-detail-wrapper">
              <div className="flex label-wrapper policy-number">
                <label className="label">เลขกรมธรรม์/ เลขหน้าบัตร</label>
                <span>H04BNN002</span>
              </div>
              <div className="flex label-wrapper policy-number">
                <label className="label">สถานะ</label>
                <span>มีความคุ้มครอง</span>
              </div>
              <div className="flex label-wrapper policy-number">
                <label className="label">ระยะเวลาคุ้มครอง</label>
                <div>
                  <p>เริ่ม 31/12/2021</p>
                  <p>สิ้นสุด 31/12/2022</p>
                </div>
              </div>
            </div>
          </div>
        </PolicyMainCard>
      </div>
      {/* <div className="policy-sub-card-container">
        {policyDataList.map((item, index) => {
          return (
            <PolicySubCard
              policyData={item}
              key={index}
              navigateToEachPolicy={navigateToEachPolicy}
            />
          )
        })}
      </div> */}
    </div>
  )
}
