import styled from "styled-components"
import {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export default function SeatsPage({setInfo}) {
    const { idSession } = useParams()
    const navigate = useNavigate()
    const [chair, setChair] = useState([])
    const [movie, setMovie] = useState([])
    const [day, setDay] = useState([])
    const [time, setTime] = useState([])
    const [select, setSelect]= useState([])
    const [client, setClient] = useState()
    const [post, setPost] = useState(false)

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`
        axios.get(url)
        .then((res) => {
            setDay(res.data.day)
            setMovie(res.data.movie)
            setChair(res.data.seats)
            setTime(res.data.name);
            console.log("resposta",res.data)
        })
        .catch((err) => console.error(err))
    }, [idSession])

    useEffect(()=>{
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        if(post){
            axios.post(url, client)
            .then(res => {
                navigate("/buy-ticket")
                console.log("resposta do post",res)})
            .catch((err)=> console.log(err))
        }
        
    },[post, client, navigate])

    function selectSeats(item){
        if(!select.includes(item)&& item.isAvailable){
            const seats = [...select, item]
            setSelect(seats)
        console.log(seats)
        }else if(!item.isAvailable){
            alert("Este assento não está disponivel")
        }else{
            const seats = [...select].filter(el => el !== item)
            setSelect(seats);
        console.log(seats)
        }
    }
    function reserveSeat(e){

        e.preventDefault();

        const sendUser = {
            ids: select.map((el)=>(el.id)),
            name: client.user,
            cpf: client.cpf
        };
        
        const objectInfo = {
            nameFilm: movie.title,
            date: day.date,
            time: time,
            seats:select.map(item => item.name),
            client,
        };
        setClient(sendUser);
        setInfo(objectInfo);
        setPost(true);
        
        console.log(sendUser)
    }

    function clientName(e){
            setClient({
                user:e.target.value
            })
    }

    function clientDocument(e){
            console.log(e.target.value)
            setClient({...client, cpf: e.target.value})
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {chair.map((c)=>(
                    <SeatItem
                    data-test="seat"
                    onClick={()=> selectSeats(c)}
                    key={c.id}
                    className={select.includes(c)?"selecionado":(c.isAvailable===true?"disponivel":"indisponivel")}
                    >
                        {c.name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle className="selecionado"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="disponivel"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="indisponivel"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reserveSeat}>
                Nome do Comprador:
                <input data-test="client-name" onChange={clientName} type="name" required placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input data-test="client-cpf" onChange={clientDocument} required placeholder="Digite seu CPF..." pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"/>
                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {time}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;

    .selecionado{
        background: #1AAE9E;
        border: 1px solid #0E7D71;
    }
    .dispovivel{
        background: #C3CFD9;
        border: 1px solid #7B8B99;
    }
    .indisponivel{
        background: #FBE192;
        border: 1px solid #F7C52B;
    }
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    a{
        text-decoration: none;
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`