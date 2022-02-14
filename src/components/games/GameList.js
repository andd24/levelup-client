import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGames, deleteGame } from "./GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
            >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div>This game has {game.event_count} event(s) related to it.</div>
                        <div>You have organized {game.user_event_count} events for this game.</div>
                        <button className="btn btn-2 btn-sep icon-create" 
                            onClick={() => {history.push({ pathname: `/games/edit/${game.id}` })}}>Edit Game</button>
                        <button className="btn btn-2 btn-sep icon-create" 
                            onClick={() => deleteGame(game.id).then(setGames)}>Delete Game</button>
                    </section>
                })
            }
        </article>
        </>
    )
}