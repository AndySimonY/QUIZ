import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import QuestScreen from './screens/QuestScreen/QuestScreen'
import Result from './screens/Result/Result'
import axios from 'axios'
import {API_URL} from './config'


function App() {
const [question, setQuestion] = React.useState()
const [score, setScore] = React.useState(0)
const [errr, setErrr] = React.useState('')

  const fetchQuestions = async(countQues,indexCategory,difficulty, typeB) =>{
    try {
      const {data} = await axios.get(`${API_URL}?${'amount=' + countQues}&${indexCategory === 8 ? '' : 'category=' + indexCategory}&
      ${difficulty === 'Любая сложность' ? '' : 'difficulty=' + difficulty}&${typeB === 'Любой тип' ? '' : 'type=' + (typeB === 'true/false' ? 'boolean': typeB)}`)
      if(data.results.length !== 0){
        setErrr('')
        setQuestion(data.results)
       }else{
        setErrr('Отсутствует заданное количество вопросов')
        setQuestion()
       }
    } catch (error) {
      console.log(error);
      setErrr('Ошибка запроса')
    }
  }



  return (


    <>
    <BrowserRouter basename='/QUIZ'>
    <main className="container content">
      <Switch>
      <Route path="/" exact>
        <HomeScreen fetchQuestions={fetchQuestions} question={question} errr={errr}/>
      </Route>
      <Route path="/test"  exact>
        <QuestScreen 
         question={question} 
         score={score} 
         setScore={setScore} 
         setQuestion={setQuestion}
       />
      </Route>
      <Route path="/result" exact>
        <Result score={score} 
        question={question} 
        setScore={setScore} 
        setQuestion={setQuestion}/>
      </Route>
      </Switch>
    </main>
    </BrowserRouter>
    </>
  );
}

export default App;
