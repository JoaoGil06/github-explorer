import React, { useState, useEffect, FormEvent } from 'react'
import api from '../../services/api'

import { Link } from 'react-router-dom'

import { Title, Form, Repositories, Error } from './styles'
import logoImg from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi'

import {DebounceInput} from 'react-debounce-input';

interface Repository {
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
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
          <img src={repository.owner.avatar_url}
          alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>

          <FiChevronRight size={20} />
      </Link>
        ))}



      </Repositories>
    </>
  )
}

export default Dashboard
