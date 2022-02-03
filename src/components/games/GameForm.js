import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const title = useRef(null)
    const maker = useRef(null)
    const numberOfPlayers = useRef(null)
    const skillLevel = useRef(null)
    const gameType = useRef(null)

    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    // const [currentGame, setCurrentGame] = useState({
    //     skillLevel: 1,
    //     numberOfPlayers: 0,
    //     title: "",
    //     maker: "",
    //     gameTypeId: 0
    // })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const constructNewGame = () => {
        /*
            The `location` and `animal` variables below are
            the references attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */

        if (gameType === 0) {
            window.alert("Please select a game type")
        } else {
            createGame({
                title: title.current.value,
                maker: maker.current.value,
                number_of_players: parseInt(numberOfPlayers.current.value),
                skill_level: parseInt(skillLevel.current.value),
                game_type: parseInt(gameType.current.value),
            })
            .then(() => history.push("/"))
        }
    }
    // const changeGameState = (domEvent) => {
    //     // TODO: Complete the onChange function
    // }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" ref={title} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" id="maker" ref={maker} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" id="players" ref={numberOfPlayers} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <input type="text" id="skill" ref={skillLevel} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select defaultValue="" name="gameType" ref={gameType} id="gameType" className="form-control" >
                        <option value="0">Select a game type</option>
                        {gameTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewGame()
                }}
                className="btn btn-primary">
                Save Game
            </button>

            {/* TODO: create the rest of the input fields */}

            {/* <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button> */}
        </form>
    )
}