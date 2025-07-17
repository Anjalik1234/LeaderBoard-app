import React, { useEffect, useState } from 'react';
import { getRankings } from '../api';
import './Rankings.css';

function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    const data = await getRankings();
    setRankings(data);
  };

  const getRankClass = (index) => {
    if (index === 0) return 'rank-row first';
    if (index === 1) return 'rank-row second';
    if (index === 2) return 'rank-row third';
    return 'rank-row';
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">
        <span role="img" aria-label="trophy">🏆</span> Leaderboard
      </h2>
      <div className="leaderboard-subtitle">
        Real-time user rankings based on total points
      </div>
      <div className="rankings-list">
        {rankings.map((user, idx) => (
          <div className={getRankClass(idx)} key={user._id}>
            <span className={`rank-badge ${idx < 3 ? 'top' : ''}`}>{idx + 1}</span>
            <span className="rank-name">{user.name}</span>
            <span className="rank-points">
              <b>{user.totalPoints} points</b>
              {idx === 0 && <span className="rank-trophy" role="img" aria-label="trophy"> 🏆</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rankings;
