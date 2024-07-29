import React from 'react'
import styles from "../Header/Header.module.css"

function Header() {
  return (
    <div className={styles.header}>
        <h1 style={{color:"white"}}>To-Do List</h1>
        <h2 style={{color:"white"}}>Çağan Özsır</h2>
    </div>
  )
}

export default Header