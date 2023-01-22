import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/header/header';


function App() {

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default App;