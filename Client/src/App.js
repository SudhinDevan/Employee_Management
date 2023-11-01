import './App.css';
import Signup from './Pages/User/Signup';
import Login from './Pages/User/Login';
import Home from './Pages/User/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/User/Profile.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import EditProfile from './Pages/User/EditProfile';
import './App.css'
import Dashboard from './Pages/Admin/Dashboard';
import Protected from './Helpers/protectedRoutes';
import AdminEditprofile from './Pages/Admin/AdminEditprofile';
import AdminCreateUser from './Pages/Admin/AdminCreateUser';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="dashboard" element={
              <Protected>
                <Dashboard />
              </Protected>
            } />
            <Route path="/dashboard/editprofile" element={
              <Protected>
                <AdminEditprofile />
              </Protected>
            } />
            <Route path="/dashboard/createuser" element={
              <Protected>
                <AdminCreateUser />
              </Protected>
            } />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
