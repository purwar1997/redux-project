import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const users = useSelector(state => state.users);

  return (
    <section>
      <h2 className='text-2xl'>All users</h2>

      <ul className='mt-6 space-y-3'>
        {users.map(user => (
          <li className='text-purple-600' key={user.id}>
            <Link className='underline-offset-2 hover:underline' to={user.id}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
