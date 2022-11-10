import React, {PropsWithChildren, useState} from "react";
import sg from '../styles/Home.module.css'
import s from '../styles/Server.module.scss'
import Link from "next/link";

type ServerProps = {
  users: any,
};

const Server = (props: PropsWithChildren<ServerProps>):JSX.Element => {
  const {
    users
  } = props;

  const [name, setName] = useState('Name1');
  const [email, setEmail] = useState('em@mail.ru')

  const handleFOrmSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    const response = await fetch('https://gorest.co.in/public/v2/users', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ad715fb93e51e8c5e88f8b8cb2c3337d14f70a8a61b13a4efe605efc10130291',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target[0].value,
        email: e.target[1].value,
        gender: e.target[2].value,
        status: e.target[3].value,
      })
    });
  }

  console.log(users)

  return (
    <div className={sg.container}>
      <Link href={'/'} className={sg.link}>Static generation</Link>
      <main className={sg.main}>
        <h1 className={sg.title}>Изучаем Next.js, Server-side rendering</h1>
        <ul className={s.usersList}>
          {users.map((user) => (
            <li className={s.user} key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
        <form onSubmit={handleFOrmSubmit} className={s.form}>
          <label htmlFor="name" className={s.label}>User Name:</label>
          <input type="text" name="name" id="name" value={name} className={s.input} onChange={(e) => setName(e.target.value)}/>

          <label htmlFor="email" className={s.label} >User Email:</label>
          <input type="text" name="email" id="email" value={email} className={s.input} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="gender" className={s.label}>User Gender:</label>
          <input type="text" name="gender" id="gender" value={'female'} className={s.input}/>

          <label htmlFor="status" className={s.label}>User Status:</label>
          <input type="text" name="status" id="status" value={'active'} className={s.input}/>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const response = await fetch('https://gorest.co.in/public/v2/users', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ad715fb93e51e8c5e88f8b8cb2c3337d14f70a8a61b13a4efe605efc10130291',
    }
  });
  const users = await response.json();

  return {
    props: {users},
  }
};

export default Server;