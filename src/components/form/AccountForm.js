import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';

const AccountForm = () => {

    const { isFormOpen, toggleForm } = useContext(commonContext);
    const { inputValues, handleInputValues, handleFormSubmit } = useForm();

    const formRef = useRef();

    useOutsideClose(formRef, () => {
        toggleForm(false);
    });

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);


    // Signup-form visibility toggling
    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
    };


    return (
        <>
            {
                isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>

                                {/*===== Form-Header =====*/}
                                <div className="form_head">
                                    <h2>{isSignupVisible ? 'Inscribirse' : 'Acceso'}</h2>
                                    <p>
                                        {isSignupVisible ? '¿Ya tienes una cuenta?' : 'Crear una cuenta'}
                                        &nbsp;&nbsp;
                                        <button type="button" onClick={handleIsSignupVisible}>
                                            {isSignupVisible ? 'Acceso' : 'Crear una cuenta'}
                                        </button>
                                    </p>
                                </div>

                                {/*===== Form-Body =====*/}
                                <div className="form_body">
                                    {
                                        isSignupVisible && (
                                            <div className="input_box">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="input_field"
                                                    value={inputValues.username || ''}
                                                    onChange={handleInputValues}
                                                    required
                                                />
                                                <label className="input_label">Nombre de usuario</label>
                                            </div>
                                        )
                                    }

                                    <div className="input_box">
                                        <input
                                            type="email"
                                            name="mail"
                                            className="input_field"
                                            value={inputValues.mail || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Correo electrónico</label>
                                    </div>

                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="password"
                                            className="input_field"
                                            value={inputValues.password || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Contraseña</label>
                                    </div>

                                    {
                                        isSignupVisible && (
                                            <div className="input_box">
                                                <input
                                                    type="password"
                                                    name="conf_password"
                                                    className="input_field"
                                                    value={inputValues.conf_password || ''}
                                                    onChange={handleInputValues}
                                                    required
                                                />
                                                <label className="input_label">Confirmar contraseña</label>
                                            </div>
                                        )
                                    }

                                    <button
                                        type="submit"
                                        className="btn login_btn"
                                    >
                                        {isSignupVisible ? 'Inscribirse' : 'Acceso'}
                                    </button>

                                </div>

                                {/*===== Form-Footer =====*}
                                <div className="form_foot">
                                    <p>or login with</p>
                                    <div className="login_options">
                                        <Link to="/">Facebook</Link>
                                        <Link to="/">Google</Link>
                                        <Link to="/">Twitter</Link>
                                    </div>
                                </div>

                                {/*===== Form-Close-Btn =====*}
                                <div
                                    className="close_btn"
                                    title="Close"
                                    onClick={() => toggleForm(false)}
                                >
                                    &times;
                                </div>*/}

                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;