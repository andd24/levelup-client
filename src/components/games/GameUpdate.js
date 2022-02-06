import React, { useState, useEffect, useRef } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGameById, updateGame, getGameTypes } from "./GameManager"

export const GameUpdate = () => {
    const title = useRef(null)
    const maker = useRef(null)
    const numberOfPlayers = useRef(null)
    const skillLevel = useRef(null)
    const gameType = useRef(null)
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
        getGameById(parsedId).then(data => setGame(data))
    }, [])

    const editGame = () => {
        updateGame({
            id: parsedId,
            title: title.current.value,
            maker: maker.current.value,
            number_of_players: numberOfPlayers.current.value,
            skill_level: skillLevel.current.value,
            game_type: gameType.current.value
        })
        .then(() => history.push("/games"))
    }

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Edit game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" ref={title} required autoFocus className="form-control" defaultValue={game.title}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="maker" id="maker" ref={maker} required autoFocus className="form-control" defaultValue={game.maker}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="numberOfPlayers" id="numberOfPlayers" ref={numberOfPlayers} required autoFocus className="form-control" defaultValue={game.number_of_players}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="skillLevel" id="skillLevel" ref={skillLevel} required autoFocus className="form-control" defaultValue={game.skill_level}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gametypes">Game Types: </label>
                    <select name="gametypes" ref={gameType} id="gametypes" className="form-control" >
                        <option>Select a game type</option>
                        {gameTypes.map(g => 
                            {if (gameType.game?.id === g.id) {
                                return <option key={g.id} value={g.id} selected>
                                {g.label}
                            </option>
                            }
                            else {
                                return <option key={g.id} value={g.id}>
                                {g.label}
                            </option>
                            }
                            }
                        )}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() 
                    editGame()
                }}
                className="btn btn-primary">
                Save Changes
            </button>
        </form>
        </>
    )
}