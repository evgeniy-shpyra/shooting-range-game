import './../../../scss/loos.scss';
import pointImg from './../../../images/point.png';
import { NavLink } from 'react-router-dom';

const LoosPage = (props) => {
    return (
        <div className='loos'>
            <div className="loos__points points">
                <div className="points__count">{props.points}</div>
                <img className='points__img' src={pointImg} alt="" />
            </div>
            <div className="loos__buttons">
                <div onClick={() => props.start()} className="loos__restartBtn btn"> Restart </div>
                <NavLink to='/menu' className="loos__menuBtn btn"> Menu </NavLink>
            </div>
        </div>
    )
}

export default LoosPage