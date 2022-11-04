import React from 'react'
import './genres.css';
import ButtonGroup from "./ButtonGroup";
import { Link } from "react-router-dom";

export const Genres = () => {
    const printButtonLabel = (event) => {
        console.log(event.target.name)
    }

    return (
        <div className='Genres'>
            <div className='genres_title'>
                <h1>Top Genres</h1>
            </div>

            <div className='Buttons'>
                <ButtonGroup buttons={["Last Month", "Last 6 Months", "All Time"]}
                doSomethingAfterClick={printButtonLabel}
                />
            </div>

            <Link to="/topics">
                <button type="button" className="btn-previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
            </Link>

        </div>
    )
}
