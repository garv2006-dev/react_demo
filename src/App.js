import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from './page/home';
import Demo from './page/demo';
import Contact from './page/contact';
import Header from './layout/header';
import Footer from './layout/footer';
import Login from './page/login';
import Register from './page/register';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

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
        element: <ProtectedRoute><Demo /></ProtectedRoute>
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
  },
  {
    path: "/register",
    element: <Register />
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
