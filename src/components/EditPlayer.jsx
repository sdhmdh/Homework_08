import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AddPlayer.css';

const EditPlayer = () => {
    // Initialize the React Router navigation hook and get the playerId from the route parameters
    const navigate = useNavigate();
    const { playerId } = useParams();

    // Defining state to store player information, loading status, and error handling
    const [playerInfo, setPlayerInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use the useEffect hook to fetch player data when the component mounts or when playerId changes
    useEffect(() => {
        fetch(`http://localhost:5000/getPlayer/${playerId}`)
            .then((response) => response.json())
            .then((data) => setPlayerInfo(data))
            .catch((error) => setError('Error fetching player data'));
    }, [playerId]);

    // Handle changes in the input fields and update the playerInfo state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlayerInfo({
            ...playerInfo,
            [name]: value,
        });
    };

    // Handle the form submission for updating player data
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Send a PUT request to update player data
            const response = await fetch(`http://localhost:5000/updatePlayer/${playerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerInfo),
            });

            if (response.ok) {
                // Player data updated successfully, navigate to the home page
                console.log('Player data updated successfully');
                setIsLoading(false);
                navigate('/');
            } else {
                // Handle errors in case of an unsuccessful response
                setError('Error updating player data');
                setIsLoading(false);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            setError('Network error');
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Player</h2>
            {/* Display an error message if there are validation errors */}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && (
                <form onSubmit={handleSubmit}>
                    {/* Form fields for player information */}
                    <div className="form-group">
                        <label>Player Name:</label>
                        <input
                            disabled
                            type="text"
                            name="player_name"
                            value={playerInfo.player_name}
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
                    {/* Submit button with dynamic label */}
                    <button type="submit" className="submit-button">
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            )}
            {/* Display a loading message when updating player data */}
            {isLoading && <p className="loading-message">Updating Player...</p>}
        </div>
    );
}

// Export the EditPlayer component for use in other parts of your application
export { EditPlayer };
