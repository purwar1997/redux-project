import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import PostsList from './pages/PostsList';
import AddPostForm from './pages/AddPostForm';
import SinglePostPage from './pages/SinglePostPage';
import EditPostForm from './pages/EditPostForm';
import UsersList from './pages/UsersList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<PostsList />} />

      <Route path='posts'>
        <Route path='add' element={<AddPostForm />} />
        <Route path=':postId' element={<SinglePostPage />} />
        <Route path=':postId/edit' element={<EditPostForm />} />
      </Route>

      <Route path='users'>
        <Route index element={<UsersList />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
