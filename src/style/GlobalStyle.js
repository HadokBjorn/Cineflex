import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	button {
		height: 43px;
		background: #E8833A;
		border-radius: 3px;
		border-style: none;
		font-family: 'Roboto';
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		padding: 0 20px;
		&:disabled {
			background-color: lightgray;
		}
	}
	input {
		background: #FFFFFF;
		border: 1px solid #D5D5D5;
		border-radius: 3px;
		height: 50px;
		margin-bottom: 25px;
		margin-top: 10px;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 18px;
		display: flex;
		align-items: center;
		&::placeholder{
			font-style: italic;
		}
		
	}
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

export default GlobalStyle