import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './pages/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import IssueDetails from './pages/IssueDetails/IssueDetails';
import Subscription from './pages/Subscription/Subscription';
import Auth from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "./Redux/Auth/Action";
import { fetchProject } from './Redux/project/Action';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); 

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !user) {
      dispatch(getUser());
      dispatch(fetchProject({}));
    }
  }, [dispatch, user]); 
  
  console.log(user);

  return (
    <>
      {
        user ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
              <Route path="/upgrade_plan" element={<Subscription />} />
            </Routes>
          </div>
        ) : <Auth />
      }
    </>
  );
}

export default App;
