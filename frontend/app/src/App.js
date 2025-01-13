import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'


function App() {
  return (
    <div className="App">
      <Dropdown
        placeholder='Select Friend'
        fluid
        selection
        options={friendOptions}
      />
    </div>
  );
}

export default App;
