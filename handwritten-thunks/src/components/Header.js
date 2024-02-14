import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-purple-600 h-20 px-20 flex justify-between items-center text-white'>
      <h1 className='text-3xl text-white font-medium'>
        <Link to='.'>Redux</Link>
      </h1>

      <nav className='space-x-9'>
        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='.'
        >
          Posts
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='posts/add'
        >
          Add Post
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='users'
        >
          Users
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='notifications'
        >
          Notifications
        </NavLink>
      </nav>

      <button className='bg-blue-500 px-5 py-2 rounded font-medium'>Refresh Notifications</button>
    </header>
  );
};

export default Header;
