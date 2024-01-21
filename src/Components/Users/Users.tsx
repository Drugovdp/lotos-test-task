import React, { ChangeEvent, useEffect, useState } from 'react'

import './Users.css'

type TypePropsUsers = {
  birth_year: string,
  created: string,
  edited: string,
  eye_color: string
  films: string[],
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  name: string,
  skin_color: string,
  species: []
  starships: string[],
  url: string,
  vehicles: string[]
}

export const Users = () => {

  const [users, setUsers] = useState<TypePropsUsers[]>([])

  const [valueName, setValueName] = useState('')

  const [answer, setAnswer] = useState(false)

  const fetchUsers = () => {
    fetch('https://swapi.dev/api/people')
      .then(response => response.json())
      .then(data => setUsers(data.results))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueName(e.currentTarget.value.trim())
  }

  const onClickFilterHandler = () => {
    if (valueName.trim() !== '') {
      const filteredUsers = users.filter(el => el.name.toLowerCase() === valueName.toLowerCase())
      if (filteredUsers.length !== 0) {
        setUsers(filteredUsers)
        setAnswer(false)
      } else {
        setAnswer(!answer)
      }
      setValueName('')
    } else {
      console.log('error')
    }
  }

  const onClickAllItemsHandler = () => {
    fetchUsers()
    setAnswer(false)
  }

  const nameFilter = users.map((el, i) => {
    return (
      <tr key={i}>
        <td>{i}</td>
        <td>{el.name}</td>
        <td>{el.birth_year}</td>
        <td>{el.height}</td>
        <td>{el.mass}</td>
        <td>{el.hair_color}</td>
        <td>{el.url}</td>
      </tr>
    )
  })

  return (
    <div className='wrapper'>
      <div className='filterForm'>
        <label htmlFor="name">
          <h3>Введите имя</h3>
          <input id='name' type="text" value={valueName} onChange={onChangeHandler} placeholder='Введите имя' />
          <button onClick={onClickFilterHandler}>Найти</button>
        </label>
        <button onClick={onClickAllItemsHandler}>Показать весь список</button>
      </div>
      {answer && <div>Совпадений не найдено</div>}
      <table>
        <caption>USERS</caption>
        <thead>
          <tr>
            <th>N</th>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Рост</th>
            <th>Масса</th>
            <th>Цвет волос</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {nameFilter}
        </tbody>
      </table>
    </div>
  )
}
