import React from 'react';
import AssessmentForm from './pages/AssessmentForm_Version1.jsx';
import CourseForm_Version from './pages/CourseForm_Version1.jsx';
// import อื่น ๆ ตามไฟล์ที่มี
import { Form, Button, Space } from 'antd';

function App() {
  return (
    <div>
      <AssessmentForm />
      {/* เพิ่ม component อื่น ๆ ตามต้องการ */}
      <CourseForm_Version />
      {/* เพิ่ม component อื่น ๆ ตามต้องการ */}
    </div>
  );
}

export default App;