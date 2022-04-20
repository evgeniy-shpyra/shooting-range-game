import './../../../scss/menu.scss';
import { NavLink } from 'react-router-dom';
const Menu = (props) => {
    return (
        <div className='menu'>
            <div className="menu__name">Game Name</div>
            <NavLink to={'/game'} className="menu__btn btn">Play</NavLink>
        </div>

    )

}

export default Menu