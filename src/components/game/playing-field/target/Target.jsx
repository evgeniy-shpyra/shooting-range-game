import { useState, useEffect, useReducer } from 'react';

const Target = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'updateTimer' })
        let timerId
        if (props.isActive) {
            timerId = setInterval(() => dispatch({ type: 'tick' }), 10);
            return () => clearInterval(timerId);
        }
        
    }, [props.isActive])


    return (
        <div className='target'
            style={{
                position: 'absolute',
                left: props.x,
                top: props.y
            }}>
            <div className='target__block'
                style={{
                    transform: `rotate3d(1,0,0, ${props.isActive ? 0 : 90}deg)`,
                    backgroundColor: `${props.strength === 3 ? '#b51d18'
                        : props.strength === 2 ? '#b58918' : '#18b5a4'}`
                }}>

                <div className="timer">
                    {`${state.sec} : ${state.milSec}`}
                </div>
            </div>
        </div>
    )
}

export default Target

const initialState = {
    sec: 3,
    milSec: 0,
};

const reducer = (state, action) => {
    const { sec, milSec } = state;
    switch (action.type) {
        case 'tick':
            return milSec === 0 ? { sec: sec - 1, milSec: 59 } : { sec: sec, milSec: milSec - 1 }
        case 'updateTimer':             
            return { sec: 3, milSec: 0 }
        default: return state
    }
}
