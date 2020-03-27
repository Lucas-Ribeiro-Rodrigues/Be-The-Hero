import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import './styles.css'

import api from "../../services/API";

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory()

    async function handleLogon(event) {
        event.preventDefault()

        try {
            const response = await api.post('ongs/session', {id})

            localStorage.setItem("ongId", id)
            localStorage.setItem("ongName", response.data.name)

            history.push("/profile")
        } catch (e) {
            alert("Não foi possível efetuar o logon, verifique os dados e tente novamente")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}/>
                    <button
                        type="submit"
                        className="button">Entrar</button>

                    <Link to="./register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
