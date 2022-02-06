import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList.js"
import { EventList } from "./events/EventList.js"
import { GameForm } from "./games/GameForm.js"
import { EventForm } from "./events/EventForm.js"
import { EventUpdate } from "./events/EventUpdate.js"
import { GameUpdate } from "./games/GameUpdate.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/edit/:eventId">
                <EventUpdate />
            </Route>
            <Route exact path="/games/edit/:gameId">
                <GameUpdate />
            </Route>
        </main>
    </>
}