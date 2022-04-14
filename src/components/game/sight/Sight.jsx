import { useState, useEffect } from 'react';
import sightPng from '../../../images/sight.png'
import game from './../../../logic/logic';

const Sight = (props) => {

    let [position, setPosition] = useState({ x: 100, y: 100 })


    const mouseMoveHandler = event => {
        console.log(`x: ${event.clientX}`)
        console.log(`y: ${event.clientY}`)
        setPosition({
            x: event.clientX - 50,
            y: event.clientY - 50
        })
    }

    const mouseClickHandler = event => {
        
        if(game.inclusionCheck(event.x, event.y)){
            
            props.killedEnemy()
        }
            
    }

    useEffect(() => {
        window.addEventListener("click", mouseClickHandler)
        return () => window.removeEventListener("click", mouseClickHandler)
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler)
        return () => window.removeEventListener('mousemove', mouseMoveHandler)
    }, [])




    return (
        <img className='sight' src={sightPng}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y
            }}
        />
    )
}

export default Sight