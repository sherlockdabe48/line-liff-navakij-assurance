import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsAndCondition() {
  const navigate = useNavigate();

  const [isConsent, setIsConsent] = useState(false);

  const getIsConsent = () => {
    return true;
  };

  useEffect(() => {
    const checkIsConsent = () => {
      console.log(isConsent);
      if (isConsent) navigate("/verify-identity");
    };
    setIsConsent(getIsConsent());
    checkIsConsent();
  }, [isConsent, navigate]);

  return (
    <div className="terms-conditions">
      <div className="terms-conditions-container">
        ข้อกําหนดและเงื่อนไขการใช้บริการ (Terms and Conditions) บริษัท
        นวกิจประกันภัย จำกัด (มหาชน) เป็นเจ้าของและบริหารการใช้งาน
        นวกิจประกันภัย เพื่อเป็นช่องทางในการให้บริการข้อมูล เสนอขายผลิตภัณฑ์
        ประชาสัมพันธ์ข่าวสาร สอบถาม รายละเอียดสินค้าและบริการ
        รวมถึงบริการต่างๆเกี่ยวกับกรมธรรม์ประกันภัย
        และบริการอื่นใดตามที่บริษัทกำหนดและจะเปิดให้บริการต่อไป โดยการเข้าใช้
        นวกิจประกันภัยถือว่าผู้ใช้งานได้ตกลงผูกพัน และปฏิบัติตามข้อ
        กําหนดและเงื่อนไข ดังต่อไปนี้ 1. คํานิยาม 1.1 “ข้อมูลส่วนบุคคล” หมายถึง
        ข้อมูลต่าง ๆ ของผู้ขอใช้บริการที่ได้ให้ไว้ผ่านทางเว็บไซต์ หรือ
        นวกิจประกันภัย ของบริษัท เช่น ชื่อ นามสกุล วันเดือนปีเกิด ที่อยู่
        และชื่อของบุคคลที่เกี่ยวข้องกับผู้ขอใช้บริการ 1.2
        “เครื่องมือเพื่อการทํารายการ” หมายถึง โทรศัพท์มือถือ และ/หรือ
        อุปกรณ์อิเล็กทรอนิกส์ใดๆ ของผู้ขอใช้บริการ
        ที่มีการดาวน์โหลดและติดตั้งโปรแกรม LINE Application สําหรับใช้บัญชี LINE
        ที่ผู้ใช้บริการขอใช้บริการ นวกิจประกันภัย 1.3
        “โทรศัพท์สําหรับเข้าใช้บริการ” หมายถึง
        หมายเลขโทรศัพท์มือถือที่ผู้ขอใช้บริการแจ้งไว้กับ นวกิจประกันภัย
        ในการใช้บริการที่เกี่ยวกับบัญชีขอใช้บริการ ตามข้อกําหนดของ
        นวกิจประกันภัย 1.4 “บริษัท” หมายถึง บริษัท นวกิจประกันภัย จำกัด (มหาชน)
        เป็น เจ้าของและบริหารงาน (ชื่อเรียกระบบ เช่น Navakij Line Official
        Account) และให้หมายความรวมถึงบุคคลที่บริษัทมอบหมายด้วย Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Officia sunt dolorem unde quam
        voluptatibus commodi consequuntur hic est! Animi perspiciatis ea aliquam
        magnam quia, obcaecati explicabo autem illum pariatur nam. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Rem, sapiente provident.
        Dolore quisquam quidem ipsam. Iste sint debitis blanditiis facere. Eum
        possimus, ab atque quisquam quasi ut laboriosam magni illo. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Officia sunt dolorem unde
        quam voluptatibus commodi consequuntur hic est! Animi perspiciatis ea
        aliquam magnam quia, obcaecati explicabo autem illum pariatur nam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Rem, sapiente
        provident. Dolore quisquam quidem ipsam. Iste sint debitis blanditiis
        facere. Eum possimus, ab atque quisquam quasi ut laboriosam magni illo.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia sunt
        dolorem unde quam voluptatibus commodi consequuntur hic est! Animi
        perspiciatis ea aliquam magnam quia, obcaecati explicabo autem illum
        pariatur nam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Rem, sapiente provident. Dolore quisquam quidem ipsam. Iste sint debitis
        blanditiis facere. Eum possimus, ab atque quisquam quasi ut laboriosam
        magni illo. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Officia sunt dolorem unde quam voluptatibus commodi consequuntur hic
        est! Animi perspiciatis ea aliquam magnam quia, obcaecati explicabo
        autem illum pariatur nam. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Rem, sapiente provident. Dolore quisquam quidem ipsam.
        Iste sint debitis blanditiis facere. Eum possimus, ab atque quisquam
        quasi ut laboriosam magni illo.
      </div>
      <div className="input-button-wrapper">
        <label className="input-wrapper">
          <input type="checkbox" name="accept-terms-conditions" />
          <span className="checkmark"></span>
          <span className="input-label">
            ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการให้บริการนี้
            กรณีไม่ยอมรับจะไม่สามารถเข้าตรวจสอบข้อมูลได้
          </span>
        </label>
        <div className="button-wrapper flex">
          <button
            onClick={() => navigate("/verify-identity")}
            className="btn btn-primary"
          >
            ยอมรับ
          </button>
          <button className="btn">ไม่ยอมรับ</button>
        </div>
      </div>
    </div>
  );
}
