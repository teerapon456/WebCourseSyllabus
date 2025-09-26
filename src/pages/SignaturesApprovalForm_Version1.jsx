import React, { useState } from "react";
import { Form, Input, Button, Upload, DatePicker, Row, Col, Divider, message } from "antd";
import { Space } from 'antd';
export default function SignaturesApprovalForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock initial values
  const initialValues = {
    coordinator: "อ. สมชาย ใจดี",
    head: "รศ. ดร. สายใจ สาขา",
    dean: "ศ. ดร. กิตติ คณะ",
    date: null,
    coordinator_sign: null,
    head_sign: null,
    dean_sign: null,
  };

  // Upload file mock
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 500);
  };

  const onFinish = (values) => {
    setLoading(true);
    // TODO: Save to backend
    setTimeout(() => {
      setLoading(false);
      message.success("บันทึกข้อมูลลายเซ็นและการอนุมัติเรียบร้อยแล้ว!");
    }, 1000);
  };

  return (
    <div>
      <h2>ลายเซ็นและอนุมัติ (Signatures & Approval)</h2>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        style={{ maxWidth: 700, margin: "0 auto" }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="coordinator"
              label="ผู้รับผิดชอบรายวิชา"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="coordinator_sign"
              label="อัพโหลดลายเซ็น"
              valuePropName="fileList"
              getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
              extra="ไฟล์ลายเซ็น (รูปภาพหรือ PDF)"
              rules={[{ required: true }]}
            >
              <Upload
                customRequest={dummyRequest}
                accept=".png,.jpg,.jpeg,.pdf"
                maxCount={1}
                listType="picture"
              >
                <Button>อัพโหลดลายเซ็น</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="head"
              label="ประธานสาขา"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="head_sign"
              label="อัพโหลดลายเซ็น"
              valuePropName="fileList"
              getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
              extra="ไฟล์ลายเซ็น (รูปภาพหรือ PDF)"
              rules={[{ required: true }]}
            >
              <Upload
                customRequest={dummyRequest}
                accept=".png,.jpg,.jpeg,.pdf"
                maxCount={1}
                listType="picture"
              >
                <Button>อัพโหลดลายเซ็น</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="dean"
              label="คณบดี"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dean_sign"
              label="อัพโหลดลายเซ็น"
              valuePropName="fileList"
              getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
              extra="ไฟล์ลายเซ็น (รูปภาพหรือ PDF)"
              rules={[{ required: true }]}
            >
              <Upload
                customRequest={dummyRequest}
                accept=".png,.jpg,.jpeg,.pdf"
                maxCount={1}
                listType="picture"
              >
                <Button>อัพโหลดลายเซ็น</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Form.Item
          name="date"
          label="วันที่อนุมัติ"
          rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            บันทึกข้อมูลลายเซ็นและอนุมัติ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}