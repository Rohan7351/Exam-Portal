// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTest from './components/CreateTest';
import AddQuestions from './components/AddQuestions';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';


function App() {
  return (/*  */
    <Router>
      <Routes>
        <Route path="/" element={<CreateTest />} />
        <Route path="/createtest/addquestions" element={<AddQuestions />} />
        {/* <Route path="/taketest" element={<TakeTest />} /> */}
        <Route path="/createtest" element={<CreateTest/>} />
        {/* <Route path='/testcontainer' element={<TestContainer/>}/> */}
        <Route path='/testpage' element={<TestPage/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
