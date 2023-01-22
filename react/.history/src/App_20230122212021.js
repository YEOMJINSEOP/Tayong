import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './components/header/header';

// const router = createBrowserRouter([
//   {
//     path: "/*",
//     element: <Home/>,
//     errorElement: <p>Error Page🐶</p>
//   },
//   {
//     path: "/list/*",
//     element: <List/>,
//     errorElement: <p>Error Page🐶: list</p>
//   },
//   {
//     path: "/create/*",
//     element: <Create/>,
//     errorElement: <p>Error Page🐶: create</p>
//   }
//   ,
//   {
//     path: "/detail/*",
//     element: <Detail/>,
//     errorElement: <p>Error Page🐶: detail</p>
//   }
// ])

function App() {

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default App;