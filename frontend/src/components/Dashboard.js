import React, { useEffect, useState } from 'react';
import { getAllUsers, claimPoints, addUser } from '../api.js';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleClaim = async (userId) => {
    const result = await claimPoints(userId);
    setMessage(`${result.user.name} received ${result.awardedPoints} points!`);
    fetchUsers();
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return alert("Please enter a name");
    const result = await addUser(newUserName);
    setMessage(`User ${result.name} added!`);
    setNewUserName('');
    fetchUsers();
  };

  return (
    <div className="dashboard-container">
      <h2 className='dashboard-title'>+ User Management</h2>
      <p className='app-small-title'>Add new users and select users to claim points</p>

      <div className="add-user-bar">
        <input
          type="text"
          value={newUserName}
          placeholder="Enter name"
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <input
        type="text"
        className="search-users-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="users-list-container">
        <div className="users-list">
          {users
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(user => (
              <div className="user-row" key={user._id}>
                <span className="user-name">{user.name}</span>
                <div className="user-actions">
                  <span className="user-points">{user.totalPoints} pts</span>
                  <button className="claim-btn" onClick={() => handleClaim(user._id)}>Claim</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
