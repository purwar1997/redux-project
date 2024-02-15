import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className='w-2/3 mx-auto my-20 text-center'>
      <h2 className='text-4xl font-medium'>Oops, an unexpected error had occurred.</h2>

      {error.message && <p className='mt-8 text-lg'>{error.message}</p>}

      <Link className='btn-link mt-9' to={-1}>
        Back to previous page
      </Link>
    </section>
  );
};

export default ErrorPage;
