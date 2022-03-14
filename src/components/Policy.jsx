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
}) {
  // STATES
  const [policyDataList, setPolicyDataList] = useState([])
  const userName = `${userInfo.firstName} ${userInfo.lastName}`

  // HOOKS
  const navigate = useNavigate()

  useEffect(async () => {
    await getPolicyData()
    appendData({
      userInfo: {
        ...userInfo,
        firstName: policyDataList[0]?.cust_first_name,
        lastName: policyDataList[0]?.cust_last_name,
        id: policyDataList[0]?.cust_nat_id,
        birthDate: birthDateStore,
      },
    })
    console.log(userInfo)
  }, [userInfo.firstName, userInfo.lastName, userInfo.id, userInfo.birthDate])

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
    }
  }
  // const policyDataList = [
  //   {
  //     ประเภท: "ประกันรถยนต์",
  //     ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
  //     ทะเบียนรถ: "2กข 1234",
  //     เลขกรมธรรม์: "H04BN002",
  //     เริ่มต้นวันที่: "31/12/2021",
  //     สิ้นสุดวันที่: "31/12/2022",
  //   },
  //   {
  //     ประเภท: "ประกันสุขภาพ",
  //     ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
  //     ผลิตภัณฑ์: "ประกันมะเร็ง",
  //     เลขกรมธรรม์: "2022540/4392",
  //     เริ่มต้นวันที่: "31/12/2021",
  //     สิ้นสุดวันที่: "31/12/2022",
  //   },
  //   {
  //     ประเภท: "ประกันทรัพย์สิน",
  //     ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
  //     ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
  //     เลขกรมธรรม์: "2022540/4392",
  //     เริ่มต้นวันที่: "31/12/2021",
  //     สิ้นสุดวันที่: "31/12/2022",
  //   },
  //   {
  //     ประเภท: "ประกันเดินทาง",
  //     ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
  //     ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
  //     เลขกรมธรรม์: "2022540/4392",
  //     เริ่มต้นวันที่: "31/12/2021",
  //     สิ้นสุดวันที่: "31/12/2022",
  //   },
  //   {
  //     ประเภท: "ประกันอุบัติเหตุ",
  //     ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
  //     ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
  //     เลขกรมธรรม์: "2022540/4392",
  //     เริ่มต้นวันที่: "31/12/2021",
  //     สิ้นสุดวันที่: "31/12/2022",
  //   },
  // ]

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
