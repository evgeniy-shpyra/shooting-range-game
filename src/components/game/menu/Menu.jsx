import "./../../../scss/menu.scss";
import { NavLink } from "react-router-dom";
const Menu = (props) => {
    return (
        <div className="menu__container">
            <div className="menu">
                <div className="menu__name">Shooting gallery</div>
                <NavLink to={"/game"} className="menu__btn btn">
                    Play
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;
