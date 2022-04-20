import './../../scss/game.scss';
import Sight from './sight/Sight';
import PlayingField from './playing-field/PlayingField';
import { useEffect, useState } from 'react';
import game from '../../logic/logic';
import pointImg from './../../images/point.png'
import Menu from './menu/Menu';
import LoosPage from './loosPage/LoosPage';

const width = 75
const height = 120
const freeHeight = 70
const sightRadius = 35

const Game = (props) => {

  const [enemies, setEnemies] = useState(game.initializationData(width, height, 80, 5, freeHeight, sightRadius))
  const [points, setPoints] = useState(0)
  const [massage, setMassage] = useState('')
  const [isGameplay, setIsGameplay] = useState(false)
  const [level, setLevel] = useState(1)
  const [time, setTime] = useState(3)
  const [isReadout, setIsReadout] = useState(true)
  const [isLoss, setIsLoss] = useState(false)

  const shot = (coordinates) => {
    setEnemies(enemies => game.inclusionCheck(enemies, coordinates, width, height, freeHeight))
  }

  const updateInitializationData = event => {
    setEnemies(game.initializationData(75, 100, 80, 5))
  }

  const addPoints = (newPoints) => {
    setPoints(points => points + newPoints)
  }
  const showMassage = (newMassage = '') => {
    setMassage(newMassage)
  }
  const start = () => {
    setPoints(0)
    setIsLoss(false)
    setIsReadout(true)
    isGameplay(false)
    
  }
  const loss = () => {
    setTime(3)
    setIsLoss(true)
    setIsGameplay(false)
    setEnemies(game.initializationData(width, height, 80, 5, freeHeight, sightRadius))
  }


  useEffect(() => {
    let timerId
    if (isReadout && !isLoss) {
      
      if (time != 0)
        timerId = setTimeout(() => {
          setTime(time - 1)
        }, 1000);
      if (time === 0) {
        setIsGameplay(true)
        setIsReadout(false)
      }
    }
    return () => clearTimeout(timerId);
  }, [time, isReadout, isLoss])



  useEffect(() => {
    setIsReadout(true)
    setIsGameplay(false)
    setIsLoss(false)
    window.addEventListener('resize', updateInitializationData);
    return () => window.removeEventListener('resize', updateInitializationData)
  }, [])

  //онуление оружия + проблема с point on target + эфект на перезарядку

  return (
    <div className='game' style={{ cursor: 'none' }}>
      <div className='game__massage'>{massage}</div>
      <div className="game__level">{level} Level</div>
      <Sight shot={shot} points={points} massage={showMassage} setLevel={setLevel} isGameplay={isGameplay} isReadout={isReadout} />
      <PlayingField enemies={enemies} addPoints={addPoints} isGameplay={isGameplay} level={level} loss={loss} />
      <div className='game__points points'>
        <div className='points__count'>{points}</div>
        <img className='points__img' src={pointImg} alt="" />
      </div>

      {(isReadout && <div className='game__time'>{time}</div>)}
      {(isLoss && <LoosPage points={points} start={start} />)}


    </div>
  );
}

export default Game;
