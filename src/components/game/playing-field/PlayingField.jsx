import Target from "./target/Target"
import { useState } from 'react';

const PlayingField = (props) => {

    return (
        <div className="playing-field">
            {props.enemies.map(e => (
                <Target key={e.id} x={e.x} y={e.y} strength={e.strength}
                    isActive={e.isActive} addPoints={props.addPoints}
                    isGameplay={props.isGameplay} level={props.level} loss={props.loss} />
            ))}
            <div className="playing-field__floor floor">
                <div className='floor__block'></div>
            </div>

        </div>
    )
}

export default PlayingField