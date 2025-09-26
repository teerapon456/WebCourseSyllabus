import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, isEditing, Space } from "antd";
// Mock instructor data
const instructors = [
  { value: "สมชาย ใจดี", label: "อ. สมชาย ใจดี" },
  { value: "ศิริพร สดใส", label: "อ. ศิริพร สดใส" },
];

// Default schedule template for 16 weeks
const defaultWeeks = Array.from({ length: 16 }).map((_, i) => ({
  key: i + 1,
  week_no: i + 1,
  topic: "",
  hours: "",
  activities: "",
  instructor: "",
}));

export default function WeeklyScheduleForm() {
  const [dataSource, setDataSource] = useState(defaultWeeks);
  const [editingKey, setEditingKey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
    setModalVisible(true);
  };

  const save = async () => {
    const row = await form.validateFields();
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === editingKey ? { ...item, ...row } : item
      )
    );
    setEditingKey(null);
    setModalVisible(false);
  };

  const columns = [
    {
      title: "สัปดาห์",
      dataIndex: "week_no",
      key: "week_no",
      width: 80,
      align: "center",
    },
    {
      title: "หัวข้อ",
      dataIndex: "topic",
      key: "topic",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "จำนวนชั่วโมง",
      dataIndex: "hours",
      key: "hours",
      width: 120,
      align: "center",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "กิจกรรมการเรียน",
      dataIndex: "activities",
      key: "activities",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "ผู้สอน",
      dataIndex: "instructor",
      key: "instructor",
      render: (text) => text || <span style={{ color: "#bbb" }}>-</span>,
    },
    {
      title: "แก้ไข",
      key: "edit",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Button size="small" onClick={() => edit(record)}>
          แก้ไข
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>แผนการสอนรายสัปดาห์ (Weekly Schedule)</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="small"
        pagination={false}
        rowKey="key"
        bordered
        style={{ marginBottom: 24 }}
      />
      <Modal
        open={modalVisible}
        title={`แก้ไขสัปดาห์ที่ ${editingKey}`}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            ยกเลิก
          </Button>,
          <Button key="save" type="primary" onClick={save}>
            บันทึก
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="topic" label="หัวข้อ">
            <Input />
          </Form.Item>
          <Form.Item name="hours" label="จำนวนชั่วโมง">
            <Input />
          </Form.Item>
          <Form.Item name="activities" label="กิจกรรมการเรียน">
            <Input />
          </Form.Item>
          <Form.Item name="instructor" label="ผู้สอน">
            <Select options={instructors} />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกแผนการสอน
      </Button>
    </div>
  );
}