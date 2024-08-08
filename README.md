# MathGame
[React] Simple MathGame with timer and preferences

## Overview
MathGame is a React component, where user can solve arithmetic operations in defined time frame. During the game, correct and incorrect answers are tracked and the full score is displayed when the game is over.
This component provides various settings, such as the maximum number used, game duration and the arithmetic operations included in the game.

## Installation
Before using this component, make sure to install required dependencies:
  - React Bootstrap
  - @mdi/react
```
npm install react-bootstrap @mdi/react
```
## MathGame Component
### Component imports
```jsx
import React, {useState, useEffect} from "react"
import '../Styles/MathGame.css'
import {Card, Row, Col, Modal, Form, Button, Stack} from "react-bootstrap"
import Icon from "@mdi/react"
import { mdiCheck, mdiClose, mdiTimerOutline, mdiChevronRight, mdiCog } from '@mdi/js'
```
### State variables
- **User preferences** There are saved user preferences used for game. Operators (+, -, *), game duration and the highest number used in the game. Default values are stored in brackets.
  ```jsx
  const [operators, setOperators] = useState(["+", "-", "*"])
  const [useNegative, setUseNegative] = useState(false)
  const [duration, setDuration] = useState(60)
  const [maxNumber, setMaxNumber] = useState(10)
  ```
- **Answer counters** Stores the count of all correct and incorrect answers.
  ```jsx
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  ```
- **Task and answer** Current task and correct answer
  ```jsx
  const [task, setTask] = useState("")
  const [answer, setAnswer] = useState()
  ```
- **User input** is stored in this variable, which is then used in the function that handles answers
  ```jsx
  const [input, setInput] = useState("")
  ```
- **Timer variables** are necessary for game duration.
  ```jsx
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  ```
- **Modal control**: controls whether the modal is rendered
  ```jsx
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  ```
### Main functions
- **randomNumberGenerator**: generates a random number between 0 and `maxNumber`
  ```jsx
  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * (maxNumber + 1))
  }
  ```
- **createTask**: generates a new task. Ensures that the answer is not negative, depending on user preferences.
  ```jsx
  const createTask = () => { ... }
  ```
- **handleResult**: processes user answers and updates answer counters
  ```jsx
  const handleResult = (event, input) => { ... }
  ```
- **startTimer**: starts the timer and game. Reset all previous answer counts.
  ```jsx
  const startTimer = () => { ... }
  ```
- **formatTime**: formats the timer to be user-friendly
- **calcScore**: calculate the user's score at the end of the game
- **handleInput**: updates user input
- **changeDuration**: updates duration
- **changeMaxNumber**: updates max number, which is used by `randomNumberGenerator`
- **changeOperations**: updates selected arithmetic operators
