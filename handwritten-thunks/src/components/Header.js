import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>
        <Link to='.'>Redux</Link>
      </h1>

      <nav>
        <NavLink to='.'>Posts</NavLink>
        <NavLink to='posts/add'>Add Post</NavLink>
        <NavLink to='users'>Users</NavLink>
        <NavLink to='notifications'>Notifications</NavLink>
      </nav>

      <button>Refresh Notifications</button>
    </header>
  );
};

export default Header;
