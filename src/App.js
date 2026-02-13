import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './page/home';
import Demo from './page/demo';
import Contact from './page/contact';
import Header from './layout/header';
import Footer from './layout/footer';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <Demo />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
