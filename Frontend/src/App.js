// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTest from './components/CreateTest';
import AddQuestions from './components/AddQuestions';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import ManageTests from './components/ManageTests';
import ViewResults from './components/ViewResult';
import UserHomePage from './components/UserHomePage';

function App() {
  return (/*  */
    <Router>
      <Routes>
        <Route path="/" element={<CreateTest />} />
        <Route path="/addquestions" element={<AddQuestions />} />
        {/* <Route path="/taketest" element={<TakeTest />} /> */}
        <Route path="/createtest" element={<CreateTest/>} />
        {/* <Route path='/testcontainer' element={<TestContainer/>}/> */}
        <Route path='/testpage' element={<TestPage/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='user/homepage' element={<UserHomePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/manage-tests" component={ManageTests} />
        <Route path="/admin/view-results" component={ViewResults} />
        
      </Routes>
    </Router>
  );
}

export default App;
