import React, { useState, useEffect, FormEvent } from 'react'
import api from '../../services/api'

import { Link } from 'react-router-dom'

import { Title, Form, Repositories, Error } from './styles'
import logoImg from '../../assets/logo.svg';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi'

import {DebounceInput} from 'react-debounce-input';

interface Repository {
  id: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface AllRepositories {
  name: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('')

  const [newUser, setNewUser] = useState('');

  const [newRepo, setNewRepo] = useState('')
  const [allRepositories, setAllRepositories] = useState<AllRepositories[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

    if(storagedRepositories) {
      return JSON.parse(storagedRepositories)
    } else {
      return []
    }
  })

  useEffect( () =>  {

    async function getAllRepositories() {
      const response = await api.get<AllRepositories[]>(`users/${newUser}/repos`)
      const userRepositories = response.data

      setAllRepositories(userRepositories)
    }

    getAllRepositories()

  }, [newUser])

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])


  async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if(!newUser) {
      setInputError('Digita o autor/nome do utilizador')
      return;
    }

    if(!newRepo) {
      setInputError('Seleciona um repositório')
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newUser}/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setNewUser('')
      setInputError('')
    }catch(err) {
      setInputError('Erro na pesquisa do repositório')
    }
  }

  function handleRemoveRepository(id: string): void {
    const repository = repositories.findIndex((rep) => rep.id === id);

    if(repository >= 0) {
      repositories.splice(repository, 1)

      localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }

    setRepositories(repositories.filter((rep) => rep.id !== id));
  }


  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>

      <DebounceInput
          minLength={2}
          debounceTimeout={400}
          value={newUser}
          onChange={ (e) => setNewUser(e.target.value)}
          placeholder="Digita o nome do user" />

      <select
        value={newRepo}
        onChange={ (e) => setNewRepo(e.target.value)}>
        <option value="">Seleciona o Repositório</option>
        {allRepositories.map(repository => (
          <option key={repository.id} value={repository.name}>{repository.name}</option>
        ))}
      </select>

      <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error> }



      <Repositories>
        {repositories.map(repository => (
          <span key={repository.full_name} >
            <img src={repository.owner.avatar_url}
            alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <Link to={`/repositories/${repository.full_name}`}>
              <FiChevronRight size={20} className={"chevron"} />
            </Link>

            <FiTrash2 size={20} className={"trash"} onClick={() => handleRemoveRepository(repository.id)} />
          </span>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
