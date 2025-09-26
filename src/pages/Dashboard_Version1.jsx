import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Space } from 'antd';
const menuItems = [
  { title: "จัดการรายวิชา", link: "/courses", icon: "📚" },
  { title: "จัดการคณะ", link: "/faculties", icon: "🏛️" },
  { title: "จัดการมหาวิทยาลัย", link: "/universities", icon: "🎓" },
  { title: "จัดการอาจารย์", link: "/instructors", icon: "👨‍🏫" },
  { title: "จัดการภาคการศึกษา", link: "/semesters", icon: "🗓️" },
  { title: "อนุมัติ/ตรวจสอบ", link: "/approval", icon: "✅" },
  { title: "รายงาน/สถิติ", link: "/reports", icon: "📈" },
  { title: "ผู้ใช้งานระบบ", link: "/users", icon: "👥" },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="header">
        <img src="/logo.png" alt="University Logo" height={60} />
        <h1>ระบบบริหารจัดการ Course Outline</h1>
        <p>Course Outline Management System</p>
      </header>
      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        {menuItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
            <Link to={item.link}>
              <Card hoverable style={{ textAlign: "center", fontSize: 18 }}>
                <div style={{ fontSize: 32 }}>{item.icon}</div>
                {item.title}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <footer className="footer" style={{ marginTop: 48, textAlign: "center" }}>
        <hr />
        <span>© 2025 มหาวิทยาลัยตัวอย่าง | Example University</span>
      </footer>
    </div>
  );
}