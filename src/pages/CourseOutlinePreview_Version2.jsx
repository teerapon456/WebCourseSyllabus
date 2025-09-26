import React, { useRef } from "react";
import { Button, Divider } from "antd";
import { useReactToPrint } from "react-to-print";
import { Space } from 'antd';
// สามารถเปลี่ยนเป็นโลโก้ของมหาวิทยาลัย/คณะตรงนี้
const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png";

// Mock Data
const mockData = {
  course: { code: "WEB101", name_th: "การออกแบบเว็บไซต์", name_en: "Web Design", faculty: "วิทยาการคอมพิวเตอร์", coordinator: "อ. สมชาย ใจดี", credits: "3(2-2-5)", semester: "1/2568", format: "Hybrid", description_th: "ศึกษาหลักการออกแบบเว็บไซต์...", description_en: "Study the principles of web design..." },
  weekly: [ { week: 1, topic: "แนะนำรายวิชา", hours: "3", activities: "Lecture", instructor: "อ. สมชาย" }, { week: 2, topic: "พื้นฐาน HTML", hours: "3", activities: "Lab", instructor: "อ. สมชาย" } ],
  assessment: [ { method: "สอบกลางภาค", percent: 30 }, { method: "สอบปลายภาค", percent: 40 }, { method: "งาน/โปรเจค", percent: 30 } ],
  resources: [ { type: "ตำราเรียน", detail: "Web Design Principles", url: "" }, { type: "เว็บไซต์", detail: "W3Schools", url: "https://w3schools.com" } ],
  improvements: [ { suggestion: "ปรับปรุงเนื้อหาให้ทันสมัย", action: "เพิ่มหัวข้อ PWA" } ],
  mapping: [ { plo: "PLO1", clo: "CLO1", assessment: "สอบกลางภาค" }, { plo: "PLO2", clo: "CLO2", assessment: "งาน/โปรเจค" } ],
  appeal: [ { type: "Facebook", detail: "facebook.com/examplecourse" }, { type: "อีเมล", detail: "course-support@exampleuniversity.ac.th" } ],
  signatures: { coordinator: "อ. สมชาย ใจดี", head: "รศ. ดร. สายใจ สาขา", dean: "ศ. ดร. กิตติ คณะ", date: "2025-09-23" }
};

// Footer สำหรับ PDF/Print
function PrintFooter() {
  return (
    <div
      style={{
        borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: 12,
        marginTop: 32,
        paddingTop: 8,
        color: "#888"
      }}
    >
      Course Outline - {mockData.course.code} | {mockData.course.name_en} | Page <span className="pageNumber"></span>
    </div>
  );
}

// Header สำหรับ PDF/Print
function PrintHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      <img src={logoUrl} alt="Logo" style={{ width: 64, marginRight: 18 }} />
      <div>
        <h2 style={{ margin: 0, color: "#1454A3", letterSpacing: "1px" }}>มหาวิทยาลัยตัวอย่าง</h2>
        <div style={{ fontSize: 16, color: "#333" }}>คณะ{mockData.course.faculty}</div>
        <div style={{ fontSize: 18, color: "#222", fontWeight: "bold" }}>Course Outline</div>
      </div>
    </div>
  );
}

