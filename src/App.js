import React, { useState } from 'react'

import genio from './genio1.jpg'
import genioPergunta from './genio2.jpg'
import genioErro from './genio3.jpg'
import genioSucesso from './genio4.jpeg'
import './App.css'

const SCREENS = {
  start: 'start',
  game: 'game',
  message: 'message',
}

const MESSAGES = {
  start:
    'Estou pensando em um número entre 1 e 300, dúvido que você o acerte em 9 tentativas!',
  firstQuestion: 'Vamos lá! Em qual número estou pensando? (entre 1 e 300)',
  wrongAnswer:
    'Você errou! Mas ainda tem {triesNumber} tentativas! Em qual número estou pensando? (entre 1 e 300)',
  success: 'Você acertou! Muito bem! O número era {correctNumber}.',
  bad: 'Você errou! O número era {correctNumber}...',
}

const MAXTRIES = 8

const App = () => {
  const [screen, setScreen] = useState('start')
  const [currentMessage, setCurrentMessage] = useState(MESSAGES.start)
  const [extraInfo, setExtraInfo] = useState('')
  const [tries, setTries] = useState(MAXTRIES)
  const [number, setNumber] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const startGame = () => {
    setScreen(SCREENS.game)
    setTries(MAXTRIES)
    setNumber(Math.round(Math.random() * 300))
    setCurrentMessage(MESSAGES.firstQuestion)
    setExtraInfo('')
  }

  const tentativa = (event) => {
    if(event) {
      event.preventDefault();
    }
    if (number === parseInt(inputValue)) {
      setCurrentMessage(MESSAGES.success.replace('{correctNumber}', number))
      setScreen(SCREENS.message)
    } else {
      setTries(tries - 1)
      if (tries > 0) {
        if (number > inputValue) {
          setExtraInfo(`O meu número é maior que ${inputValue}`)
        } else {
          setExtraInfo(`O meu número é menor que ${inputValue}`)
        }
        setCurrentMessage(MESSAGES.wrongAnswer.replace('{triesNumber}', tries))
      } else {
        setCurrentMessage(MESSAGES.bad.replace('{correctNumber}', number))
        setScreen(SCREENS.message)
      }
    }
  }

  const goBack = () => {
    setScreen(SCREENS.start)
    setCurrentMessage(MESSAGES.start)
  }

  return (
    <div className="App">
      <header className="App-header">
        {screen === SCREENS.start && (
          <>
            <img src={genio} className="App-logo" alt="logo" />
            <p>{currentMessage}</p>
            <button className="App-button" onClick={startGame}>
              Começar
            </button>
          </>
        )}
        {screen === SCREENS.game && (
          <form onSubmit={tentativa}>
            <img src={genioPergunta} className="App-logo" alt="logo" />
            <p>{currentMessage}</p>
            <p>{extraInfo}</p>
            <input
              className="Input"
              type="number"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit" className="App-button">
              Tentar
            </button>
          </form>
        )}
        {screen === SCREENS.message && (
          <>
            <img
              src={number === parseInt(inputValue) ? genioSucesso : genioErro}
              className="App-logo"
              alt="logo"
            />
            <p>{currentMessage}</p>
            <button className="App-button" onClick={goBack}>
              Voltar
            </button>
          </>
        )}
      </header>
    </div>
  )
}

export default App
