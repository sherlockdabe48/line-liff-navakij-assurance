import React from "react"

export default function PolicySubCard({
  policyData,
  navigateToEachPolicy,
  policyTypeCodeToName,
}) {
  return (
    <div className="policy-sub-card flex">
      {(policyData.pol_type === "MV" || policyData.pol_type === "MC") && (
        <div className="label-wrapper">
          <div className="flex">
            <div className="label">ประเภท</div>
            <div className="value">
              ประกัน{policyTypeCodeToName[policyData.pol_type]}
            </div>
          </div>
          <div className="flex">
            <div className="label">ชื่อผู้เอาประกัน</div>
            <div className="value">
              {policyData.cust_first_name} {policyData.cust_last_name}
            </div>
          </div>
          <div className="flex">
            <div className="label">ทะเบียนรถ</div>
            <div className="value">
              {policyData?.policy?.pol_voluntary_plateno}
            </div>
          </div>
          <div className="flex">
            <div className="label">เลขกรมธรรม์</div>
            <div className="value">{policyData.pol_id}</div>
          </div>
          <div className="flex">
            <div className="label">เริ่มต้นวันที่</div>
            <div className="value">
              {policyData.pol_start_date.split(" ")[0]}
            </div>
          </div>
          <div className="flex">
            <div className="label">สิ้นสุดวันที่</div>
            <div className="value">{policyData.pol_end_date.split(" ")[0]}</div>
          </div>
        </div>
      )}

      {(policyData.pol_type === "AH" ||
        policyData.pol_type === "FI" ||
        policyData.pol_type === "PA" ||
        policyData.pol_type === "TA" ||
        policyData.pol_type === "MI") && (
        <div className="label-wrapper">
          <div className="flex">
            <div className="label">ประเภท</div>
            <div className="value">
              ประกัน{policyTypeCodeToName[policyData.pol_type]}
            </div>
          </div>
          <div className="flex">
            <div className="label">ชื่อผู้เอาประกัน</div>
            <div className="value">
              {policyData.cust_first_name} {policyData.cust_last_name}
            </div>
          </div>
          <div className="flex">
            <div className="label">ผลิตภัณฑ์</div>
            <div className="value">{policyData?.pol_sub_type}</div>
          </div>
          <div className="flex">
            <div className="label">เลขกรมธรรม์</div>
            <div className="value">{policyData.pol_id}</div>
          </div>
          <div className="flex">
            <div className="label">เริ่มต้นวันที่</div>
            <div className="value">
              {policyData.pol_start_date.split(" ")[0]}
            </div>
          </div>
          <div className="flex">
            <div className="label">สิ้นสุดวันที่</div>
            <div className="value">{policyData.pol_end_date.split(" ")[0]}</div>
          </div>
        </div>
      )}

      {policyData.pol_type === "AH" && (
        <div className="label-wrapper">
          <div className="flex">
            <div className="label">ประเภท</div>
            <div className="value">
              ประกัน{policyTypeCodeToName[policyData.pol_type]}
            </div>
          </div>
          <div className="flex">
            <div className="label">ชื่อผู้เอาประกัน</div>
            <div className="value">
              {policyData.cust_first_name} {policyData.cust_last_name}
            </div>
          </div>
          <div className="flex">
            <div className="label">ผลิตภัณฑ์</div>
            <div className="value">{policyData?.pol_sub_type}</div>
          </div>
          <div className="flex">
            <div className="label">เลขกรมธรรม์</div>
            <div className="value">{policyData.pol_id}</div>
          </div>
          <div className="flex">
            <div className="label">เริ่มต้นวันที่</div>
            <div className="value">
              {policyData.pol_start_date.split(" ")[0]}
            </div>
          </div>
          <div className="flex">
            <div className="label">สิ้นสุดวันที่</div>
            <div className="value">{policyData.pol_end_date.split(" ")[0]}</div>
          </div>
        </div>
      )}

      <div className="next-button-wrapper">
        <img
          src="../next-icon.png"
          alt="next"
          onClick={() =>
            navigateToEachPolicy(policyTypeCodeToName[policyData.pol_type])
          }
        />
      </div>
    </div>
  )
}