function CourseOutlineContent({ data }) {
  return (
    <div style={{ background: "#fff", padding: 32, borderRadius: 10 }}>
      <PrintHeader />
      <Divider />
      <h2 style={{ color: "#1454A3" }}>ข้อมูลรายวิชา</h2>
      <p><b>รหัสวิชา:</b> {data.course.code}</p>
      <p><b>ชื่อวิชา (TH):</b> {data.course.name_th}</p>
      <p><b>ชื่อวิชา (EN):</b> {data.course.name_en}</p>
      <p><b>คณะ:</b> {data.course.faculty}</p>
      <p><b>ผู้ประสานงาน:</b> {data.course.coordinator}</p>
      <p><b>หน่วยกิต:</b> {data.course.credits}</p>
      <p><b>ภาค/ปี:</b> {data.course.semester}</p>
      <p><b>รูปแบบ:</b> {data.course.format}</p>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>คำอธิบายรายวิชา</h2>
      <p><b>TH:</b> {data.course.description_th}</p>
      <p><b>EN:</b> {data.course.description_en}</p>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>แผนการสอนรายสัปดาห์</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }} border={1}>
        <thead style={{ background: "#F0F6FF" }}>
          <tr>
            <th>สัปดาห์</th><th>หัวข้อ</th><th>ชั่วโมง</th><th>กิจกรรม</th><th>ผู้สอน</th>
          </tr>
        </thead>
        <tbody>
          {data.weekly.map((w) => (
            <tr key={w.week}>
              <td>{w.week}</td>
              <td>{w.topic}</td>
              <td>{w.hours}</td>
              <td>{w.activities}</td>
              <td>{w.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>การวัดและประเมินผล</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }} border={1}>
        <thead style={{ background: "#F0F6FF" }}>
          <tr>
            <th>วิธีการ</th><th>เปอร์เซ็นต์ (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.assessment.map((a, idx) => (
            <tr key={idx}>
              <td>{a.method}</td>
              <td>{a.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>ทรัพยากรการเรียน</h2>
      <ul>
        {data.resources.map((r, idx) => (
          <li key={idx}>
            <b>{r.type}:</b> {r.detail}
            {r.url && (
              <> (<a href={r.url} target="_blank" rel="noopener noreferrer">{r.url}</a>)</>
            )}
          </li>
        ))}
      </ul>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>ข้อเสนอแนะและการปรับปรุง</h2>
      <ul>
        {data.improvements.map((i, idx) => (
          <li key={idx}>
            <b>ข้อเสนอแนะ:</b> {i.suggestion} <br />
            <b>การปรับปรุง:</b> {i.action}
          </li>
        ))}
      </ul>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>PLO-CLO Mapping</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }} border={1}>
        <thead style={{ background: "#F0F6FF" }}>
          <tr>
            <th>PLO</th><th>CLO</th><th>วิธีการประเมิน</th>
          </tr>
        </thead>
        <tbody>
          {data.mapping.map((m, idx) => (
            <tr key={idx}>
              <td>{m.plo}</td>
              <td>{m.clo}</td>
              <td>{m.assessment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>ช่องทางอุทธรณ์</h2>
      <ul>
        {data.appeal.map((a, idx) => (
          <li key={idx}>
            <b>{a.type}:</b> {a.detail}
          </li>
        ))}
      </ul>
      <Divider />
      <h2 style={{ color: "#1454A3" }}>ลายเซ็นและอนุมัติ</h2>
      <p><b>ผู้รับผิดชอบรายวิชา:</b> {data.signatures.coordinator}</p>
      <p><b>ประธานสาขา:</b> {data.signatures.head}</p>
      <p><b>คณบดี:</b> {data.signatures.dean}</p>
      <p><b>วันที่อนุมัติ:</b> {data.signatures.date}</p>
      <PrintFooter />
    </div>
  );
}

export default function CourseOutlinePreview() {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: "CourseOutline",
    pageStyle: `
      @media print {
        body {
          font-family: 'TH Sarabun New', 'Tahoma', 'Arial', sans-serif;
          background: #fff !important;
        }
        h1, h2, h3 {
          color: #1454A3 !important;
        }
        table {
          font-size: 13px;
          border: 1px solid #aaa;
        }
        th, td {
          padding: 4px 8px;
          border: 1px solid #bbb;
        }
        .pageNumber:after {
          content: counter(page);
        }
        @page {
          margin: 24mm 16mm 24mm 16mm;
        }
      }
    `,
  });

  return (
    <div style={{ background: "#F0F6FF", minHeight: "100vh", padding: 24 }}>
      <Button type="primary" onClick={handlePrint} style={{ float: "right", marginBottom: 24 }}>
        Export PDF
      </Button>
      <div ref={contentRef}>
        <CourseOutlineContent data={mockData} />
      </div>
    </div>
  );
}