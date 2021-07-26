import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Container} from './styles';
import Logo from '../../assets/logo.svg';
import {useAuth} from "../../hooks/auth";
import {FiLogOut} from "react-icons/fi";

const Header: React.FC = () => {
    const {signOut} = useAuth();

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <Container>
            <header>
                <img src={Logo} alt="Tax Stocks" width={120}/>
                <nav>
                    <Link className={splitLocation[1] === "dashboard" ? "active" : ""} to="/">Calculadora DARF</Link>
                    <Link className={splitLocation[1] === "import" ? "active" : ""} to="/import">Importar Notas</Link>

                    <Link to="#" onClick={signOut}>
                        <FiLogOut/>
                    </Link>
                </nav>
            </header>
        </Container>
    )
};

export default Header;
