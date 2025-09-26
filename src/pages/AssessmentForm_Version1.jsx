import React, { useState } from "react";
import { Form, Button, Table, Modal, Input, Select, InputNumber, Space } from 'antd';
const gradeOptions = [
  { value: "A", label: "A" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "C+", label: "C+" },
  { value: "C", label: "C" },
  { value: "D+", label: "D+" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
];

export default function AssessmentForm() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      method: "สอบกลางภาค",
      percentage: 30,
      grade_criteria: "A, B+, B, C+, C, D+, D, E",
    },
    {
      key: 2,
      method: "สอบปลายภาค",
      percentage: 40,
      grade_criteria: "A, B+, B, C+, C, D+, D, E",
    },
    {
      key: 3,
      method: "งาน/โปรเจค",
      percentage: 30,
      grade_criteria: "A, B+, B, C+, C, D+, D, E",
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
      title: "วิธีการประเมิน",
      dataIndex: "method",
      key: "method",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "สัดส่วนคะแนน (%)",
      dataIndex: "percentage",
      key: "percentage",
      align: "center",
      width: 120,
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "เกณฑ์การตัดเกรด",
      dataIndex: "grade_criteria",
      key: "grade_criteria",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
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
          </Button>{' '}
          <Button size="small" danger onClick={() => handleDelete(record.key)}>
            ลบ
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>การวัดและประเมินผล (Assessment)</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        + เพิ่มวิธีการประเมิน
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
        title={editingKey ? "แก้ไขวิธีการประเมิน" : "เพิ่มวิธีการประเมิน"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="method"
            label="วิธีการประเมิน"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="percentage"
            label="สัดส่วนคะแนน (%)"
            rules={[{ required: true, type: "number", min: 0, max: 100 }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="grade_criteria"
            label="เกณฑ์การตัดเกรด"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              options={gradeOptions}
              placeholder="เลือกเกรดที่ใช้"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกข้อมูลการวัดและประเมินผล
      </Button>
    </div>
  );
}