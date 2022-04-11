import React, { useEffect, useState } from "react"
import PolicyMainCard from "./PolicyMainCard"
import PolicySubCard from "./PolicySubCard"
import { useNavigate } from "react-router-dom"
import { Phone } from "@material-ui/icons"
import axios from "axios"

export default function Policy({
  apiPath,
  userInfo,
  birthDateStore,
  appendData,
  policyTypeCodeToName,
  policyDataListStore,
  userId,
}) {
  // เมื่อเข้ามาหน้านี้จะเรียกฟังชั่น getPolicyData() ด้วยการยิง API ไปที่ /api/mypolicy/list และทำการเห็บข้อมูลของลูกค้าลงใน userInfo ที่จะถูกเห็บลงใน STATE
  // (ข้อมูลใน state จะอยู่ใน file ./src/reducer.js)
  // นำข้อมูลที่ได้มาแสดงผลที่ Component PolicyMainCard.jsx หรือหมายถึงบัตรสีน้ำเงินด้านบนในหน้ากรมธรรม์
  // และนำข้อมูลที่อยู่ใน list ของ policy มาแสดงผลที่ component PolicySubCard.jsx
  // เมื่อทำการกดที่ PolicySubCard ระบบจะพาไปหน้าของกรมธรรม์แต่ละชนิด PolicyEach.jsx

  // STATES
  const [policyDataList, setPolicyDataList] = useState([])

  // HOOKS
  const navigate = useNavigate()

  useEffect(async () => {
    await getPolicyData()
  }, [])

  useEffect(() => {
    if (policyDataList[0]?.pol_status_active === "C") {
      navigate("/verify-identity/no-user")
      return
    }
    if (policyDataList[0]?.cust_first_name) {
      appendData({
        userInfo: {
          ...userInfo,
          firstName: policyDataList[0]?.cust_first_name,
          lastName: policyDataList[0]?.cust_last_name,
          id: policyDataList[0]?.cust_nat_id,
          birthDate: policyDataList[0]?.cust_birth_date || birthDateStore,
        },
      })
    }
  }, [
    policyDataList[0]?.cust_first_name,
    userInfo.firstName,
    userInfo.lastName,
    userInfo.id,
    userInfo.birthDate,
  ])

  // FUNCTIONS
  function navigateToEachPolicy(policyType) {
    navigate(`/policy/${policyType}`)
  }

  async function getPolicyData() {
    if (policyDataListStore.length) {
      setPolicyDataList(policyDataListStore)
    } else {
      try {
        const { data } = await axios.post(apiPath.POLICY_LIST_PATH, {
          identityKey: userId || "",
          dateTime: new Date(),
        })
        if (data.msgCode === "SUCCESS") {
          setPolicyDataList(data.data)
          appendData({ policyDataListStore: [...data.data] })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="policy">
      <div className="policy-main-card-container">
        <PolicyMainCard userInfo={userInfo} birthDateStore={birthDateStore} />
      </div>
      <div className="policy-sub-card-container">
        {policyDataList.map((item, index) => {
          return (
            <PolicySubCard
              policyData={item}
              key={index}
              policyTypeCodeToName={policyTypeCodeToName}
              navigateToEachPolicy={navigateToEachPolicy}
            />
          )
        })}
        <div className="empty-space"></div>
      </div>
      <div className="footer">
        <span className="footer-label">
          หากท่านต้องการแก้ไขข้อมูล หรือข้อมูลไม่ถูกต้องกรุณาติดต่อ
        </span>
        <a href="tel:1748" className="call-wrapper flex">
          <Phone className="phone-icon" />
          <span className="text">1748</span>
        </a>
      </div>
    </div>
  )
}
