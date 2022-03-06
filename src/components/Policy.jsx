import React from "react"
import PolicyMainCard from "./PolicyMainCard"
import PolicySubCard from "./PolicySubCard"
import { useNavigate } from "react-router-dom"

export default function Policy() {
  const navigate = useNavigate()
  const policyDataList = [
    {
      ประเภท: "ประกันรถยนต์",
      ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
      ทะเบียนรถ: "2กข 1234",
      เลขกรมธรรม์: "H04BN002",
      เริ่มต้นวันที่: "31/12/2021",
      สิ้นสุดวันที่: "31/12/2022",
    },
    {
      ประเภท: "ประกันสุขภาพ",
      ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
      ผลิตภัณฑ์: "ประกันมะเร็ง",
      เลขกรมธรรม์: "2022540/4392",
      เริ่มต้นวันที่: "31/12/2021",
      สิ้นสุดวันที่: "31/12/2022",
    },
    {
      ประเภท: "ประกันทรัพย์สิน",
      ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
      ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
      เลขกรมธรรม์: "2022540/4392",
      เริ่มต้นวันที่: "31/12/2021",
      สิ้นสุดวันที่: "31/12/2022",
    },
    {
      ประเภท: "ประกันเดินทาง",
      ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
      ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
      เลขกรมธรรม์: "2022540/4392",
      เริ่มต้นวันที่: "31/12/2021",
      สิ้นสุดวันที่: "31/12/2022",
    },
    {
      ประเภท: "ประกันอุบัติเหตุ",
      ชื่อผู้เอาประกัน: "นายประกัน ชั้นดี",
      ผลิตภัณฑ์: "ประกันที่อยู่อาศัย",
      เลขกรมธรรม์: "2022540/4392",
      เริ่มต้นวันที่: "31/12/2021",
      สิ้นสุดวันที่: "31/12/2022",
    },
  ]

  function navigateToEachPolicy(policyType) {
    navigate(`/policy/${policyType}`)
  }

  return (
    <div className="policy">
      <div className="policy-main-card-container">
        <PolicyMainCard />
      </div>
      <div className="policy-sub-card-container">
        {policyDataList.map((item, index) => {
          return (
            <PolicySubCard
              policyData={item}
              key={index}
              navigateToEachPolicy={navigateToEachPolicy}
            />
          )
        })}
      </div>
    </div>
  )
}
