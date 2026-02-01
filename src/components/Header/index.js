import './index.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='nav-bar-container'>
      <div className='title-with-list-container'>
        <h1 className='title'>Todos Dashboard</h1>
        <div className='form-list-container'>
          <Link className="link" to="/"> 
            <p className="header-sub-list">TodoList</p>
          </Link>
          <Link className="link" to="/forms">
            <p className="header-sub-list">Form</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
