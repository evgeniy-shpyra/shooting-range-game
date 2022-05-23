import preloader from '../../images/Preloader.svg'
import "./../../scss/preloader.scss";

const Preloader = (props) => {
    
    return (
        <div className='preloader'>
            <img src={preloader} alt="" />
        </div>
    )
}

export default Preloader