import React from "react";
import s from "../HomeScreen/HomeScreen.module.css";
import Cpinner from "../../components/Cpinner";
import './Quiz.css'
import Question from '../Question/Question'
import { useHistory } from "react-router-dom";
const QuestScreen = ({ question, score, setScore, setQuestion}) => {
  const [options, setOptions] = React.useState();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const history = useHistory()

  React.useEffect(() => {
    if(question){
      setOptions(
          handleRandomPosition([
            question[currentQuestion]?.correct_answer,
            ...question[currentQuestion]?.incorrect_answers,
          ])
      );
    }else{

        setQuestion()
        history.push('/')
    }
  }, [question, currentQuestion, setQuestion, history])
  const handleRandomPosition = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  const handleGomePage =()=>{
    history.push('/')
    setScore(0)
    setQuestion()
}


  return (
    <>
    <div className={s.wrapper}>
      {question ? 
      (<>
      {!question[currentQuestion] ? history.push('/') : (
          <>
      <div className='quizInfo'>
        <span>{question[currentQuestion].category}</span>
        <span>Score : {score}</span>
      </div>
      <Question
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      question={question}
      options={options}
      score={score}
      correct={question[currentQuestion]?.correct_answer}
      setScore={setScore}
      setQuestion={setQuestion}
      />
      </>
      )}
      </>) :(
        <>
      <Cpinner/>
      <button onClick={handleGomePage} style={{display:'flex',margin:'auto', marginTop:'20px'}} className={s.goTest}>Выйти</button>
      </>
      )}
      </div>
      </>
  );
};

export default QuestScreen;
