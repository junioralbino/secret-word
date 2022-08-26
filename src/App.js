//CSS do projeto
import './App.css';

//React 
import { useCallback, useState, useEffect } from 'react';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//dados 
import { wordList } from './data/words';



const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordList);

  const [pickerWord,  setPickerWord] = useState("");
  const [pickerCategory, setPickerCategory ] = useState("");
  const [letters, setLetters] = useState([]);

  const pickWordCategory = () => {
    //pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    //pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return {word, category}
  }
   
  //start the secret word game
  const startGame = () => {
    const {word, category } = pickWordCategory();

    //create an array of letters
    let wordLetters = word.split("");
    
    console.log(word, category);
    console.log(wordLetters);

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickerWord(word);
    setPickerCategory(category);
    setLetters(letters);
      
    setGameStage(stages[1].name);
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

   //restarts the game
   const retry = () => {
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
       {gameStage === "start" &&   <StartScreen startGame={startGame} /> }
       {gameStage === "game" &&   <Game verifyLetter={verifyLetter} /> }
       {gameStage === "end" &&   <GameOver retry={retry} /> }
    </div>
  );
}

export default App;
