import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../games/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {
    const description = useRef(null)
    const date = useRef(null)
    const time = useRef(null)
    const game = useRef(null)
    const history = useHistory()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const constructNewEvent = () => {
        if (game === 0) {
            window.alert("Please select a game")
        } else {
            createEvent({
                description: description.current.value,
                date: date.current.value,
                time: time.current.value,
                game: parseInt(game.current.value),
            })
            .then(() => history.push("/events"))
        }
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" ref={description} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" id="date" ref={date} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" ref={time} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select defaultValue="" name="game" ref={game} id="game" className="form-control" >
                        <option value="0">Select a game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewEvent()
                }}
                className="btn btn-primary">
                Save Event
            </button>
        </form>
    )
}