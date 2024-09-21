import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import  "./App.css"
import LandingPage from "./pages/landingPage";
import ViewPage from "./pages/viewPage";
import ApplyForm from "./pages/ApplyPage";
import LayoutAdmin from "./pages/AdminPages/layout";
import LayoutUser from "./pages/userLayout";
import AdminDash from "./pages/AdminDash";
import CreatePage from "./pages/AdminPages/createPage";
import EditPage from "./pages/AdminPages/editPage";
import ApplicantsPage from "./pages/AdminPages/ApplicantsPage";
import { AuthContextProvider } from "./context/authContext";



const routes = [
    {
        path: '/',
        element: <LayoutUser/>,
        children: [
            {path: '/', element: <LandingPage/>},
            {path: "/jobDetail/:id", element: <ViewPage/>},
            {path: '/jobDetail/apply/:id',element: <ApplyForm/>}
        ]
    },
    {
        path: '/',
        element: <AuthContextProvider>
            <LayoutAdmin/>
        </AuthContextProvider>,
        children: [
            {path: 'Dashboard/', element: <AdminDash/>},
            {path:'/CreateJob', element: <CreatePage />},
            {path: "/EditJob/:id", element: <EditPage/>},
            {path: "/Applicants/:id", element: <ApplicantsPage/>}
        ]
    },

]
const router = (
    <BrowserRouter>
        <Routes>
            {routes.map((route) =>(
                <Route key={route.path} path={route.path} element={route.element} >
                    {route.children.map((child) => (
                        <Route  key={child.path} path={child.path} element={child.element}/>
                    ))}
                </Route>
            ))}
        </Routes>
    </BrowserRouter>
);
const App =() =>{
  return router;
}

export default App;