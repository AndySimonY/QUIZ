import React from "react";
import {
  categoryData,
  difficultyData,
  typeData,
} from "../../data/categoryData";
import {useHistory} from 'react-router-dom'
import s from "./HomeScreen.module.css";
import ErrorMessage from "../../components/ErrorMessage";


const HomeScreen = ({fetchQuestions}) => {
  const [countQues, setCountQues] = React.useState()
  const [selectItem, setSelectItem] = React.useState(categoryData[0]);
  const [difficulty, setDifficulty] = React.useState(difficultyData[0]);
  const [typeB, setTypeData] = React.useState(typeData[0]);
  const [indexCategory, setIndexCategory] = React.useState(9);
  const [errorMessage, setErrorMessage] = React.useState('')
  const history = useHistory()

  const handelSetCategory = (x, ind) => {
    setSelectItem(x);
    setIndexCategory(ind);
  };

  const getDataQuestions= ()=>{
        if(!countQues || countQues === 0 || countQues === ''){
            setErrorMessage('Введите Количество вопросов')  
            return;   
        }else {
          if(countQues > 50){
            setErrorMessage('Количество вопросов не может быть больше 50')
          }else{
            setErrorMessage(false)
            fetchQuestions(countQues,indexCategory,difficulty, typeB)
            history.push('/test')
          }
        }
        
    
  }



  return (
    <>
    
    <form className={s.wrapper}>
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div className={s.inputData}>
        <input type="number" value={countQues} onChange={(e) => setCountQues(e.target.value)} required />
        <div className={s.underline}></div>
        <label>Количество вопросов</label>
      </div>

      <div className="dropdown">
        <h6>Выберите категорию</h6>
        <div className="dropdownSelect">
          <span className="select">{selectItem}</span>
          <div className="dropdown-list">
            {categoryData.map((x, index) => (
              <option
                onClick={() => handelSetCategory(x, index + 8)}
                className="dropdown-list__item"
                key={x}
                value={index}
              >
                {x}
              </option>
            ))}
          </div>
        </div>
      </div>

      <div className="dropdown">
        <h6>Выберите сложность</h6>
        <div className="dropdownSelect">
          <span className="select">{difficulty}</span>
          <div className="dropdown-list">
            {difficultyData.map((x) => (
              <option
                onClick={() => setDifficulty(x)}
                className="dropdown-list__item"
                key={x}
                value={x}
              >
                {x}
              </option>
            ))}
          </div>
        </div>
      </div>

      <div className="dropdown">
        <h6>Выберите тип</h6>
        <div className="dropdownSelect">
          <span className="select">{typeB}</span>
          <div className="dropdown-list">
            {typeData.map((x) => (
              <option
                onClick={() => setTypeData(x)}
                className="dropdown-list__item"
                key={x}
                value={x}
              >
                {x}
              </option>
            ))}
          </div>
        </div>
      </div>       
    </form>
    <a style={{display:'flex'}} className={s.goTest} onClick={getDataQuestions} >
              Начать
    </a>

    </>
  );
};

export default HomeScreen;
