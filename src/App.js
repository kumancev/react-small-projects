import { useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useEffect } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers]  = useState([])
  const [invites, setInvites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      })
      .catch(err => {
        console.err(err)
        alert('Ошибка при получении пользователей!')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
        ) : (
          <Users 
            items={users} 
            isLoading={isLoading} 
            searchValue={searchValue} 
            onChangeSearchValue={onChangeSearchValue} 
            invites={invites}
            onClickInvite={onClickInvite}
            onClickSendInvites={onClickSendInvites}
          />
      )}
    </div>
  );
}

export default App;