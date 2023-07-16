import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './notFound';
import Contact from './contact';
import {
  Root,
  rootAction,
  rootLoader,
  contactLoader,
  contactEditAction,
} from './root';
import EditContact from './editContact';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: 'contact/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contact/:contactId/edit',
        element: <EditContact />,
        action: contactEditAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>
);
