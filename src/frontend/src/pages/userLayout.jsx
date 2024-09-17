import { Outlet } from "react-router";
import  TopBar from "../components/topBar"


const LayoutUser=() => {
    return(
    <>
     <TopBar/>
     <Outlet/>
    </>
    
    )
}

export default LayoutUser