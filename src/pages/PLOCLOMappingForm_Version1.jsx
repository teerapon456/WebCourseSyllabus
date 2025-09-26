import React, { useState } from "react";
import { Table, Button, Modal, Form, Select } from "antd";
import { Space } from 'antd';
const ploOptions = [
  { value: "PLO1", label: "PLO1 - มีความรู้พื้นฐานเกี่ยวกับการออกแบบเว็บไซต์" },
  { value: "PLO2", label: "PLO2 - สามารถพัฒนาระบบเว็บแอปพลิเคชัน" },
  { value: "PLO3", label: "PLO3 - มีทักษะการคิดวิเคราะห์และแก้ปัญหา" },
];
const cloOptions = [
  { value: "CLO1", label: "CLO1 - อธิบายโครงสร้างเว็บไซต์ได้" },
  { value: "CLO2", label: "CLO2 - สร้างเว็บไซต์แบบ Responsive ได้" },
  { value: "CLO3", label: "CLO3 - ใช้เทคโนโลยีใหม่ในการพัฒนาเว็บ" },
];
const assessmentOptions = [
  { value: "สอบกลางภาค", label: "สอบกลางภาค" },
  { value: "สอบปลายภาค", label: "สอบปลายภาค" },
  { value: "งาน/โปรเจค", label: "งาน/โปรเจค" },
];

export default function PLOCLOMappingForm() {
  const [dataSource, setDataSource] = useState([
    { key: 1, plo_code: "PLO1", clo_code: "CLO1", assessment_method: "สอบกลางภาค" },
    { key: 2, plo_code: "PLO2", clo_code: "CLO2", assessment_method: "งาน/โปรเจค" },
    { key: 3, plo_code: "PLO3", clo_code: "CLO3", assessment_method: "สอบปลายภาค" },
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
      title: "Programme Learning Outcome (PLO)",
      dataIndex: "plo_code",
      key: "plo_code",
      render: (text) =>
        ploOptions.find((opt) => opt.value === text)?.label || text,
    },
    {
      title: "Course Learning Outcome (CLO)",
      dataIndex: "clo_code",
      key: "clo_code",
      render: (text) =>
        cloOptions.find((opt) => opt.value === text)?.label || text,
    },
    {
      title: "วิธีการประเมิน",
      dataIndex: "assessment_method",
      key: "assessment_method",
      render: (text) =>
        assessmentOptions.find((opt) => opt.value === text)?.label || text,
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
      <h2>เชื่อมโยงผลลัพธ์หลักสูตรกับผลลัพธ์รายวิชา (PLO-CLO Mapping)</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        + เพิ่มรายการเชื่อมโยง
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
        title={editingKey ? "แก้ไขรายการ" : "เพิ่มรายการเชื่อมโยง"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="plo_code"
            label="Programme Learning Outcome (PLO)"
            rules={[{ required: true }]}
          >
            <Select options={ploOptions} />
          </Form.Item>
          <Form.Item
            name="clo_code"
            label="Course Learning Outcome (CLO)"
            rules={[{ required: true }]}
          >
            <Select options={cloOptions} />
          </Form.Item>
          <Form.Item
            name="assessment_method"
            label="วิธีการประเมิน"
            rules={[{ required: true }]}
          >
            <Select options={assessmentOptions} />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกข้อมูล PLO-CLO Mapping
      </Button>
    </div>
  );
}