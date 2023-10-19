import React, { useState } from 'react';
import '../styles/GetPlayer.css';
import { Button } from './Button'; // Import your Button component

function GetPlayer() {
    // Defining state to store player ID, player information, loading status, and error handling
    const [playerId, setPlayerId] = useState('');
    const [playerInfo, setPlayerInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle changes in the player ID input field
    const handleInputChange = (event) => {
        setPlayerId(event.target.value);
    };

    // Handle fetching player data when the "Get Player" button is clicked
    const handleGetPlayer = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/getPlayer/${playerId}`);

            if (response.ok) {
                // Parse and set player information if the response is successful
                const data = await response.json();
                setPlayerInfo(data);
            } else {
                // Handle errors when the player is not found
                setError('Player not found');
            }
        } catch (error) {
            // Handle network or other errors
            setError('Network error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="get-player-container">
            <h2>Get Player</h2>
            <div className="form-group">
                <label>Player ID:</label>
                <input
                    className="playerIdEnter"
                    type="text"
                    value={playerId}
                    onChange={handleInputChange}
                />
            </div>
            {/* Render the "Get Player" button with a click handler */}
            <Button label="Get Player" className="primary-button" onClick={handleGetPlayer} />
            {/* Display a loading message when fetching player data */}
            {isLoading && <p className="loading-message">Fetching Player...</p>}
            {/* Display an error message if there is an error */}
            {error && <p className="error-message">{error}</p>}
            {playerInfo && (
                <div className="player-details">
                    {/* Display player details when available */}
                    <p>Player Name: {playerInfo.player_name}</p>
                    <p>Player Role: {playerInfo.player_role}</p>
                    <p>Player Jersey Number: {playerInfo.player_jersey_number}</p>
                    <p>Player Age: {playerInfo.player_age}</p>
                    <p>Runs Scored: {playerInfo.runs_scored}</p>
                    <p>Centuries: {playerInfo.centuries}</p>
                    <p>Half Centuries: {playerInfo.half_centuries}</p>
                    <p>Wickets Taken: {playerInfo.wickets_taken}</p>
                    <p>Best Bowling Figures: {playerInfo.best_bowling_figures}</p>
                </div>
            )}
        </div>
    );
}

export { GetPlayer };
