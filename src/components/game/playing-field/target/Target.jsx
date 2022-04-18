import { useEffect, useReducer } from 'react';
import targetImg from '../../../../images/target.png'

const Target = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'updateTimer' })
        let timerId
        // props.addPoints(state.points)
        if (!props.isActive)
            props.addPoints(state.points)

        if (props.isActive) {

            dispatch({ type: 'resetPoints' })
            timerId = setInterval(() => dispatch({ type: 'tick' }), 10);
            return () => clearInterval(timerId);
        }

    }, [props.isActive])

    useEffect(() => {
        dispatch({ type: 'setPoints', strength: props.strength })
    }, [props.strength])

    return (
        <div className='target'
            style={{
                position: 'absolute',
                left: props.x,
                top: props.y
            }}>
            <div className="target__points" style={!props.isActive ? { animationName: 'lifting-up' } : {}}>
                +{state.points}
            </div>
            <div className='target__block'
                style={{
                    transform: `rotate3d(1,0,0, ${props.isActive ? 0 : 90}deg)`,
                    backgroundColor: `${props.strength === 3 ? '#b51d18'
                        : props.strength === 2 ? '#b58918' : '#18b5a4'}`
                }}>

                <img className='target__img' src={targetImg} alt="" />

                <div className="target__timer">
                    {`${state.time.sec} : ${state.time.milSec}`}
                </div>
            </div>
        </div>
    )
}

export default Target


const initialState = {
    time: { sec: 3, milSec: 0 },
    points: 0
};

const reducer = (state, action) => {

    switch (action.type) {
        case 'tick':
            return state.time.milSec === 0 ?
                { ...state, time: { sec: state.time.sec - 1, milSec: 59 } }
                :
                { ...state, time: { sec: state.time.sec, milSec: state.time.milSec - 1 } }

        case 'updateTimer':
            return { ...state, time: { sec: 3, milSec: 0 } }

        case 'setPoints':
            if (state.points === 0)
                return { ...state, points: 30 * action.strength }
            return state
        case 'resetPoints':
            return { ...state, points: 0 }
        default: return state
    }
}
