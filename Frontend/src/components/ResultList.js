import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Button, Table } from 'react-bootstrap';
import { FaList, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ResultList = () => {
  const location = useLocation();
//   const user = location.state?.user;
//   const user = localStorage.getItem("selectedUser");
  const userId=localStorage.getItem("selectedUserId");
  const userName = localStorage.getItem("selectedUserName")
  const [results, setResults] = useState([]);
  const [user, setUser] = useState();
  
//   console.log("UserId in Resultlist  "+user);
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No JWT token found');
        return;
      }

      const userInfo = await axios.get(`http://localhost:9900/user/get/${userName}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      setUser(userInfo.data);


     
      console.log(userInfo.data);
      const response = await axios.get(`http://localhost:9900/result/get/userid/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const resultsWithTestResponses = await Promise.all(
        response.data.map(async (result) => {
            console.log(result.testId);
          const testResponse = await axios.get(`http://localhost:9900/test/get/${result.testId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const percentage = (result.score / result.totalMarks) * 100;
          return { 
            ...result, 
            testResponseTitle: testResponse.data.title,
            percentage: percentage.toFixed(2)
          };
        })
      );

      setResults(resultsWithTestResponses);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const calculateTotals = () => {
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalMarks = results.reduce((sum, result) => sum + result.totalMarks, 0);
    const totalPercentage = ((totalScore / totalMarks) * 100).toFixed(2);
    return { totalScore, totalMarks, totalPercentage };
  };

  const generateReport = () => {
    const { totalScore, totalMarks, totalPercentage } = calculateTotals();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Result Report for ${user.name}`, 14, 22);

    doc.autoTable({
      head: [['Test Title', 'Score', 'Total Marks', 'Percentage']],
      body: results.map(result => [
        result.testResponseTitle,
        result.score,
        result.totalMarks,
        `${result.percentage}%`
      ]),
      startY: 30,
    });

    const finalY = doc.lastAutoTable.finalY || 30;
    doc.setFontSize(14);
    doc.text(`Total Score: ${totalScore}`, 14, finalY + 10);
    doc.text(`Total Marks: ${totalMarks}`, 14, finalY + 20);
    doc.text(`Overall Percentage: ${totalPercentage}%`, 14, finalY + 30);

    doc.save(`${user.name}_result_report.pdf`);
  };

  const { totalScore, totalMarks, totalPercentage } = calculateTotals();

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <FaList className="me-2" />
          <span className="fs-4">Results for {user?.name}</span>
        </Card.Header>
        <Card.Body>
          <Button variant="success" className="mb-3" onClick={generateReport}>
            <FaFileAlt className="me-2" />
            Generate Report
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Title</th>
                <th>Score</th>
                <th>Total Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.testResponseTitle}</td>
                  <td>{result.score}</td>
                  <td>{result.totalMarks}</td>
                  <td>{result.percentage}%</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total</strong></td>
                <td><strong>{totalScore}</strong></td>
                <td><strong>{totalMarks}</strong></td>
                <td><strong>{totalPercentage}%</strong></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResultList;