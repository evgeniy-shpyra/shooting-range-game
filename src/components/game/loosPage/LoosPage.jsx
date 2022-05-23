import './../../../scss/loos.scss';
import pointImg from './../../../images/point.png';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const LoosPage = ({ start, points, userData }) => {

    useEffect(() => {
        if (userData.max_score < points) {
            axios.patch(`https://api-shooter-game.herokuapp.com/api/user/${userData.nickname}`, { max_score: points }).then(({ status }) => {
                if (status != 200){
                    alert('Error')
                }
            })
        }
    }, [])

    return (
        <div className='loos'>
            <div className="loos__points points">
                <div className="points__count">{points}</div>
                <img className='points__img' src={pointImg} alt="" />
            </div>
            <div className="loos__buttons">
                <div onClick={() => start()} className="loos__restartBtn btn"> Restart </div>
                <NavLink to='/menu' className="loos__menuBtn btn"> Menu </NavLink>
            </div>
        </div>
    )
}

export default LoosPage