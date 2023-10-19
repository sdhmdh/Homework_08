import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './Button';
import '../styles/DeletePlayer.css';

function DeletePlayer() {
    // Initialize the React Router navigation hook and get the playerId from the route parameters
    const navigate = useNavigate();
    const { playerId } = useParams();

    // Define state to store player information
    const [playerInfo, setPlayerInfo] = useState(null);

    // Use the useEffect hook to fetch player data when the component mounts or when playerId changes
    useEffect(() => {
        fetch(`http://localhost:5000/getPlayer/${playerId}`)
            .then((response) => response.json())
            .then((data) => setPlayerInfo(data))
            .catch((error) => console.error('Error fetching player data'));
    }, [playerId]);

    // Handle the player deletion
    const handleDelete = async () => {
        fetch(`http://localhost:5000/deletePlayer/${playerId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    // Player deleted successfully, navigate to the home page
                    console.log('Player deleted successfully');
                    navigate('/');
                } else {
                    // Handle errors in case of an unsuccessful response
                    console.error('Error deleting player');
                }
            })
            .catch((error) => console.error('Network error'));
    };

    return (
        <div className="confirmation-container">
            {playerInfo && (
                <div>
                    <h2>Delete Player</h2>
                    <p>Are you sure you want to delete {playerInfo.player_name}?</p>
                    {/* Render a delete button with a click handler */}
                    <Button className="delete" label="Delete" onClick={handleDelete} />
                </div>
            )}
        </div>
    );
}

// Export the DeletePlayer component for use in other parts of your application
export { DeletePlayer };
