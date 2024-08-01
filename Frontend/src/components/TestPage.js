import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TestPage.css';

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [testDetails, setTestDetails] = useState(location.state?.testDetails || {
    title: '',
    passingScore: '',
    duration: '',
    startTime: '',
    endTime: '',
    category: '',
    description: '',
    questions: []
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem('timeLeft');
    return storedTime ? parseInt(storedTime, 10) : parseInt(testDetails.duration, 10) * 60 || 0;
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [score, setScore] = useState(0);
  const [isExamAccessible, setIsExamAccessible] = useState(true);

  useEffect(() => {
    const checkExamAccessibility = () => {
      const now = new Date();
      const startTime = new Date(testDetails.startTime);
      const endTime = new Date(testDetails.endTime);
      console.log( JSON.stringify(testDetails));
      return now >= startTime && now <= endTime;
    };

    setIsExamAccessible(checkExamAccessibility());

    if (isExamAccessible) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer); // Stop the timer
            localStorage.removeItem('timeLeft'); // Clear the stored time
            handleSubmitTest(); // Automatically submit when time runs out
            return 0;
          }
          const newTime = prevTime - 1;
          localStorage.setItem('timeLeft', newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      localStorage.removeItem('timeLeft');
    }
  }, [testDetails, isExamAccessible]);

  const calculateScore = useCallback(() => {
    const correctAnswers = testDetails.questions.reduce((totalPoints, question, index) => {
      const userAnswer = userAnswers[index];
      if (
        (question.type === 'MCQ' || question.type === 'TF') && 
        userAnswer === question.correctOption
      ) {
        return totalPoints + parseInt(question.point, 10);
      }
      if (question.type === 'FITB' && userAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()) {
        return totalPoints + parseInt(question.point, 10);
      }
      return totalPoints;
    }, 0);

    setScore(correctAnswers);
  }, [userAnswers, testDetails.questions]);

  useEffect(() => {
    calculateScore();
  }, [userAnswers, calculateScore]);

  useEffect(() => {
    setVisitedQuestions(prev => ({ ...prev, 0: true }));
  }, []);

  const handleAnswerChange = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleQuestionChange = (index) => {
    if (index >= 0 && index < (testDetails?.questions?.length || 0)) {
      setCurrentQuestionIndex(index);
      setVisitedQuestions(prev => ({ ...prev, [index]: true }));
    }
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: '',
    }));
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestionIndex]: false,
    }));
  };

  const handleMarkForReviewAndNext = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));
    handleQuestionChange(currentQuestionIndex + 1);
  };

  const handleSaveAndNext = () => {
    // Validation logic
    const currentQuestion = testDetails?.questions?.[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];

    if (currentQuestion.type === 'FITB' && !currentAnswer) {
      alert('Please fill in the answer before saving and moving to the next question.');
      return;
    }

    if ((currentQuestion.type === 'MCQ' || currentQuestion.type === 'TF') && !currentAnswer) {
      alert('Please select an option before saving and moving to the next question.');
      return;
    }

    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestionIndex]: false,
    }));

    const nextIndex = (currentQuestionIndex + 1) % testDetails.questions.length;
    handleQuestionChange(nextIndex);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmitTest = () => {
    calculateScore();
    alert(`Your score is ${score}`);
    // Here you can add logic to submit the test to a server
    navigate('/submit', { state: { score } }); // Example redirect after submission
  };

  if (!isExamAccessible) {
    return <div className="container"><h1>The exam is not accessible at this time.</h1></div>;
  }

  const currentQuestion = testDetails?.questions?.[currentQuestionIndex] || {};

  return (
    <div className="container">
      <header className="header">
        <h1>{testDetails?.title || 'Test'}</h1>
      </header>

      <div className="content">
        <div className="questionArea">
  {/* Navigation Bar */}
  <div className="navigationBar">
    <div className="questionNumber">
      Question No. {currentQuestionIndex + 1}
    </div>
    <div className="questionDetails">
      <span>Points: {currentQuestion.point || 0}</span>
      <span> | </span>
      <span>Duration: {formatTime(timeLeft) || 'N/A'}</span>
    </div>
  </div>
  {/* <hr></hr> */}
  {/* Existing Question Area Content */}
  {/* <div className="timer">Time Left: {formatTime(timeLeft)}</div> */}

  <div className="questionDisplay">
    
    <p>{currentQuestion.text || 'No question available'}</p>

    {currentQuestion.type === 'MCQ' && (
      <div className="options">
        {(currentQuestion.options || []).map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={userAnswers[currentQuestionIndex] === option}
              onChange={() => handleAnswerChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    )}

    {currentQuestion.type === 'TF' && (
      <div className="options">
        {['true', 'false'].map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={userAnswers[currentQuestionIndex] === option}
              onChange={() => handleAnswerChange(option)}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>
    )}

    {currentQuestion.type === 'FITB' && (
      <input
        type="text"
        value={userAnswers[currentQuestionIndex] || ''}
        onChange={(e) => handleAnswerChange(e.target.value)}
        className="input"
        placeholder="Type your answer here"
      />
    )}
  </div>

  {/* Existing Action Buttons */}
  <div className="actionButtons">
    <button className="clearResponseButton" onClick={() => handleAnswerChange('')}>Clear Response</button>
    <button className="markForReviewButton" onClick={handleMarkForReviewAndNext}>Mark for Review and Next</button>
    <button className="saveAndNextButton" onClick={handleSaveAndNext}>Save and Next</button>
    <button className="submitButton" onClick={handleSubmitTest}>Submit Test</button>
  </div>
</div>


        <div className="sidePanel">
          <div className="userInfo">
            <div className="avatar">{testDetails?.username?.[0] || 'U'}</div>
            <span>{testDetails?.username || 'User'}</span>
          </div>

          <div className="navigationPanel">
            <h3>SECTION: Test</h3>
            <div className="questionGrid">
              {testDetails.questions.map((_, index) => (
                <button
                  key={index}
                  className={`questionButton ${visitedQuestions[index] ? (markedForReview[index] ? 'markedForReview' : (userAnswers[index] ? 'answered' : 'visitedButNotAnswered')) : ''}`}
                  onClick={() => handleQuestionChange(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
