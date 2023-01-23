import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import List from './pages/List';
import Create from './pages/Create';
import Detail from './pages/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {index: true, element: <Home/> },
            {path: 'list/:departure/:arrival', element: <List/>},
            {path: 'create/:departure/:arrival', element: <Create/>},
            {path: 'detail/:meetId', element: <Detail/>}
        ]
    }
])
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
