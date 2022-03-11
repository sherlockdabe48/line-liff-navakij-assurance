import React from "react"
import { Phone } from "@material-ui/icons"

export default function NoUser() {
  return (
    <div className="no-user">
      <p>ขออภัยไม่พบข้อมูลของท่านในระบบ</p>
      <p>กรุณาติดต่อ</p>
      <a href="tel:1748" className="call-wrapper">
        <Phone className="phone-icon" />
        <span className="text">1748</span>
      </a>
    </div>
  )
}
