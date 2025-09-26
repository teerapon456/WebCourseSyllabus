import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Space } from 'antd';
const resourceTypes = [
  { value: "เอกสารประกอบ", label: "เอกสารประกอบ" },
  { value: "ตำราเรียน", label: "ตำราเรียน" },
  { value: "แหล่งอ้างอิง", label: "แหล่งอ้างอิง (เว็บไซต์, ฐานข้อมูล)" },
  { value: "โปรแกรมฝึกทักษะ", label: "โปรแกรมฝึกทักษะ" },
  { value: "สื่ออิเล็กทรอนิกส์", label: "สื่ออิเล็กทรอนิกส์" },
  { value: "Google Classroom", label: "Google Classroom" },
  { value: "หนังสือแนะนำ", label: "หนังสือแนะนำ" },
];

export default function LearningResourcesForm() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      resource_type: "เอกสารประกอบ",
      detail: "เอกสารสรุปบทเรียนรายสัปดาห์",
      url: "",
    },
    {
      key: 2,
      resource_type: "ตำราเรียน",
      detail: "Web Design Principles โดย John Smith",
      url: "",
    },
    {
      key: 3,
      resource_type: "แหล่งอ้างอิง",
      detail: "เว็บไซต์ W3Schools",
      url: "https://www.w3schools.com/",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.resetFields();
    setEditingKey(null);
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setModalVisible(true);
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = async () => {
    const row = await form.validateFields();
    if (editingKey) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...row } : item
        )
      );
    } else {
      setDataSource((prev) => [
        ...prev,
        { ...row, key: prev.length + 1 }
      ]);
    }
    setModalVisible(false);
    setEditingKey(null);
  };

  const columns = [
    {
      title: "ประเภท",
      dataIndex: "resource_type",
      key: "resource_type",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "รายละเอียด",
      dataIndex: "detail",
      key: "detail",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "URL / Link",
      dataIndex: "url",
      key: "url",
      render: (text) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          <span style={{ color: "#bbb" }}>-</span>
        ),
    },
    {
      title: "จัดการ",
      key: "actions",
      align: "center",
      width: 120,
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => handleEdit(record)}>
            แก้ไข
          </Button>{" "}
          <Button size="small" danger onClick={() => handleDelete(record.key)}>
            ลบ
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>ทรัพยากรการเรียน (Learning Resources)</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        + เพิ่มทรัพยากร
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
        bordered
      />
      <Modal
        open={modalVisible}
        title={editingKey ? "แก้ไขทรัพยากร" : "เพิ่มทรัพยากร"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="resource_type"
            label="ประเภท"
            rules={[{ required: true }]}
          >
            <Select options={resourceTypes} />
          </Form.Item>
          <Form.Item
            name="detail"
            label="รายละเอียด"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="url" label="URL / Link">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกข้อมูลทรัพยากรการเรียน
      </Button>
    </div>
  );
}