import Game from './game/Game';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './menu/Menu';
import { useState, useEffect } from 'react';

const App = (props) => {

    const [userData, setUserData] = useState(null)

    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/menu' />} />
                <Route path='/menu' element={<Menu setUserData={setUserData} />} />
                <Route path='/game' element={<Game userData={userData} />} />
            </Routes>
        </div>
    )
}

export default App