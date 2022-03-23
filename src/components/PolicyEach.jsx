import React, { useEffect } from "react"
import InsuranceDetail from "./InsuranceDetail"
import PolicyMainCard from "./PolicyMainCard"
import { Phone } from "@material-ui/icons"
import { useLocation } from "react-router-dom"

export default function PolicyEach({
  userInfo,
  policyDataListStore,
  policyTypeCodeToName,
  policyStatusCodeToName,
}) {
  // ที่หน้านี้จะดึงข้อมูลที่ได้มาจาก STATE เพื่อมาแสดงผล

  const location = useLocation()
  const policyType = location.pathname.split("/policy/")[1]
  const currentPolicyData = policyDataListStore.find(
    (obj) => obj.pol_type === policyType
  )

  return (
    <div className="policy-each">
      <div className="policy-main-card-container">
        <PolicyMainCard isCustomDetail={true}>
          <div className="detail-wrapper flex-column">
            <div className="name-wrapper">
              <p className="user-name">
                <strong>
                  {userInfo.firstName} {userInfo.lastName}
                </strong>
              </p>
              <p className="policy-type">
                {policyTypeCodeToName[currentPolicyData?.pol_type]}
              </p>
            </div>
            <div className="policy-detail-wrapper">
              <div className="flex label-wrapper policy-number">
                <label className="label">เลขกรมธรรม์/ เลขหน้าบัตร</label>
                <span className="value">{currentPolicyData.pol_id}</span>
              </div>
              <div className="flex label-wrapper policy-number">
                <label className="label">สถานะ</label>
                <span className="value">
                  {policyStatusCodeToName[currentPolicyData.pol_status_active]}
                </span>
              </div>
              <div className="flex label-wrapper policy-number">
                <label className="label">ระยะเวลาคุ้มครอง</label>
                <div>
                  <p className="value">
                    เริ่ม {currentPolicyData.pol_start_date.split(" ")[0]}
                  </p>
                  <p className="value">
                    สิ้นสุด {currentPolicyData.pol_end_date.split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PolicyMainCard>
      </div>
      <div className="insurance-detail-container">
        <InsuranceDetail currentPolicyData={currentPolicyData} />
      </div>
      <div className="footer">
        <a href="tel:1748" className="call-wrapper flex">
          <Phone className="phone-icon" />
          <span className="text">1748 กด 4</span>
        </a>
      </div>
    </div>
  )
}
