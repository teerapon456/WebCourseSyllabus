import React from 'react';
import { Layout, Menu, Typography, Space } from 'antd';
import { BookOutlined, DashboardOutlined, FileTextOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// import pages
import Dashboard from './pages/Dashboard_Version1.jsx';
import Courses from './pages/Courses_Version1.jsx';
import AssessmentForm from './pages/AssessmentForm_Version1.jsx';
import CourseForm from './pages/CourseForm_Version1.jsx';
import CourseOutlinePreview1 from './pages/CourseOutlinePreview_Version1.jsx';
import CourseOutlinePreview2 from './pages/CourseOutlinePreview_Version2.jsx';
import ImprovementForm from './pages/ImprovementForm_Version1.jsx';
import LearningResourcesForm from './pages/LearningResourcesForm_Version1.jsx';
import PLOCLOMappingForm from './pages/PLOCLOMappingForm_Version1.jsx';
import SignaturesApprovalForm from './pages/SignaturesApprovalForm_Version1.jsx';
import StudentAppealChannelsForm from './pages/StudentAppealChannelsForm_Version1.jsx';
import WeeklyScheduleForm from './pages/WeeklyScheduleForm_Version1.jsx';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Menu mode="horizontal" defaultSelectedKeys={['dashboard']} style={{ fontSize: 18 }}>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="courses" icon={<BookOutlined />}>
              <Link to="/courses">Courses</Link>
            </Menu.Item>
            <Menu.SubMenu key="forms" icon={<FileTextOutlined />} title="Forms">
              <Menu.Item key="assessment">
                <Link to="/assessment">Assessment Form</Link>
              </Menu.Item>
              <Menu.Item key="courseform">
                <Link to="/courseform">Course Form</Link>
              </Menu.Item>
              <Menu.Item key="outline1">
                <Link to="/outline1">Course Outline Preview 1</Link>
              </Menu.Item>
              <Menu.Item key="outline2">
                <Link to="/outline2">Course Outline Preview 2</Link>
              </Menu.Item>
              <Menu.Item key="improvement">
                <Link to="/improvement">Improvement Form</Link>
              </Menu.Item>
              <Menu.Item key="resources">
                <Link to="/resources">Learning Resources Form</Link>
              </Menu.Item>
              <Menu.Item key="ploclo">
                <Link to="/ploclo">PLO-CLO Mapping Form</Link>
              </Menu.Item>
              <Menu.Item key="signatures">
                <Link to="/signatures">Signatures Approval Form</Link>
              </Menu.Item>
              <Menu.Item key="appeal">
                <Link to="/appeal">Student Appeal Channels Form</Link>
              </Menu.Item>
              <Menu.Item key="weekly">
                <Link to="/weekly">Weekly Schedule Form</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessment" element={<AssessmentForm />} />
              <Route path="/courseform" element={<CourseForm />} />
              <Route path="/outline1" element={<CourseOutlinePreview1 />} />
              <Route path="/outline2" element={<CourseOutlinePreview2 />} />
              <Route path="/improvement" element={<ImprovementForm />} />
              <Route path="/resources" element={<LearningResourcesForm />} />
              <Route path="/ploclo" element={<PLOCLOMappingForm />} />
              <Route path="/signatures" element={<SignaturesApprovalForm />} />
              <Route path="/appeal" element={<StudentAppealChannelsForm />} />
              <Route path="/weekly" element={<WeeklyScheduleForm />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} Web Course Syllabus
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;