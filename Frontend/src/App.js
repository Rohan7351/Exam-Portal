// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContest';
import CreateTest from './components/CreateTest';
import AddQuestions from './components/AddQuestions';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import CreatorDashboard from './components/CreatorDashboard';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import ManageTests from './components/ManageTests';
import ViewResults from './components/ViewResult';
import CreatorPage from './components/CreatorPage';
import Navigation from './components/Navbar';

function App() {
  return (/*  */
    <AuthProvider>
    <Router>
      <Navigation />
            <div className="container mt-4">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addquestions" element={<AddQuestions />} />
        {/* <Route path="/taketest" element={<TakeTest />} /> */}
        {/* <Route path='/testcontainer' element={<TestContainer/>}/> */}
        <Route path='/testpage' element={<TestPage/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/creator/dashboard' element={<CreatorDashboard/>}/>
        <Route path='/creator/test-list' element={<CreatorPage/>}/>
        <Route path="/creator/create-test" element={<CreateTest/>} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/manage-tests" component={ManageTests} />
        <Route path="/admin/view-results" component={ViewResults} />
      
      </Routes>

      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
