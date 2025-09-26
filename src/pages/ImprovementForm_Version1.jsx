import React, { useState } from "react";
import { Form, Input, Button, List, Modal } from "antd";
import { Space } from 'antd';
export default function ImprovementForm() {
  const [form] = Form.useForm();
  const [improvements, setImprovements] = useState([
    {
      key: 1,
      suggestion: "ปรับปรุงเนื้อหาให้อัพเดทกับเทคโนโลยีใหม่ในปี 2568",
      action: "เพิ่มหัวข้อเกี่ยวกับ Progressive Web App",
    },
    {
      key: 2,
      suggestion: "แก้ไขกิจกรรมปฏิบัติการในสัปดาห์ที่ 8",
      action: "ปรับเปลี่ยนเป็น Workshop ร่วมกับอาจารย์รับเชิญ",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleDelete = (key) => {
    setImprovements((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    if (values.key) {
      setImprovements((prev) =>
        prev.map((item) =>
          item.key === values.key ? { ...item, ...values } : item
        )
      );
    } else {
      setImprovements((prev) => [
        ...prev,
        { ...values, key: prev.length + 1 },
      ]);
    }
    setModalVisible(false);
  };

  return (
    <div>
      <h2>ข้อเสนอแนะและการปรับปรุง (Improvement)</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        + เพิ่มข้อเสนอแนะ/การปรับปรุง
      </Button>
      <List
        bordered
        dataSource={improvements}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button size="small" onClick={() => handleEdit(item)}>
                แก้ไข
              </Button>,
              <Button size="small" danger onClick={() => handleDelete(item.key)}>
                ลบ
              </Button>,
            ]}
          >
            <div>
              <strong>ข้อเสนอแนะ:</strong> {item.suggestion}
              <br />
              <strong>การปรับปรุง:</strong> {item.action}
            </div>
          </List.Item>
        )}
        style={{ marginBottom: 24 }}
      />
      <Modal
        open={modalVisible}
        title="เพิ่ม/แก้ไขข้อเสนอแนะและการปรับปรุง"
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="key" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="suggestion"
            label="ข้อเสนอแนะจากภาคการศึกษาที่ผ่านมา"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="ข้อเสนอแนะ" />
          </Form.Item>
          <Form.Item
            name="action"
            label="การปรับปรุง/แก้ไข"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="รายละเอียดการปรับปรุง" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" style={{ marginTop: 16 }}>
        บันทึกข้อมูลการปรับปรุง
      </Button>
    </div>
  );
}