import Target from "./target/Target"

const PlayingField = (props) => {
    
    return (
        <div className="playing-field">

           
            <Target x={100} y={100} isActive={props.enemies[0].isActive} />
            
            <div className='playing-field__field'>

            </div>
        </div>
    )
}

export default PlayingField