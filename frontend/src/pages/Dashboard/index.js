import React, {useEffect, useState} from 'react';
import api from '../../services/api';
/*facilita a criacao de links p n precisar criar o history.push */
import { Link } from 'react-router-dom';

import './styles.css';

export default function Dashboard(){
    /*melhor maneira de inicializar é com uma lista vazia */
    const [spots, setSpots] = useState([]);
    
    /*quando alguma variavel do array sofrer atualizacoes, a funcao ira ser executada */
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: {user_id}
            });
            
            setSpots(response.data);
        }
        
        loadSpots();
    }, []);
    
    /*primeira '{}' indica q quer incluir um codigo js dentro do html, a segunda indica q quer colocar um obj */
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}