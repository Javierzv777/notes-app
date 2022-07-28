import React from 'react'
import logo from '../../assets/img/notebook.png'
import S from './Home.module.css'

export default function Home() {
  return (
    <div className={S.container}>
        <img src={logo} alt="logo" />
    </div>
  )
}
