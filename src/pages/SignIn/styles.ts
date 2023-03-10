import { shade } from "polished";
import styled, { keyframes } from "styled-components";
import signInBackgroundImg from "../../assets/sign-in-background.png"

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

 form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
    
  button {
    background: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
    /* &:hover {
      background: ${shade(0.2, '#ff9000')}
    } */
  }
  a {
    color: #f3ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  }

  > a {
    color: #ff9000;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  }

`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

`;