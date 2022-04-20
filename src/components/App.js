import Game from './game/Game';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './game/menu/Menu';

const App = (props) => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/menu' />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/game' element={<Game />} />
            </Routes>
        </div>
    )
}

export default App