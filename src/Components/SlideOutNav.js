// Modules
import { useState } from "react";
// Components
import Leaderboard from "./Leaderboard.js"
import About from "./About.js"
const SlideOutNav = (props) => {
    const {
        navOpen,
        leaderboardOpen,
        aboutOpen,
        handleLeaderboardClick,
        handleAboutButtonClick
    } = props

    return (
        <aside className={navOpen ? "slideOutNav slideOutOpen" : "slideOutNav"}>
            {leaderboardOpen ? 
            <Leaderboard
            handleLeaderboardClick={handleLeaderboardClick}/> : aboutOpen ?
            <About 
            handleAboutButtonClick={handleAboutButtonClick}/> : null}
        </aside>
    )
}

export default SlideOutNav;