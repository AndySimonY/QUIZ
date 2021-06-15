import React from 'react'
import  './Question.css'
import s from "./../HomeScreen/HomeScreen.module.css";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from 'react-router-dom';
import { difficultyData } from '../../data/categoryData';



const Question = ({
    currentQuestion,
    setCurrentQuestion,
    question,
    options,
    score,
    correct,
    setScore,
    setQuestion
}) => {



    const [selected, setSelected] = React.useState()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [difficultyQue, setDifficultyQue] = React.useState([])
    const [trueFalse, setTrueFalse] = React.useState([])
    const history = useHistory()
    const handleSelect = (q) => {
        if(selected === q && selected === correct){
            return 'selectt';
        }else if (selected === q && selected !== correct){
            return 'wrong'
        }else if ( q === correct){
            return 'selectt'
        }
        
    }
    
    const handleCheck =(q) =>{
        setSelected(q)
        if(q === correct){
            setScore(score + 1)
            trueFalse.push(1)
            difficultyQue.push(question[currentQuestion].difficulty)
        }else{
            difficultyQue.push(question[currentQuestion].difficulty)
            trueFalse.push(0)
        }
          
        
        console.log(trueFalse);
        console.log(difficultyQue);
        setErrorMessage(false)
    }
    debugger

    const handleNext = () =>{
        if(currentQuestion + 1 >= question.length){
            const queD = []
            var i = 0
            for(let element = 0; element < difficultyQue.length; ){
                queD.push(`${difficultyQue[element]}:${trueFalse[i]}`)
                element+=1
                i+=1
            }
            localStorage.setItem('queD', JSON.stringify(queD))
            history.push('/result')
        }else {
            if (selected){
            setCurrentQuestion(currentQuestion + 1)
            setSelected()
                }
                else
                {
            setErrorMessage('Пожалуйста выберите ответ')
        }}
    }









    const handleQuit = () =>{
        history.push('/')
        setQuestion()
        setDifficultyQue([])
        setTrueFalse([])
        setScore(0)
        
    }

    return (
        <div>
           <h4 style={{display:'flex', justifyContent:'center'}}>Вопрос {currentQuestion + 1}</h4>
        
        <div className='singleQue'>
            <h6>{(question[currentQuestion].question)
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g,"'")
            .replace(/\&shy;/gi, "")
            .replace(/(&ldquo;)/g, '"')
            .replace(/(&rdquo;)/g, '"')}</h6>
            <div className='options'>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            
            
            {
            options &&
            options.map(q => (
                <button onClick={() => handleCheck(q)} 
                className={`singleOption ${selected && handleSelect(q)}`}
                key={q}
                disabled={selected}
                >
                    {(q).replace(/&quot;/g, '"').replace(/&#039;/g,"'")}
                </button>
            ))}
            </div>
        </div>
        <div className='controls'>
                <button onClick={handleQuit} className={s.goTest}>Выйти</button>
                <button onClick={handleNext} className={s.goTest}>Следующий вопрос</button>
        </div>
        </div>
    )
}

export default Question
