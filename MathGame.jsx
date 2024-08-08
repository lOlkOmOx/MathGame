//To use this component, make sure to install React-Bootstrap and mdi icons.

import React, {useState, useEffect} from "react";
import './MathGame.css'
import {Card, Row, Col, Modal, Form, Button, Stack} from "react-bootstrap"
import Icon from "@mdi/react";
import { mdiCheck, mdiClose, mdiTimerOutline, mdiChevronRight, mdiCog } from '@mdi/js';

function MathGame() {

    //User preferences
    const [operators, setOperators] = useState(["+", "-", "*"])
    const [useNegative, setUseNegative] = useState(false)
    const [duration, setDuration] = useState(60)
    const [maxNumber, setMaxNumber] = useState(10)

    //Answer counters
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)

    //Saving generated task and correct answer 
    const [task, setTask] = useState("")
    const [answer, setAnswer] = useState()

    //User input
    const [input, setInput] = useState("")

    //For timer
    const [seconds, setSeconds] = useState(60)
    const [running, setRunning] = useState(false)
    const [completed, setCompleted] = useState(false)

    //Modal control
    const [show, setShow] = useState(true)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const randomNumberGenerator = () => {
        return Math.floor(Math.random() * (maxNumber + 1));
      }

    const createTask = () => {
        let numberOne = randomNumberGenerator()
        let numberTwo = randomNumberGenerator()
        const randomIndex = Math.floor(Math.random() * operators.length)
        let operator = operators[randomIndex]
        if(operator === "+") {
            setAnswer(numberOne + numberTwo)
            setTask(`${numberOne} + ${numberTwo}`)
        } else if(operator === "-") { 
            //A check is needed to ensure the generated task's answer isn't negative
            if(useNegative === true) {
                setAnswer(numberOne - numberTwo)
                setTask(`${numberOne} - ${numberTwo}`)
            } else {
                let result = numberOne - numberTwo
                if (result >= 0) {
                    setAnswer(numberOne - numberTwo)
                    setTask(`${numberOne} - ${numberTwo}`)
                } else createTask() 
            }
        } else {
            setAnswer(numberOne * numberTwo)
            setTask(`${numberOne} * ${numberTwo}`)
        }
    }

    //handling form submit
    const handleResult = (event, input) => {
        event.preventDefault()

        let intInput = parseInt(input)

        if(intInput === answer) {
            setCorrect(previous => previous +1)
            setInput("")
            createTask()
        } else {
            setWrong(previous => previous +1)
            setInput("")
            createTask()
        }
    }
  
    useEffect(() => {
        let interval = null

        if (running && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1)
            }, 1000)
        } else if (seconds === 0) {
            setRunning(false)
            setCompleted(true)
        }

        return () => clearInterval(interval)
    }, [running, seconds])
  
    const startTimer = () => {
        setRunning(true)
        setCompleted(false)
        createTask()
        setCorrect(0)
        setWrong(0)
        setSeconds(duration)
    }
  
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${minutes}:${sec < 10 ? `0${sec}` : sec}`
    }
    
    const calcScore = () => {
        return correct - wrong
    }

    const handleInput = (event) => {
        setInput(event.target.value)
      }

    const changeDuration = (e) => {
        setDuration(parseInt(e.target.value))
    }

    const changeMaxNumber = (e) => {
        setMaxNumber(parseInt(e.target.value))
    }

    const changeOperations = (operator) => {
        setOperators(prevOperators => {
            if (prevOperators.includes(operator)) {
                return prevOperators.filter(op => op !== operator)
            } else {
                return [...prevOperators, operator]
            }
        })
    }

    return(
        <div className="MathGame" style={{textAlign:"center"}}>
            <h1>MathGame</h1>
            <div className="MathCard">
                <Card bg="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col>
                                    <Icon path={mdiTimerOutline} size={2} color="gray"/>
                                    {running ? (<p>{formatTime(seconds)}</p>) : (<p>__</p>)}
                                </Col>
                                <Col>
                                    <Icon path={mdiCheck} size={2} color="green"></Icon> 
                                    <p>{correct}</p>
                                </Col>
                                <Col>
                                    <Icon path={mdiClose} size={2} color="red"></Icon> 
                                    <p>{wrong}</p>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Footer>
                            {running ? (<h2>{task} = __</h2>) : (null)}
                            {completed ? (<h2>Time's up! Score: {calcScore()}</h2>):(null)}
                            {(!running && !completed) ? (<h2>Press start to start</h2>):(null)}
                        </Card.Footer>
                        <Card.Footer>
                        {running ? (
                            <form>
                                <input type="number" value={input} onChange={handleInput} autoFocus></input>
                                <button type="submit" onClick={(e) => handleResult(e, input)} disabled={completed}>
                                    <Icon path={mdiChevronRight} size={2} color="black"/>
                                </button>
                            </form>
                        ):(<button onClick={startTimer} className="StartButton">Start</button>)}
                        </Card.Footer>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} data-bs-theme="dark" className="SettingsModal">
                    <Modal.Header>
                        <Modal.Title>Game settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Aritmetic operations</Form.Label>
                            <Stack direction="horizontal" gap={5}>
                            <Form.Check
                                type="switch"
                                label="+"
                                checked={operators.includes("+")}
                                onChange={() => changeOperations("+")}
                            />
                            <Form.Check
                                type="switch"
                                label="-"
                                checked={operators.includes("-")}
                                onChange={() => changeOperations("-")}
                            />
                            <Form.Check
                                type="switch"
                                label="*"
                                checked={operators.includes("*")}
                                onChange={() => changeOperations("*")}
                            />
                            </Stack>
                            < br/>
                            <Form.Label>Duration (seconds)</Form.Label>
                            <Form.Control type="number" value={duration} onChange={changeDuration}/>
                            <br />
                            <Form.Label>Max number</Form.Label>
                            <Form.Control type="number" value={maxNumber} onChange={changeMaxNumber}/>
                            <br />
                            <Form.Check 
                                type="switch"
                                label="Allow negative results"
                                checked={useNegative}
                                onChange={() => setUseNegative(!useNegative)}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="success" onClick={handleClose}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <BackButton />
            <Button className="settings-button" variant="secondary" onClick={handleShow}>
                <Icon path={mdiCog} size={8} />
            </Button>
        </div>
    )
}

export default MathGame
