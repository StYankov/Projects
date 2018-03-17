import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const no_user = require('../../Images/no-user.png');

const Header = () => (
    <div className="container-fluid">
        <header>
            <div className="logo">
                <span>CodeHistory</span>
            </div>

            <nav>
                <ul>
                    <li><NavLink to="/">Начало</NavLink></li>
                    <li><NavLink to="my">Мой кодове</NavLink></li>
                    <li className="dropdown">
                        <img className="user-avarat" src={no_user} />
                        <i className="fas fa-caret-down"></i>
                        <div className="dropdown-content">
                            <Link to="/login"><i class="fas fa-sign-in-alt"></i>Влез</Link>
                            <Link to="/register"><i class="fas fa-user-plus"></i>Регистрирай се</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
);

export default Header;