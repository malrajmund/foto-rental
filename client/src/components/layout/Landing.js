import React from 'react'
import { Link } from 'react-router-dom';
import Offers from '../offers/Offers'

const Landing = () => {
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Najlepszy w Polsce sposób na wypożyczenie sprzętu Foto/Video</h1>
          <p className="lead">
            Zacznij zarabiac lorem ipsum
          </p>
          <div className="buttons">
            <Link to="/register">Rejestracja</Link>
            <Link to="/login">Logowanie</Link>
          </div>
        </div>
      </div>
      <Offers/>
    </section>
    )
}

export default Landing
