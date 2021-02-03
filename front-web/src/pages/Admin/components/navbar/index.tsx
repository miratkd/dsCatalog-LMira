import Reach from 'react';
import './styles.scss';

const Navbar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li> <div className="admin-nav-item active"> Meus Produtos </div> </li>
            <li> <div className="admin-nav-item"> Minhas Categorias </div></li>
            <li> <div className="admin-nav-item"> Meus Usuarios </div></li>
        </ul>
    </nav>
);

export default Navbar;