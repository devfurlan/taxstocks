import React from 'react';

import {Link} from 'react-router-dom';

import {Container} from './styles';

import Logo from '../../assets/logo.svg';
import {useAuth} from "../../hooks/auth";
import {FiLogOut} from "react-icons/fi";

const Header: React.FC = () => {
    const {signOut} = useAuth();

    return (
        <Container>
            <header>
                <img src={Logo} alt="Tax Stocks" width={120}/>
                <nav>
                    <Link to="/">Calculadora DARF</Link>
                    <Link to="/import">Importar Notas</Link>
                    <Link to="#" onClick={signOut}>
                        <FiLogOut/>
                    </Link>
                </nav>
            </header>
        </Container>
    )
};

export default Header;
