import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Divider, Tabs, Row, Col, Space, Popconfirm, Modal, Table } from 'antd';
import { Link, useNavigate } from "react-router-dom";

const mockCourses = [
  {
    key: 1,
    course_code: "WEB101",
    name_th: "การออกแบบเว็บไซต์",
    name_en: "Web Design",
    faculty: "วิทยาการคอมพิวเตอร์",
    coordinator: "อ. สมชาย ใจดี",
    credits: "3(2-2-5)",
    semester: "1/2568",
    status: "รออนุมัติ",
  },
  {
    key: 2,
    course_code: "WEB102",
    name_th: "การพัฒนาเว็บแอปพลิเคชัน",
    name_en: "Web Application Development",
    faculty: "วิทยาการคอมพิวเตอร์",
    coordinator: "อ. ศิริพร สดใส",
    credits: "3(2-2-5)",
    semester: "1/2568",
    status: "อนุมัติแล้ว",
  },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with API call
    setCourses(mockCourses);
  }, []);

  const columns = [
    { title: "รหัสวิชา", dataIndex: "course_code", key: "course_code" },
    { title: "ชื่อวิชา (TH)", dataIndex: "name_th", key: "name_th" },
    { title: "ชื่อวิชา (EN)", dataIndex: "name_en", key: "name_en" },
    { title: "คณะ", dataIndex: "faculty", key: "faculty" },
    { title: "ผู้ประสานงาน", dataIndex: "coordinator", key: "coordinator" },
    { title: "หน่วยกิต", dataIndex: "credits", key: "credits" },
    { title: "ภาค/ปี", dataIndex: "semester", key: "semester" },
    { title: "สถานะ", dataIndex: "status", key: "status" },
    {
      title: "จัดการ",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => navigate(`/courses/${record.key}`)}>
            ดูรายละเอียด
          </Button>
          <Button size="small" onClick={() => navigate(`/courses/edit/${record.key}`)}>
            แก้ไข
          </Button>
          <Popconfirm
            title="ต้องการลบรายวิชานี้ใช่หรือไม่?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button size="small" danger>
              ลบ
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    Modal.success({ title: "ลบข้อมูลแล้ว" });
    setCourses((prev) => prev.filter((c) => c.key !== id));
  };

  return (
    <div>
      <h2>รายการรายวิชา</h2>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => navigate("/courses/create")}>
        + เพิ่มรายวิชาใหม่
      </Button>
      <Table columns={columns} dataSource={courses} pagination={{ pageSize: 8 }} />
    </div>
  );
}