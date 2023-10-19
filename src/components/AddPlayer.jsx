import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddPlayer.css';

function AddPlayer() {
    // Initialize the React Router navigation hook
    const navigate = useNavigate();

    // Define the state to store player information
    const [playerInfo, setPlayerInfo] = useState({
        team_id: '',
        player_name: '',
        player_role: '',
        player_jersey_number: '',
        player_age: '',
        runs_scored: '',
        centuries: '',
        half_centuries: '',
        wickets_taken: '',
        best_bowling_figures: ''
    });

    // Define state for loading status and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle changes in the input fields and update the playerInfo state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlayerInfo({
            ...playerInfo,
            [name]: value,
        });
    };

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        // Create a data object to be submitted
        const submitObj = {
            "team_id": playerInfo.team_id,
            "player_name": playerInfo.player_name,
            "player_role": playerInfo.player_role,
            "player_jersey_number": playerInfo.player_jersey_number,
            "player_age": playerInfo.player_age,
            "batting_stats": {
                "runs_scored": playerInfo.runs_scored,
                "centuries": playerInfo.centuries,
                "half_centuries": playerInfo.half_centuries
            },
            "bowling_stats": {
                "wickets_taken": playerInfo.wickets_taken,
                "best_bowling_figures": playerInfo.best_bowling_figures
            }
        };

        try {
            // Send a POST request to the server with the player data
            const response = await fetch('http://localhost:5000/addPlayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitObj),
            });

            if (response.ok) {
                // Player data submission was successful
                console.log('Player data submitted successfully');
                navigate('/');
            } else {
                // Handle errors in case of an unsuccessful response
                console.error('Error submitting player data');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Player</h2>
            {/* Display an error message if there are validation errors */}
            {error && <p className="error-message">Error! Please enter all fields</p>}
            {/* Display the form if not loading and there are no errors */}
            {!isLoading && !error &&
                <form onSubmit={handleSubmit}>
                    {/* Form fields for player information */}
                    <div className="form-group">
                        <label>Team Id:</label>
                        <input
                            type="number"
                            name="team_id"
                            value={playerInfo.team_id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Player Name:</label>
                        <input
                            type="text"
                            name="player_name"
                            value={playerInfo.player_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Player Role:</label>
                        <input
                            type="text"
                            name="player_role"
                            value={playerInfo.player_role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Player Jersey Number:</label>
                        <input
                            type="number"
                            name="player_jersey_number"
                            value={playerInfo.player_jersey_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Player Age:</label>
                        <input
                            type="number"
                            name="player_age"
                            value={playerInfo.player_age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Runs Scored:</label>
                        <input
                            type="number"
                            name="runs_scored"
                            value={playerInfo.runs_scored}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Centuries:</label>
                        <input
                            type="number"
                            name="centuries"
                            value={playerInfo.centuries}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Half Centuries:</label>
                        <input
                            type="number"
                            name="half_centuries"
                            value={playerInfo.half_centuries}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Wickets Taken:</label>
                        <input
                            type="number"
                            name="wickets_taken"
                            value={playerInfo.wickets_taken}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Best Bowling Figures:</label>
                        <input
                            type="text"
                            name="best_bowling_figures"
                            value={playerInfo.best_bowling_figures}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            }
            {/* Display a loading message when submitting data */}
            {isLoading && <p className="loading-message">Adding Player...</p>}
        </div>
    );
}

export { AddPlayer };
