import React from 'react';
import './Game.css';

function Game({verifyLetter}) {
  return (
    <div>
     <div className='game'>
        <p className='points'>
            <span>Pontuação: 000</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className='tip'>
          Dica sobre a palavra: <span>Dica....</span>
        </h3>
     </div>

     <div className='wordContainer'>
       <span className='letter'>A</span>
       <span  className='blankSquare'></span> 
     </div>

     <div className='letterContainer'>
       <p>Tente advinhar uma letra da palavra:</p>

        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar!</button>
        </form>
     </div>

     <div className='wrongLettersConatiner'>
        <p>Letras já utilizadas:</p>
        <span>a,</span>
        <span>b,</span>
        <span>c,</span>
     </div>
    </div>
  )
}

export default Game
