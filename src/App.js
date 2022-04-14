import './scss/App.scss';
import Sight from './components/game/sight/Sight';
import PlayingField from './components/game/playing-field/PlayingField';
import { useEffect, useState } from 'react';


function App() {


  let [enemies, setEnemies] = useState([{ isActive: true }])

  const killedEnemy = () => {
    setEnemies([{ isActive: false }])
  }


  return (
    <div className='App'>
      <Sight killedEnemy={killedEnemy} />
      <PlayingField enemies={enemies} />

    </div>
  );
}

export default App;
