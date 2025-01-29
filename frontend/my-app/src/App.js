import React, { useState } from 'react';
import { Dropdown, Button, TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table, 
  MenuMenu, MenuItem, Input, Menu, Segment
 } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const teams = [
  { text: 'Arizona Diamondbacks', value: 'dbacks' },
  { text: 'Athletics', value: 'athletics' },
  { text: 'Atlanta Braves', value: 'braves' },
  { text: 'Baltimore Orioles', value: 'orioles' },
  { text: 'Boston Red Sox', value: 'redsox' },
  { text: 'Chicago Cubs', value: 'cubs' },
  { text: 'Chicago White Sox', value: 'whitesox' },
  { text: 'Cincinnati Reds', value: 'reds' },
  { text: 'Cleveland Guardians', value: 'guardians' },
  { text: 'Colorado Rockies', value: 'rockies' },
  { text: 'Detroit Tigers', value: 'tigers' },
  { text: 'Houston Astros', value: 'astros' },
  { text: 'Kansas City Royals', value: 'royals' },
  { text: 'Los Angeles Angels', value: 'angels' },
  { text: 'Los Angeles Dodgers', value: 'dodgers' },
  { text: 'Miami Marlins', value: 'marlins' },
  { text: 'Milwaukee Brewers', value: 'brewers' },
  { text: 'Minnesota Twins', value: 'twins' },
  { text: 'New York Mets', value: 'mets' },
  { text: 'New York Yankees', value: 'yankees' },
  { text: 'Philadelphia Phillies', value: 'phillies' },
  { text: 'Pittsburgh Pirates', value: 'pirates' },
  { text: 'San Diego Padres', value: 'padres' },
  { text: 'San Francisco Giants', value: 'giants' },
  { text: 'Seattle Mariners', value: 'mariners' },
  { text: 'St. Louis Cardinals', value: 'cardinals' },
  { text: 'Tampa Bay Rays', value: 'rays' },
  { text: 'Texas Rangers', value: 'rangers' },
  { text: 'Toronto Blue Jays', value: 'bluejays' },
  { text: 'Washington Nationals', value: 'nationals' },
];

function RosterPage({handleChange, fetchRoster, roster, error }) {
  return (
    <div>
      <Dropdown
        placeholder="Select Team"
        fluid
        selection
        options={teams}
        onChange={handleChange}
      />
      <Button onClick={fetchRoster}>Update Roster</Button>
      <div>
        {roster ? (
          <Table singleLine>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>B/T</TableHeaderCell>
                <TableHeaderCell>Ht</TableHeaderCell>
                <TableHeaderCell>Wt</TableHeaderCell>
                <TableHeaderCell>DOB</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roster["data"].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.bat_throw}</TableCell>
                  <TableCell>{item.height}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.birthday}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : error ? (
          <div>
            <h1>Select a team and click "Update Roster" to see 40-Man roster.</h1>
          </div>
        ) : (
          <p>Select a team and click "Update Roster" to see 40-Man roster.</p>
        )}
      </div>
    </div>
  );
}

function StandingsPage({fetchStandings, standings}) {
  return (
    <div>
      <Button onClick={fetchStandings}>Update Standings</Button>
      <div>
        {standings ? (
          <Table singleLine>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Team</TableHeaderCell>
                <TableHeaderCell>Wins</TableHeaderCell>
                <TableHeaderCell>Losses</TableHeaderCell>
                <TableHeaderCell>Win%</TableHeaderCell>
                <TableHeaderCell>Last 10</TableHeaderCell>
                <TableHeaderCell>Win Streak</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings["data"].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.team}</TableCell>
                  <TableCell>{item.wins}</TableCell>
                  <TableCell>{item.losses}</TableCell>
                  <TableCell>{item.percent}</TableCell>
                  <TableCell>{item.las10}</TableCell>
                  <TableCell>{item.w_streak}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>Click "Update Standings" to see the current Standings.</p>
        )}
      </div>
    </div>
  );
}

function App() {
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState(null);
  const [standings, setStandings] = useState(null);  // FIXED
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState('roster');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleChange = (event, data) => {
    setTeam(data.value);
  };

  const fetchRoster = async () => {
    if (team !== 0) {
      try {
        const url = `http://127.0.0.1:8080/roster/${team}`;
        console.log(`Fetching from URL: ${url}`);
        const response = await axios.get(url);
        setRoster(response);
      } catch (error) {
        setError(error);
      }
    }
  };

  const fetchStandings = async () => {
    try {
      const url = `http://127.0.0.1:8080/standings`;
      console.log(`Fetching from URL: ${url}`);
      const response = await axios.get(url);
      console.log('Fetched Standings:', response);
      setStandings(response);  // FIXED
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="App">
      <Menu attached="top" tabular>
        <MenuItem
          name="roster"
          active={activeItem === 'roster'}
          onClick={handleItemClick}
        >
          <h3>Roster</h3>
        </MenuItem>
        <MenuItem
          name="standings"
          active={activeItem === 'standings'}
          onClick={handleItemClick}
        >
          <h3>Standings</h3>
        </MenuItem>
      </Menu>
      <div>
        {activeItem === 'roster' ? (
          <RosterPage
            team={team}
            handleChange={handleChange}
            fetchRoster={fetchRoster}
            roster={roster}
            error={error}
          />
        ) : activeItem === 'standings' ? (
          <StandingsPage 
            fetchStandings={fetchStandings} 
            standings={standings} 
          />
        ) : null}
      </div>
    </div>
  );
}



export default App;