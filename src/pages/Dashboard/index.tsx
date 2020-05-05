import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { Title, Form, Repositories } from './styles'
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digita o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="">
            <img src="https://avatars0.githubusercontent.com/u/33355337?s=460&u=3c357e3a6e02e6aefbfe745db0a1af594f9906d7&v=4"
            alt="João Gil" />
            <div>
              <strong>Repositório 01</strong>
              <p>Descrição Repositório</p>
            </div>

            <FiChevronRight size={20} />
        </a>

        <a href="">
            <img src="https://avatars0.githubusercontent.com/u/33355337?s=460&u=3c357e3a6e02e6aefbfe745db0a1af594f9906d7&v=4"
            alt="João Gil" />
            <div>
              <strong>Repositório 01</strong>
              <p>Descrição Repositório</p>
            </div>

            <FiChevronRight size={20} />
        </a>

        <a href="">
            <img src="https://avatars0.githubusercontent.com/u/33355337?s=460&u=3c357e3a6e02e6aefbfe745db0a1af594f9906d7&v=4"
            alt="João Gil" />
            <div>
              <strong>Repositório 01</strong>
              <p>Descrição Repositório</p>
            </div>

            <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard
