import { useState, useEffect, useReducer } from 'react';


import { getCartridgesImg, getWeaponImg, getQuantityCartridges, getWeaponType, getSightImg } from './settings';

const checkOfCartridges = (countCartridges, img) => {
    let cartridges = []
    for (let i = 0; i < countCartridges; i++)
        cartridges = [...cartridges, <img key={i} src={img} alt="" />]
    return cartridges
}

const Sight = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [cartridgesImgArr, setCartridgesImgArr] = useState([])
    const [weaponImg, setWeaponImg] = useState()
    const [cartridgesImg, setCartridgesImg] = useState()
    const [sightImg, setSightImg] = useState()


    const mouseMoveHandler = event => {
        dispatch({ type: 'move', position: { x: event.clientX - 30, y: event.clientY - 30 } })
    }
    const mouseClickHandler = event => {
        dispatch({ type: 'shot' })
    }

    useEffect(() => {
        if (state.isShot) {

            props.shot({ x: state.position.x, y: state.position.y })

            if (state.cartridges <= 0) {
                props.massage('Recharge...')
                setTimeout(() => {
                    dispatch({ type: 'readyToShoot' })
                    dispatch({ type: 'recharge' })
                    props.massage()
                }, 2000)
            }
            else {
                setTimeout(() => {
                    dispatch({ type: 'readyToShoot' })
                }, state.weapon.timeBetweenShots * 1000)
            }
        }
    }, [state.isShot])

    useEffect(() => {
        dispatch({ type: 'setWeaponType', weapon: getWeaponType(props.points) })
    }, [props.points])

    useEffect(() => {
        dispatch({ type: 'setCartridges' })
        setWeaponImg(getWeaponImg(state.weapon.type))
        setSightImg(getSightImg(state.weapon.type))
        setCartridgesImg(getCartridgesImg(state.weapon.type))
        props.setLevel(state.weapon.type)
    }, [state.weapon.type])

    useEffect(() => {
        setCartridgesImgArr(checkOfCartridges(state.cartridges, cartridgesImg))
    }, [state.cartridges, cartridgesImg])

    useEffect(() => {
        if (props.isReadout) {
            dispatch({ type: 'recharge' })
        }

    }, [props.isReadout])

    useEffect(() => {
        if (props.isGameplay)
            window.addEventListener("click", mouseClickHandler)
        return () => window.removeEventListener("click", mouseClickHandler)
    }, [props.isGameplay])

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler)
        return () => window.removeEventListener('mousemove', mouseMoveHandler)
    }, [])

    return (
        <div className='weapon'>
            <img className='weapon__sight' src={sightImg}
                style={{
                    position: 'absolute',
                    left: state.position.x,
                    top: state.position.y,
                    animationName: state.isShot ? 'efficiency' : null,
                    animationDuration: `${state.weapon.timeBetweenShots}s`
                }}
            />
            <img src={weaponImg} alt="" className="weapon__type" />
            <div className='weapon__cartridges'>
                {[...cartridgesImgArr]}
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
    weapon: { type: 1, timeBetweenShots: 0.2 },
    cartridges: null
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
            return { ...state, cartridges: getQuantityCartridges(state.weapon.type) }
        case 'readyToShoot':
            return { ...state, isShot: false }
        case 'setWeaponType':
            if (!state.cartridges)
                return { ...state, weapon: action.weapon }
            return { ...state, weapon: action.weapon }
        case 'setCartridges':
            return { ...state, cartridges: getQuantityCartridges(state.weapon.type) }

        default: return state
    }
}


