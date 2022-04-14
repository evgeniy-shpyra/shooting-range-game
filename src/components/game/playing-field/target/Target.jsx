
const Target = (props) => {

    return (
        <div className='target'
            style={{
                position: 'relative',
                left: props.x,
                top: props.y
            }}>
            <div className='target__block'
                style={{
                    transform: `rotate3d(1,0,0, ${props.isActive ? 0 : 90}deg)`,
                }}
            >
            </div>
        </div>
    )
}

export default Target