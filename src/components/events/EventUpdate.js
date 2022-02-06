import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getGames } from "../games/GameManager"
import { getEvent, getEventById, updateEvent } from "./EventManager"

export const EventUpdate = () => {
    const description = useRef(null)
    const date = useRef(null)
    const time = useRef(null)
    const game = useRef(null)
    const { eventId } = useParams()
    const parsedId = parseInt(eventId)
    const [event, setEvent] = useState({})
    const history = useHistory()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
        getEventById(parsedId).then(data => setEvent(data))
    }, [])

    const editEvent = () => {
        updateEvent({
            id: parseInt(eventId),
            description: description.current.value,
            date: date.current.value,
            time: time.current.value,
            game: game.current.value
        })
        .then(() => history.push("/events"))
    }

    return (
        <>
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" ref={description} required autoFocus className="form-control" defaultValue={event.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" id="date" ref={date} required autoFocus className="form-control" defaultValue={event.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" ref={time} required autoFocus className="form-control" defaultValue={event.time}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" ref={game} id="game" className="form-control" >
                        <option>Select a game</option>
                        {games.map(g => 
                            {if (event.game?.id === g.id) {
                                return <option key={g.id} value={g.id} selected>
                                {g.title}
                            </option>
                            }
                            else {
                                return <option key={g.id} value={g.id}>
                                {g.title}
                            </option>
                            }
                            }
                        )}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    editEvent()
                }}
                className="btn btn-primary">
                Save Changes
            </button>
        </form>
        </>
    )
}