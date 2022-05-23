import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const ScoreTable = () => {

    const [users, setUsers] = React.useState([])
    const [isLoadingData, setIsLoadingData] = useState(true)

    const updateData = () => {
        axios.get(`https://api-shooter-game.herokuapp.com/api/user/?length=5`).then((response) => {
            if (response.status === 200)
                setUsers(response.data)
        })
    }


    useEffect(() => {
        if (isLoadingData) {
            updateData()
            setIsLoadingData(false)
            setTimeout(() => setIsLoadingData(true), 5000)
        }
    }, [isLoadingData])


    return (
        <div className='table'>
            {users.length > 0 &&
                <div className="table__body">
                    <ul className='table__list'>
                        {users.map((item, index) =>
                            <li key={index + item.nickname} className='table__item'>
                                <div><span>#{index + 1}</span> {item.nickname}</div>
                                <div>{item.max_score}</div>
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
};


export default ScoreTable;