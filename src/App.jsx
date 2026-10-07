
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Login_card from "./Login_card.jsx"
import { useEffect, useState } from "react";
import React from "react";
import { Routes, Route, createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Register from "./register.jsx";
import Front_img from "./front_img.jsx";
import AddEmployee from "./context/AddEmployee.jsx";
import CompanyStatus from "./context/CompanyStatus.jsx";
import EmployeeDetails from "./context/EmployeeDetails.jsx";
import RemoveEmployee from "./context/RemoveEmployee.jsx";
import Sidebar from "./context/Sidebar.jsx";

import { db } from "./firebase.js";     // database
import { getDocs , collection, doc, deleteDoc } from "firebase/firestore";
import LeaveStatus from "./context/LeaveReport.jsx";
import LeaveReport from "./context/LeaveReport.jsx";

function App() {
  const [newAccount, setNewAccount] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  // const router = createBrowserRouter([
  //   {
  //     path: "/Homepage" ,
  //     element: <Homepage />
  //   }
  // ])


    const[active, setActive] = useState("details");

    // Hook your API states directly into these array handles
    // const [systemMetrics, setSystemMetrics] = useState({}); 
      
    const [employees, setEmployees] = useState([]); 
      
      
    // React.useEffect(() => {
        const fetchEmployees = async () => {
        const querySnapshot = await getDocs(collection(db, "WhiteMouse"));
    
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        setEmployees(data);
      };
    
    //   fetchEmployees();
    // }, []);
    useEffect(()=>{fetchEmployees();},[]);
    
      // const handleAddEmployee = (newEmployeeData) => {
      //   console.log("Connect to your API POST endpoint with:", newEmployeeData);
      // };
    
      // const handleRemoveEmployee = (employeeId) => {
      //   console.log("Connect to your API DELETE endpoint using ID:", employeeId);
      // };
    const [remove ,setRemove ] = useState('');

    React.useEffect(() => {
      (remove !== '') && ( deleteDoc(doc(db , "WhiteMouse" , remove)));
      
      setEmployees(prev =>
        prev.filter(emp => emp.id !== remove)
      );
      console.log("removed");
      setRemove('');
      setActive('details');
    }, [remove]);
    

    useEffect(() => {
      if (active === "details") {
        fetchEmployees();
      }
    }, [active]);
    // React.useEffect (() => {setEmployees(prev => prev.filter(emp => emp.id !== remove) )}, [remove]);

    const [update , setUpdate] = useState(null);

    // const update = null;// useEffect(() => { if (active  === 'add') {setUpdate(null);}}, [active]);


  return(

    <>
    

     {
      !authorized?
        <>
          <Header/>
          {newAccount ? <Register /> : (<>  <Front_img />     <Login_card  newAccount={newAccount} setNewAccount={setNewAccount}  setAuthorized={setAuthorized} /> </>) }
          <Footer/>
        </> 
      : 
      <div className="app-container">

            <Sidebar employees={employees} setEmployees={setEmployees} active={active} setActive={setActive} setUpdate={setUpdate} remove={remove}/>
        
            <main className="main-content" >
                {/* <button className="hide_side">hide</button> */}
                <header className="content-header">
                    <h1 >{active.replace(/([A-Z])/g, ' $1')} Portal</h1>
                    <p>Manage portal operations and structural views.</p>
                </header>
        
                <div className="view-panel">
                    {active === 'details' &&  <EmployeeDetails  employees={employees} setUpdate={setUpdate} setActive={setActive}  />}
                    {/* {active === 'details' && <EmployeeDetails update={update} setActive={setActive}  />} */}
                    {active === 'add'     && <AddEmployee  update={update}  setActive={setActive}/> }
                    {/* {update !== null  && setUpdate(null)} */}
                    {active === 'remove'  && <RemoveEmployee employees={employees} setRemove={setRemove} />}
                    {active === 'status'  && <CompanyStatus/>}
                    {active === 'leave' && <LeaveReport employees={employees} />}
                </div>
            </main>
        </div>
     }
    



    </>
  )
}

export default App
