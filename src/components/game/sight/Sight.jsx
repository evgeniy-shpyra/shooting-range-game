import { useState, useEffect, useRef, useReducer } from 'react';
import sightPng from '../../../images/sight.png'
import weaponRevolver from '../../../images/weapon/revolver.png'
import revolverCartridges from '../../../images/weapon/cartridges/revolverCartridges.png'

const checkOfCartridges = (countCartridges) => {
    let cartridges = []
    for (let i = 0; i < countCartridges; i++)
        cartridges = [...cartridges, <img key={i} src={revolverCartridges} alt="" />]
    return cartridges
}

const Sight = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [cartridgesImg, setCartridgesImg] = useState([])

    const mouseMoveHandler = event => {
        dispatch({ type: 'move', position: { x: event.clientX - 50, y: event.clientY - 50 } })
    }
    const mouseClickHandler = event => {
        dispatch({ type: 'shot' })
    }

    useEffect(() => {
        if (state.isShot) {
            setCartridgesImg(checkOfCartridges(state.cartridges))

            props.shot({ x: state.position.x, y: state.position.y })

            if (state.cartridges <= 0) {
                dispatch({ type: 'recharge' })
                setTimeout(() => {
                    dispatch({ type: 'readyToShoot' })
                    setCartridgesImg(checkOfCartridges(6))
                }, 3000)
            }
            else {
                setTimeout(() => {
                    dispatch({ type: 'readyToShoot' })
                }, 200)
            }


        }
    }, [state.isShot])

    useEffect(() => {
        setCartridgesImg(checkOfCartridges(state.cartridges))
        window.addEventListener("click", mouseClickHandler)
        return () => window.removeEventListener("click", mouseClickHandler)
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler)
        return () => window.removeEventListener('mousemove', mouseMoveHandler)
    }, [])

    return (
        <div className='weapon'>
            <img className='weapon__sight' src={sightPng}
                style={{
                    position: 'absolute',
                    left: state.position.x,
                    top: state.position.y,
                    animationName: state.isShot ? 'efficiency' : null
                }}
            />
            <img src={weaponRevolver} alt="" className="weapon__type" />
            <div className='weapon__cartridges'>
                {[...cartridgesImg]}
            </div>
        </div>
    )
}

export default Sight

const initialState = {
    position: {
        x: null,
        y: null
    },
    isShot: false,
    isSingleShooting: true,
    weaponType: 1,
    cartridges: 6,
    isCharged: true
};

const reducer = (state, action) => {

    switch (action.type) {
        case 'move':
            return { ...state, position: { x: action.position.x, y: action.position.y } }
        case 'shot':
            if (!state.isShot) {
                return { ...state, isShot: true, cartridges: state.cartridges - 1 }
            }
            return state
        case 'recharge':
            return { ...state, cartridges: 6 }
        case 'readyToShoot':
            return { ...state, isShot: false }
        default: return state
    }
}
