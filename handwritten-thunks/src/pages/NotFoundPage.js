import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='mt-8 text-center'>
      <h2 className='text-5xl font-medium text-gray-600'>Page Not Found!</h2>

      <p className='mt-8 text-xl'>Sorry, we can't seem to find the page you were looking for.</p>

      <Link className='btn-link mt-9' to='/'>
        Go to homepage
      </Link>
    </section>
  );
};

export default NotFoundPage;
