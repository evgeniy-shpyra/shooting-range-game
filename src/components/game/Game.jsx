import './../../scss/game.scss';
import Sight from './sight/Sight';
import PlayingField from './playing-field/PlayingField';
import { useEffect, useState } from 'react';
import game from '../../logic/logic';
import pointImg from './../../images/point.png'

const width = 75
const height = 120
const freeHeight = 70
const sightRadius = 50

const Game = (props) => {

  const [enemies, setEnemies] = useState(game.initializationData(width, height, 80, 5, freeHeight, sightRadius))
  const [points, setPoints] = useState(0)

  window.state = enemies

  const shot = (coordinates) => {
    setEnemies(enemies => game.inclusionCheck(enemies, coordinates, width, height, freeHeight))
  }

  const updateInitializationData = event => {
    setEnemies(game.initializationData(75, 100, 80, 5))
  }

  const addPoints = (newPoints) => { 
    setPoints(points => points + newPoints)
  } 

  useEffect(() => {
    window.addEventListener('resize', updateInitializationData);
    return () => window.removeEventListener('resize', updateInitializationData)
  }, [])


  return (
    <div className='game' style={{ cursor: 'none' }}>
      <Sight shot={shot} />
      <PlayingField enemies={enemies} addPoints={addPoints} />
      <div className='game__points points'>
        <div className='points__count'>{points}</div>
        
        <img className='points__img' src={pointImg} alt="" />
      </div>
    </div>
  );
}

export default Game;
