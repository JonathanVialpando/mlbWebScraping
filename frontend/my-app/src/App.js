import React, { useState } from 'react';
import { Dropdown, Button, TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table } from 'semantic-ui-react';
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

function App() {
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState(null);
  const [error, setError] = useState(null);

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
  }

  return (
    <div className="App">
      <h1>Team Roster</h1>
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
                <TableHeaderCell>Team Name</TableHeaderCell>
                <TableHeaderCell>B/T</TableHeaderCell>
                <TableHeaderCell>Ht</TableHeaderCell>
                <TableHeaderCell>Wt</TableHeaderCell>
                <TableHeaderCell>DOB</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
             
              {roster["data"].map((item, index) => (
                <TableRow>
                  <TableCell key={index}>{item}</TableCell>
                </TableRow>
              ))}
              
              
            </TableBody>
          </Table>
        ) : error ? (
          <div>
            <h1>Error:</h1>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default App;