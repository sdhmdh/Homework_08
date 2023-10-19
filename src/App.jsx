import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PlayersList, AddPlayer, EditPlayer, DeletePlayer, GetPlayer } from './components';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PlayersList />,
    },
    {
      path: "addPlayer",
      element: <AddPlayer />,
    },
    {
      path: "editPlayer/:playerId",
      element: <EditPlayer />,
    },
    {
      path: "deletePlayer/:playerId",
      element: <DeletePlayer />,
    },
    {
      path: "getPlayer",
      element: <GetPlayer />,
    },
  ]);

  return (
    <div className="App">
      <h2>
        Cricket Management System
      </h2>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
