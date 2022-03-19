import React from "react"
import locations from "../locations"

export default function InsuranceDetail({ currentPolicyData }) {
  function getCustomerAddress() {
    const fullAddressCode = `${currentPolicyData.cust_province}${currentPolicyData.cust_district}${currentPolicyData.cust_sub_district}`
    const addressObj = locations[fullAddressCode]
    const isKrungthep = currentPolicyData.cust_province === "10"
    return `${isKrungthep ? "แขวง" : "ตำบล"}${addressObj.SubDistrict} ${
      isKrungthep ? "เขต" : "อำเภอ"
    }${addressObj.District} ${isKrungthep ? "" : "จังหวัด"}${
      addressObj.Province
    }`
  }
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
          <div className="list flex">
            <div className="label">ข้อมูลล่าสุด</div>
            <span className="value">-</span>
          </div>
          <div className="hr-line" />
        </div>
        <div>
          <div className="list flex">
            <div className="label">ผู้เอาประกันภัย</div>
            <span className="value">
              {currentPolicyData.cust_first_name}{" "}
              {currentPolicyData.cust_last_name}
            </span>
          </div>
          <div className="hr-line" />
        </div>
        <div>
          <div className="list flex">
            <div className="label">เลขที่บัตรประชาชน</div>
            <span className="value">
              {currentPolicyData.cust_nat_id || "-"}
            </span>
          </div>
          <div className="hr-line" />
        </div>
        <div>
          <div className="list flex">
            <div className="label">ที่อยู่</div>
            <span className="value">{getCustomerAddress()}</span>
          </div>
          <div className="hr-line" />
        </div>
        <div>
          <div className="list flex">
            <div className="label">ชื่อกรมธรรม์</div>
            <span className="value">{currentPolicyData.pol_name || "-"}</span>
          </div>
          <div className="hr-line" />
        </div>
        <div>
          <div className="list flex">
            <div className="label">
              ชื่อกรมธรรม์ที่ได้รับการอนุญาตจากนายทะเบียน
            </div>
            <span className="value">
              {currentPolicyData.pol_name_oic || "-"}
            </span>
          </div>
          <div className="hr-line" />
        </div>
        {currentPolicyData.pol_beneficiary1 &&
          (currentPolicyData.pol_type === "AH" ||
            currentPolicyData.pol_type === "PA") && (
            <div>
              <div className="list flex">
                <div className="label">ผู้รับผลประโยชน์ 1</div>
                <span className="value">
                  {currentPolicyData.pol_beneficiary1 || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.pol_payment_term &&
          (currentPolicyData.pol_type === "MC" ||
            currentPolicyData.pol_type === "TA") && (
            <div>
              <div className="list flex">
                <div className="label">ประเภทการชำระเบี้ย</div>
                <span className="value">
                  {currentPolicyData.pol_payment_amount.toLocaleString() || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.pol_payment_amount && (
          <div>
            <div className="list flex">
              <div className="label">{`จำนวนเบี้ยต่อปี (บาท)`}</div>
              <span className="value">
                {currentPolicyData.pol_payment_amount.toLocaleString() || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_asst_cov_name &&
          currentPolicyData.pol_type === "FI" && (
            <div>
              <div className="list flex">
                <div className="label">ชื่อทรัพย์สิน/อาคารสถานที่</div>
                <span className="value">
                  {currentPolicyData.policy.pol_asst_cov_name || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_asst_cov_sum_insured &&
          currentPolicyData.pol_type === "FI" && (
            <div>
              <div className="list flex">
                <div className="label">ทุนประกัน (บาท)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_asst_cov_sum_insured.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_asst_fulladdress &&
          currentPolicyData.pol_type === "FI" && (
            <div>
              <div className="list flex">
                <div className="label">
                  ที่อยู่เต็มรูปแบบของที่ตั้งทรัพย์สิน
                </div>
                <span className="value">
                  {currentPolicyData.policy.pol_asst_fulladdress || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_asst_detail &&
          currentPolicyData.pol_type === "FI" && (
            <div>
              <div className="list flex">
                <div className="label">สรุปสาระสำคัญ</div>
                <span className="value">
                  {currentPolicyData.policy.pol_asst_detail || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_acc_cov_death &&
          currentPolicyData.pol_type === "PA" && (
            <div>
              <div className="list flex">
                <div className="label">คุ้มครองกรณีเสียชีวิต (บาท)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_acc_cov_death.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_acc_cov_medical_expense &&
          currentPolicyData.pol_type === "PA" && (
            <div>
              <div className="list flex">
                <div className="label">คุ้มครองค่ารักษาพยาบาล (บาท)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_acc_cov_medical_expense.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_cov_personal_accident &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">
                  ความคุ้มครองกรณีเสียชีวิต/สูญเสียอวัยวะ/ทุพพลภาพถาวร
                </div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_cov_personal_accident.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_cov_medical_expense &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">คุ้มครองค่ารักษาพยาบาล (บาท)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_cov_medical_expense.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_cov_property &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">คุ้มครองทรัพย์สิน (บาท)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_cov_property.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_cov_flight_delay &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">
                  คุ้มครองเที่ยวบินล่าช้า (บาทต่อ 6 ชั่วโมง)
                </div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_cov_flight_delay.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_cov_flight_cancel &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">คุ้มครองกรณียกเลิกเที่ยวบิน</div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_cov_flight_cancel.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_trav_detail &&
          currentPolicyData.pol_type === "TA" && (
            <div>
              <div className="list flex">
                <div className="label">สรุปสาระสำคัญ</div>
                <span className="value">
                  {currentPolicyData.policy.pol_trav_detail || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_heal_cov_ipd_per_year &&
          currentPolicyData.pol_type === "AH" && (
            <div>
              <div className="list flex">
                <div className="label">ค่ารักษาพยาบาลผู้ป่วยใน (บาทต่อปี)</div>
                <span className="value">
                  {currentPolicyData.policy.pol_heal_cov_ipd_per_year.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_heal_cov_ipd_per_time &&
          currentPolicyData.pol_type === "AH" && (
            <div>
              <div className="list flex">
                <div className="label">
                  ค่ารักษาพยาบาลผู้ป่วยใน (บาทต่อครั้ง)
                </div>
                <span className="value">
                  {currentPolicyData.policy.pol_heal_cov_ipd_per_time.toLocaleString() ||
                    "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
        {currentPolicyData.policy.pol_heal_detail && (
          <div>
            <div className="list flex">
              <div className="label">สรุปสาระสำคัญ</div>
              <span className="value">
                {currentPolicyData.policy.pol_heal_detail || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_plateno && (
          <div>
            <div className="list flex">
              <div className="label">ทะเบียนรถ</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_plateno || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {(currentPolicyData.policy.pol_voluntary_province ||
          currentPolicyData.policy.pol_voluntary_plateno) && (
          <div>
            <div className="list flex">
              <div className="label">จังหวัด</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_province || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_type && (
          <div>
            <div className="list flex">
              <div className="label">ประเภทรถ</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_type || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_chassisno && (
          <div>
            <div className="list flex">
              <div className="label">เลขตัวถัง</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_chassisno || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_driver1 && (
          <div>
            <div className="list flex">
              <div className="label">ผู้ขับขี่ 1</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_driver1 || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_driver2 && (
          <div>
            <div className="list flex">
              <div className="label">ผู้ขับขี่ 2</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_driver2 || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_cov_property_damage && (
          <div>
            <div className="list flex">
              <div className="label">
                ความคุ้มครองความเสียหายต่อทรัพย์สินภายนอก (บาท)
              </div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_cov_property_damage.toLocaleString() ||
                  "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_cov_personal_accident && (
          <div>
            <div className="list flex">
              <div className="label">ค่าสินไหมทดแทนกรณีเสียชีวิต (บาท)</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_cov_personal_accident.toLocaleString() ||
                  "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_cov_medical_expense && (
          <div>
            <div className="list flex">
              <div className="label">ค่ารักษาพยาบาล (บาทต่อคน)</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_cov_medical_expense.toLocaleString() ||
                  "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_cov_third_person && (
          <div>
            <div className="list flex">
              <div className="label">
                ความคุ้มครองความเสียหายต่อบุคคลภายนอก (บาทต่อคน)
              </div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_cov_third_person.toLocaleString() ||
                  "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_cov_bail_bond && (
          <div>
            <div className="list flex">
              <div className="label">
                ความคุ้มครองค่าประกันตัวผู้ขับขี่ (บาท)
              </div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_cov_bail_bond.toLocaleString() ||
                  "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_claim_paid && (
          <div>
            <div className="list flex">
              <div className="label">ค่าสินไหมทดแทน</div>
              <span className="value">
                {currentPolicyData.policy.pol_claim_paid || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_voluntary_detail && (
          <div>
            <div className="list flex">
              <div className="label">สรุปสาระสำคัญ</div>
              <span className="value">
                {currentPolicyData.policy.pol_voluntary_detail || "-"}
              </span>
            </div>
            <div className="hr-line" />
          </div>
        )}
        {currentPolicyData.policy.pol_other_detail &&
          currentPolicyData.pol_type === "MI" && (
            <div>
              <div className="list flex">
                <div className="label">สรุปสาระสำคัญ</div>
                <span className="value">
                  {currentPolicyData.policy.pol_other_detail || "-"}
                </span>
              </div>
              <div className="hr-line" />
            </div>
          )}
      </div>
    </div>
  )
}
