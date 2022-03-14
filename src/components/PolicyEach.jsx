import React from "react"
import InsuranceDetail from "./InsuranceDetail"
import PolicyMainCard from "./PolicyMainCard"
import { Phone } from "@material-ui/icons"

export default function PolicyEach({ userInfo }) {
  const insuranceDetail = {
    ข้อมูลล่าสุด: "31/01/2565 เวลา 08.00น.",
    ผู้เอาประกันภัย: "นายประกัน ชั้นดี",
    เลขที่บัตรประชาชน: "888888888888",
    ที่อยู่: "55 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    ชื่อกรมธรรม์: "รถยนต์ นวกิจจัดให้",
    ชื่อกรมธรรม์ที่ได้รับการอนุญาตจากนายทะเบียน: "ประกันรถยนต์ส่วนบุคคล",
    "จำนวนเบี้ยต่อปี(บาท)": "888.00",
    ทะเบียนรถ: "นว 88",
    จังหวัด: "กรุงเทพมหานคร",
    ประเภทรถ: "1.2",
    เลขตัวถัง: "888888888888",
    "ผู้ขับขี่ 1": "สมหวัง ดังตั้งใจ",
    "ผู้ขับขี่ 2": "ปรารถนา ที่ดี",
    ทำประกันผ่าน: "บริษัท 724 มาร์เก็ต จำกัด",
  }

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
      <div className="insurance-detail-container">
        <InsuranceDetail insuranceDetail={insuranceDetail} />
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
