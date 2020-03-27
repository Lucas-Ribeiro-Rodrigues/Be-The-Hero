import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from "react-router-dom";
import { FiPower } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'

import './styles.css'

import api from "../../services/API";

export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const ongName = localStorage.getItem("ongName")
    const ongId = localStorage.getItem("ongId")

    const history = useHistory()

    useEffect(() => {
        api.get("incidents/byOngId", {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (e) {
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    async function handleLogout() {
        localStorage.clear();

        history.push("/")
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link to='/incidents/new' className="button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={18} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
