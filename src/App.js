import { useEffect } from "react";
import insforge from "./insforge";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from './page/home';
import Demo from './page/demo';

import Contact from './page/contact';
import Header from './layout/header';
import Footer from './layout/footer';
import Login from './page/login';
import Register from './page/register';
import Feed from './page/feed';

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
        path: "/demo",
        element: <Demo />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/feed",
        element: <Feed />
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])



function App() {
  useEffect(() => {
    insforge.auth.getCurrentSession().then(({ data }) => {
      if (data?.session) {
        localStorage.setItem("token", data.session.accessToken);
        localStorage.setItem("user", JSON.stringify(data.session.user));
      }
    }).catch(console.error);
  }, []);

  return (
    <div className="App min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
