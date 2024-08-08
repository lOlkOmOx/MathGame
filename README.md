# MathGame
[React] Simple MathGame with timer and preferences

## Overview
MathGame is a React component, where user can solve aritmetic operations in definited time spot. During the game, correct and wrong answers are stored and full score is showed when the game is over.
This component provides some settings, for example maximal used number, game duration or even aritmetic operations, which are in the game used.

## Installation
Before using this component, make sure to install required dependencies:
  - React Bootstrap
  - @mdi/react
```
npm install react-bootstrap @mdi/react
```

### Component imports
```jsx
import React, {useState, useEffect} from "react"
import '../Styles/MathGame.css'
import {Card, Row, Col, Modal, Form, Button, Stack} from "react-bootstrap"
import Icon from "@mdi/react"
import { mdiCheck, mdiClose, mdiTimerOutline, mdiChevronRight, mdiCog } from '@mdi/js'
```
### State variables
- **User preferences** There are saved user preferencies used for game. Operators (+, -, *), game duration and a highest number, which is user in game. Default values are stored in brackets.
  ```jsx
  const [operators, setOperators] = useState(["+", "-", "*"])
  const [useNegative, setUseNegative] = useState(false)
  const [duration, setDuration] = useState(60)
  const [maxNumber, setMaxNumber] = useState(10)
  ```
- **Answer counters** There are stored all correct and wrong answers count.
  ```jsx
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  ```
- **Task and answer** Current task and correct answer
  ```jsx
  const [task, setTask] = useState("")
  const [answer, setAnswer] = useState()
  ```
- **User input** is stored in this variable, which is then used in function for handling answers
  ```jsx
  const [input, setInput] = useState("")
  ```
- **Timer variables** are neccessary for game duration.
  ```jsx
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  ```
- **Modal control**: controls if modal is rendered or not
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
