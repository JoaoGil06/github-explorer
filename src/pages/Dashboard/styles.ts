import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px;
    color: #3a3a3a;
    border: 2px solid #FFF;

    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  select {
    padding: 0 10px 0 10px;
    margin: 0 10px 0 10px;
    border-radius: 5px;
    border: none;

    ${(props) => props.hasError && css`
      border: 2px solid #c53030;
    `}
  }

  button {
    width: 210px;
    height: 70px;
    background: #04D361;
    border-radius: 5px;
    border: 0;
    color: #FFF;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04D361')}
    }
  }
`;

export const Repositories = styled.div`

  margin-top: 80px;
  max-width: 700px;

  span {
    background: #FFF;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + span {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3D3D4D;
      }

      p {
        font-size: 18px;
        color: #A8A8B3;
        margin-top: 4px;
      }
    }

    .chevron, .trash {
      margin-left: auto;
      color: #CBCBD6;
      cursor: pointer;
    }

    .chevron:hover{
      color: #04D361;
    }

    .trash:hover {
      color: #c53030;
    }

    &:hover {
      transform: translateX(10px);
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`
