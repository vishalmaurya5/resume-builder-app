import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import ProtectedRoute from './components/ProtectedRoute';
import Templates from './pages/Templates';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
      </Route>
      <Route path='view/:resumeId' element={<Preview />} />
      <Route path='login' element={<Login />} />
      <Route path='templates' element={<Templates />} />
    </Routes>
  )
}

export default App
