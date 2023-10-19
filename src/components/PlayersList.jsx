import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from "react-router-dom";
import "../styles/PlayersList.css";

const PlayersList = (props) => {
    // Defining state to store the list of players, loading status, and error handling
    const [playersList, setPlayersList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use the useEffect hook to fetch the list of players when the component mounts
    useEffect(() => {
        fetch('http://localhost:5000/players')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPlayersList(data)
                setLoading(false)
                setError(error)
            })
            .catch(error => {
                setPlayersList(null)
                setLoading(false)
                setError(error)
            });
    }, [])

    // Display a loading message if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display an error message if there is an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Link to={"addPlayer"}>
                <Button
                    label="Add Player"
                    className="primary-button"
                />
            </Link>
            <Link to={"getPlayer"}>
                <Button
                    label="See Player"
                    className="primary-button"
                />
            </Link>
            {playersList && <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Jersey Number</th>
                        <th>Age</th>
                        <th>Runs scored</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playersList.map(player => (
                        <tr key={player.player_id}>
                            <td>{player.player_name}</td>
                            <td>{player.player_role}</td>
                            <td>{player.player_jersey_number}</td>
                            <td>{player.player_age}</td>
                            <td>{player.batting_stats.runs_scored}</td>
                            <td>
                                <Link to={`editPlayer/${player.player_id}`}>
                                    <Button
                                        label="Edit"
                                        className="primary-button"
                                    />
                                </Link>
                                <Link to={`deletePlayer/${player.player_id}`}>
                                    <Button
                                        label="Delete"
                                        className="primary-button primary-button-red"
                                    />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
}

export { PlayersList };
