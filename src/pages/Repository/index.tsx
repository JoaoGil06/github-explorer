import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'


import { Header, RepositoryInfo, Issues } from './styles'
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>()

  return (
    <>
    <Header>
      <img src={logoImg} alt="Github Explorer" />
      <Link to="/">
        <FiChevronLeft size={16} />
        Voltar
      </Link>
    </Header>

    <RepositoryInfo>
      <header>
        <img src="https://avatars2.githubusercontent.com/u/33355337?v=4" alt="João Gil" />
        <div>
          <strong>joaogil06/budget</strong>
          <p>descrição</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>1808</strong>
          <span>Stars</span>
        </li>
        <li>
          <strong>48</strong>
          <span>Forks</span>
        </li>
        <li>
          <strong>67</strong>
          <span>Issues Abertas</span>
        </li>
      </ul>
    </RepositoryInfo>

    <Issues>
        <Link to="aaaa">

            <div>
              <strong>ddd</strong>
              <p>ssss</p>
            </div>

            <FiChevronRight size={20} />
        </Link>
    </Issues>
    </>
  )
}

export default Repository
