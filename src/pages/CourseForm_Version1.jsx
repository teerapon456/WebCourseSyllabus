import React, { useState } from "react";
import { Form, Button, Input, Select, Divider, Tabs, Row, Col, Space, Popconfirm, Modal, Table } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
// Mock data
const faculties = [
  { value: "cs", label: "วิทยาการคอมพิวเตอร์" },
  { value: "ba", label: "บริหารธุรกิจ" },
];
const learningFormats = [
  { value: "Onsite", label: "Onsite" },
  { value: "Online", label: "Online" },
  { value: "Hybrid", label: "Hybrid" },
];
const semesters = [
  { value: "1/2568", label: "1/2568" },
  { value: "2/2568", label: "2/2568" },
];

export default function CourseForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  // Mock initial data for edit
  const initialValues = id
    ? {
      course_code: "WEB101",
      name_th: "การออกแบบเว็บไซต์",
      name_en: "Web Design",
      faculty: "cs",
      coordinator: "อ. สมชาย ใจดี",
      credits: "3(2-2-5)",
      semester: "1/2568",
      learning_format: "Hybrid",
      description_th: "ศึกษาหลักการออกแบบเว็บไซต์...",
      description_en: "Study the principles of web design...",
    }
    : {};

  // Handle submit
  const onFinish = (values) => {
    // TODO: API call to save
    window.alert("บันทึกข้อมูลรายวิชาเรียบร้อยแล้ว!");
    navigate("/courses");
  };

  return (
    <div>
      <h2>{id ? "แก้ไข" : "เพิ่ม"}รายละเอียดรายวิชา</h2>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="course_code"
              label="รหัสวิชา (Course Code)"
              rules={[{ required: true }]}
            >
              <Input placeholder="เช่น WEB101" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="semester"
              label="ภาค/ปีการศึกษา"
              rules={[{ required: true }]}
            >
              <Select options={semesters} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name_th"
              label="ชื่อวิชา (ภาษาไทย)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name_en"
              label="ชื่อวิชา (ภาษาอังกฤษ)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="faculty"
              label="คณะ"
              rules={[{ required: true }]}
            >
              <Select options={faculties} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="coordinator"
              label="ผู้ประสานงาน (Coordinator)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="credits"
              label="จำนวนหน่วยกิต (Credit Format)"
              rules={[{ required: true }]}
            >
              <Input placeholder="เช่น 3(2-2-5)" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="learning_format"
              label="รูปแบบการเรียน"
              rules={[{ required: true }]}
            >
              <Select options={learningFormats} />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={[
            {
              key: "1",
              label: "คำอธิบายรายวิชา (TH)",
              children: (
                <Form.Item name="description_th" rules={[{ required: true }]}>
                  <Input.TextArea rows={4} placeholder="คำอธิบายรายวิชา (ภาษาไทย)" />
                </Form.Item>
              ),
            },
            {
              key: "2",
              label: "Course Description (EN)",
              children: (
                <Form.Item name="description_en" rules={[{ required: true }]}>
                  <Input.TextArea rows={4} placeholder="Course Description (English)" />
                </Form.Item>
              ),
            },
          ]}
        />
        <Divider />
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
            <Button onClick={() => navigate("/courses")}>ยกเลิก</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}