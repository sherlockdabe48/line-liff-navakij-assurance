import React, { useEffect, useState } from "react"
import PolicyMainCard from "./PolicyMainCard"
import PolicySubCard from "./PolicySubCard"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Policy({
  userInfo,
  birthDateStore,
  appendData,
  policyTypeCodeToName,
  policyDataListStore,
}) {
  // STATES
  const [policyDataList, setPolicyDataList] = useState([])
  const userName = `${userInfo.firstName} ${userInfo.lastName}`

  // HOOKS
  const navigate = useNavigate()

  useEffect(async () => {
    await getPolicyData()
    if (policyDataList[0]?.cust_first_name) {
      appendData({
        userInfo: {
          ...userInfo,
          firstName: policyDataList[0]?.cust_first_name,
          lastName: policyDataList[0]?.cust_last_name,
          id: policyDataList[0]?.cust_nat_id,
          birthDate: birthDateStore,
        },
      })
    } else {
      console.log(policyDataList[0]?.cust_first_name)
    }

    console.log(userInfo)
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
    const { data } = await axios.post("/api/mypolicy/list", {
      system: "LINEOA",
      project: "LINEOA",
      channel: "LINE",
      identityKey: "ID-001",
    })
    if (data.msgCode === "SUCCESS") {
      setPolicyDataList(data.data)
      appendData({ policyDataListStore: [...data.data] })
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
      </div>
    </div>
  )
}
