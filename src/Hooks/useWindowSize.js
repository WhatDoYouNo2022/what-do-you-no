// useWindowSize.js

// useWindowSize hook sourced from: https://usehooks.com/useWindowSize/

import { useState, useEffect } from "react";

const useWindowSize = () => {
    // Create a state variable to hold the width and height of the window object.
    const [ windowSize, setWindowSize ] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // Event handler to call on window resize
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        // Event listener for when the window size changes
        window.addEventListener("resize", handleWindowResize);

        // Get the initial size of the window right away
        handleWindowResize();

        // Cleanup function to remove the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])

    return windowSize;
}

export default useWindowSize;