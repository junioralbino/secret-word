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

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordList);

  const [pickerWord,  setPickerWord] = useState("");
  const [pickerCategory, setPickerCategory ] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] =  useState([]);
  const [wrongLetters, setWorngLetters] = useState([]);
  const [guesses, setGuesses] =  useState(guessesQty);
  const [score, setScore] = useState(0);


  const pickWordCategory = useCallback(() => {
    //pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];


    //pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];


    return {word, category}
  },[words]);
   
  //start the secret word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLettersStates();

    const {word, category } = pickWordCategory();

    //create an array of letters
    let wordLetters = word.split("");
    

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickerWord(word);
    setPickerCategory(category);
    setLetters(wordLetters);
      
    setGameStage(stages[1].name);
  },[pickWordCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized 
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }
    //push guessed letter or remove guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWorngLetters((actualWorngLetters) => [
        ...actualWorngLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1 )
    }
  }
  
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWorngLetters([])
  }


  useEffect(() => {
    if(guesses <= 0 ){
       //reset all states
       clearLettersStates();

       setGameStage(stages[2].name);
    }
  },[guesses])

  //check win condicion
  useEffect(()=> {
   
   const uniqueLetters = [...new Set(letters)]

   //win codintion
   if(guessedLetters.length === uniqueLetters.length){
    //add score
    setScore((actualScore) => (actualScore += 100) );

    //restart game with new word
    startGame();

   }


  },[guessedLetters, letters, startGame])

   //restarts the game
   const retry = () => {
    setScore(0);
    setGuesses(guessesQty)

    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
       {gameStage === "start" &&   <StartScreen startGame={startGame} /> }
       {gameStage === "game" &&   <Game verifyLetter={verifyLetter}  pickerWord={pickerWord} pickerCategory={pickerCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} /> }
       {gameStage === "end" &&   <GameOver retry={retry} score={score} /> }
    </div>
  );
}

export default App;
