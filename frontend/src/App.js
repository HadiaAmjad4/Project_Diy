// src/App.js


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import UserProfile from './pages/UserProfile';
import CreateProject from './pages/CreateProject';
import ExploreProjects from './pages/ExploreProjects';
import Dashboard from './pages/Dashboard';
import ViewAll from './pages/ViewAll';
import Discussion from './pages/Discussion';
import AppLayout from './pages/AppLayout'; // ← new layout

function App() {
  return (
    <Router>
      <Routes>

        {/* No layout pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout-wrapped pages */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/explore" element={<ExploreProjects />} />
          <Route path="/view-all/:id" element={<ViewAll />} />
          <Route path="/projects/:id/discussion" element={<Discussion />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
