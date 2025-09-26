import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Space } from 'antd';
const channelTypes = [
  { value: "Facebook", label: "Facebook" },
  { value: "เว็บไซต์", label: "เว็บไซต์" },
  { value: "อีเมล", label: "อีเมล" },
  { value: "โทรศัพท์", label: "โทรศัพท์" },
];

export default function StudentAppealChannelsForm() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      channel_type: "Facebook",
      detail: "facebook.com/examplecourse",
    },
    {
      key: 2,
      channel_type: "เว็บไซต์",
      detail: "https://course.exampleuniversity.ac.th",
    },
    {
      key: 3,
      channel_type: "อีเมล",
      detail: "course-support@exampleuniversity.ac.th",
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
      title: "ประเภทช่องทาง",
      dataIndex: "channel_type",
      key: "channel_type",
      render: (text) =>
        channelTypes.find((opt) => opt.value === text)?.label || text,
    },
    {
      title: "รายละเอียดช่องทาง",
      dataIndex: "detail",
      key: "detail",
      render: (text) =>
        text.startsWith("http") ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : text,
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
      <h2>ช่องทางอุทธรณ์ (Student Appeal Channels)</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        + เพิ่มช่องทางอุทธรณ์
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
        title={editingKey ? "แก้ไขช่องทางอุทธรณ์" : "เพิ่มช่องทางอุทธรณ์"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="channel_type"
            label="ประเภทช่องทาง"
            rules={[{ required: true }]}
          >
            <Select options={channelTypes} />
          </Form.Item>
          <Form.Item
            name="detail"
            label="รายละเอียดช่องทาง"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกข้อมูลช่องทางอุทธรณ์
      </Button>
    </div>
  );
}