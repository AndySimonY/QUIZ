import React from 'react'
import { useHistory } from 'react-router-dom';
import s from "../HomeScreen/HomeScreen.module.css";





const Result = ({score, question, setScore, setQuestion}) => {
    const [endArray, setEndArray] = React.useState([])
    const history = useHistory()

    const resultData = localStorage.getItem('queD') ? JSON.parse(localStorage.getItem('queD')) : null
   

     const handleGomePage =()=>{
        history.push('/')
        setScore(0)
        setQuestion()
}

if(!question){
    history.push('/')
}

    return (
        <div className={s.wrapper}>
            {question && (
                <>
            <h4 className='title'>Финальный результат: {score > question.length/1.5 ? `${score} :)` : `${score} :(` }</h4>
            <button onClick={handleGomePage} style={{display:'flex',margin:'auto', marginTop:'20px'}} className={s.goTest}>
                    Вернуться на главную
        </button>
        {resultData.length && (
            <div className='tableDiv'>
            <table>
               <tr>
               <th>№ |</th>
                   <th className='th-2' >Сложность     |</th>
                   <th className='th-1'>Верно/Неверно</th>
                   
               </tr>
               {resultData.map((d, index) =>(
                                   <tr key={index} className='str'>
                                            <td>{index+1}</td>
                                            <td>{(d).split(':')[0]}</td>
                                            <td>{(d).split(':')[1]}</td>
                                            
                                   </tr>
               ))}

            </table>
            </div>
        )} 
      
       
      
            </>
            )}
    </div>

    )
}

export default Result
