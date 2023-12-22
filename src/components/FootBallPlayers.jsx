import React, { useState } from 'react';

const FootBallPlayers = ({ data }) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', age: '' });
  const [addedPlayers, setAddedPlayers] = useState([]);
  const [count, setCount] = useState(null);
  const [editedPlayer, setEditedPlayer] = useState({ name: '', age: '' });
  const [newlyEditedPlayers, setNewlyEditedPlayers] = useState([]);

  if (!data) {
    return <p>FootBall players list is still loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleAddPlayer = (teamName) => {
    setCount(count + 1);
    setAddedPlayers((prevPlayers) => [
      ...prevPlayers,
      { name: newPlayer.name, age: newPlayer.age },
    ]);

    setNewPlayer({ name: '', age: '' });
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedPlayer((prevPlayer) => ({
      ...prevPlayer,
      [fieldName]: value,
    }));
  };

  const handleSave = (teamName, playerName) => {
    setNewlyEditedPlayers((prevPlayers) => [
      ...prevPlayers,
      { name: editedPlayer.name, age: editedPlayer.age },
    ]);

    console.log(newlyEditedPlayers);
    setEditedPlayer({ name: '', age: '' });
  };

  return (
    <div className='w-full flex justify-center items'>
      <table className="m-4 border-collapse w-3/4">
        <thead>
          <tr>
            <td className='p-3'>
              <h1 className='font-extrabold text-xl'>{data.game}</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.teams.map((team) => (
            <React.Fragment key={team.team_name}>
              <tr className='m-4 p-3'>
                <td colSpan="3" className="bg-gray-300 rounded-lg">
                  {team.team_name} ({team.players.length + count})
                </td>
              </tr>
              {/* Input row for adding new players */}
              <tr>
                <td className='p-5 bg-gray-100 rounded-xl'>
                  <input
                    type="text"
                    placeholder="New Player Name"
                    name="name"
                    value={newPlayer.name}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 p-2 rounded-md'
                  />
                </td>
                <td className='p-3 bg-gray-100 rounded-md'>
                  <input
                    type="text"
                    placeholder="New Player Age"
                    name="age"
                    value={newPlayer.age}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 p-2 rounded-md'
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleAddPlayer(team.team_name)}
                    className='p-2 bg-purple-400 rounded-md'
                  >
                    Add
                  </button>
                </td>
              </tr>

              {/* Newly added players */}
              {addedPlayers.length !== 0 && (
                <tr>
                  {addedPlayers.map((player, index) => (
                    <React.Fragment key={index}>
                      <td className='p-5 bg-gray-100 rounded-xl'>{player.name}</td>
                      <td className='p-3 bg-gray-100 rounded-md'>{player.age}</td>
                      <td>
                        <button className='p-2 bg-purple-400 rounded-md'>Save</button>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              )}

              {/* Existing players */}
              {team.players.map((player) => (
                <tr key={player.name}>
                  <td className='p-5 bg-gray-100 rounded-xl'>
                    <input
                      defaultValue={player.name}
                      onChange={(e) => handleChange(e, "name")}
                    />
                  </td>
                  <td className='p-3 bg-gray-100 rounded-md'>
                    <input
                      defaultValue={player.age}
                      onChange={(e) => handleChange(e, "age")}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleSave(team.team_name, player.name)}
                      className='p-2 bg-purple-400 rounded-md'
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FootBallPlayers;
