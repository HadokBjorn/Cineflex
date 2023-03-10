import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function HomePage() {
    const [poster, setPoster] = useState([]);

    useEffect(()=>{
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        axios.get(url)
        .then((res) => {
            setPoster(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    if(poster.length === 0){
        return(
            <PageContainer>
                <span className="loader"></span>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {poster.map((film)=>(
                    <Link to={`/movies/${film.id}`} key={film.id}>
                        <MovieContainer>
                            <img src={film.posterURL} alt="poster"/>
                        </MovieContainer>
                    </Link>
                    
                ))}
                
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;

    .loader {
        width: 48px;
        height: 48px;
        margin: auto;
        position: relative;
    }
    .loader:before {
        content: '';
        width: 48px;
        height: 5px;
        background: #000;
        opacity: 0.25;
        position: absolute;
        top: 60px;
        left: 0;
        border-radius: 50%;
        animation: shadow 0.5s linear infinite;
        }
        .loader:after {
        content: '';
        width: 100%;
        height: 100%;
        background: red;
        animation: bxSpin 0.5s linear infinite;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        }
    @keyframes bxSpin {
        17% {
        border-bottom-right-radius: 3px;
        }
        25% {
        transform: translateY(9px) rotate(22.5deg);
        }
        50% {
        transform: translateY(18px) scale(1, .9) rotate(45deg);
        border-bottom-right-radius: 40px;
        }
        75% {
        transform: translateY(9px) rotate(67.5deg);
        }
        100% {
        transform: translateY(0) rotate(90deg);
        }
    }

    @keyframes shadow {
        0%, 100% {
        transform: scale(1, 1);
        }
        50% {
        transform: scale(1.2, 1);
        }
    }
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`