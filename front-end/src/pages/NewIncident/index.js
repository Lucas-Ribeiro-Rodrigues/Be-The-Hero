import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logoImg from "../../assets/logo.svg";
import {Link, useHistory} from "react-router-dom";
import api from "../../services/API";

export default function NewIncident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    async function handleRegister(event) {
        alert("hey")
        event.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: localStorage.getItem("ongId")
                }
            })

            history.push('/profile')
        } catch (e) {
            alert("Erro ao cadastrar o caso, por favor tente novamente")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça o cadastro do seu caso e ajude as pessoas a encontrá-lo</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para a home
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}