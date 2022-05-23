import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import "./../../scss/menu.scss";
import Preloader from "./Preloader";

const isGapsAndUpperCase = (str) => {
    if (str === '')
        return true
    return !str.match(" ") && str.toLowerCase() === str
};


const Menu = ({ setUserData }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    const [isLoadingData, setIsLoadingData] = useState(null)
    const [formData, setFormData] = useState('')

    useEffect(() => {
        setUserData(null)
        setIsLoadingData(null)
    }, [])

    useEffect(() => {
        if (formData) {
            setIsLoadingData(false)
            axios.get(`https://api-shooter-game.herokuapp.com/api/user/${formData}`).then(({ data, status }) => {
                if (data.length === 0) {
                    axios.post(`https://api-shooter-game.herokuapp.com/api/user`, { nickname: formData })
                        .then((response) => {
                            if (response.status === 200) {
                                setUserData(...response.data)
                                setIsLoadingData(true)
                            }
                        })
                }
                else {
                    if (status === 200) {
                        setUserData(...data)
                        setIsLoadingData(true)
                    }
                }
            })
        }
    }, [formData])

    const onSubmit = data => {
        setFormData(data.nickname)
    }

    if (isLoadingData)
        return <Navigate to='/game' />

    return (
        <div className='menu'>
            <div className="menu__body">
                <div className="menu__content">
                    <h1 className="menu__title">Shooting gallery</h1>
                    <form className="menu__form" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("nickname", {
                                required: 'This field is required',
                                maxLength: {
                                    value: 15,
                                    message: 'No more than 15 characters',
                                },
                                validate: isGapsAndUpperCase
                            })}
                            className={errors.nickname ? "menu__input menu__input_error" : "menu__input"}
                            type="text"
                            placeholder="Nickname"
                        />
                        {/* {errors.nickname && <span className="menu__error">{errors.nickname.message}</span>} */}
                        <div className="menu__container-btn">
                            <button className="btn" type="submit">Play</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoadingData === false && <Preloader />}
            
        </div>
    );
};

export default Menu;
