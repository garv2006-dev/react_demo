import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './page/home';
import Demo from './page/demo';
import Contact from './page/contact';
import Header from './layout/header';
import Footer from './layout/footer';
import Login from './page/login';

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
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
