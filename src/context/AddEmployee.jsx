import React from 'react'
import { db } from '../firebase';
import { addDoc, collection ,getDocs, updateDoc, doc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

function AddEmployee({update , setActive}) {

  const[name, setName] = React.useState("");
  const[employeeId, setEmployeeId] = React.useState("");
  const[role, setRole] = React.useState("");
  const[department, setDepartment] = React.useState("");
  const[contact , setContact] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[cpassword, setCpassword] = React.useState("");
  const[samep , setSamep] = React.useState(false);


  const [employees, setEmployees] = React.useState([]); 

//  setUpdate(null);


  React.useEffect(() => {
  if (update !== null) {
    setContact(update.contact);
    setDepartment(update.department);
    setName(update.name);
    setEmployeeId(update.employeeId);
    setRole(update.role);
    setPassword(update.password)
  }
}, [update]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setPassword($(document.getElementsByName("password").value));
    // setCpassword($(document.getElementsByName("cpassword").value));

    // (password === cpassword) && password !== "" ? setSamep(true):setSamep(false);
    const passwordsMatch = password === cpassword && password !== "" ;
    
    // const formData = new FormData(e.target);
    // if (onAddSubmit) onAddSubmit(Object.fromEntries(formData.entries()));


  (passwordsMatch)?
    (await addDoc(collection (db, "WhiteMouse") , {
        name: name,
        employeeId: employeeId,
        role: role,
        department: department,
        contact: contact,
        password: password
      }),
        
      console.log("Employee added:"),
      console.log({ name,  employeeId,  role,  department,  contact,   password  }),

      // // To clear form
      setName(""),
      setEmployeeId(""),
      setRole(""),
      setDepartment(""),
      setContact(""),
      setPassword(""),
      setCpassword("")
      // setSamep(false)
    ) :( console.log("error") );

    // setEmployees(prev => prev.filter(emp => emp.id !== remove) );
    
    setActive('details');

  } 

  const handleUpdate = async(e) => {
    e.preventDefault();
    await updateDoc(doc(db, "WhiteMouse" , update.id) , {
        name: name,
        employeeId: employeeId,
        role: role,
        department: department,
        contact: contact,
        password: password
      })

      // // To clear form
      setName(""),
      setEmployeeId(""),
      setRole(""),
      setDepartment(""),
      setContact(""),
      setPassword(""),
      setCpassword(""),
      // setSamep(false)

      setActive('details')

  };


  return (
    <form className="form-container">

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={name} placeholder={ name } type="text" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input name="id" value={employeeId} type="text" onChange={(e) => setEmployeeId(e.target.value)} required />
        </div>
      </div>
      <div className="form-group">
        <label>Designation Role</label>
        <input name="role" value={role} type="text" onChange={(e) => setRole(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Department</label>
        <select name="dept" value={department} onChange={(e) =>{if(department === ''){e.preventDefault()}setDepartment(e.target.value)}}   required >
          <option value="" disabled>Select One</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Management</option>
        </select  >
      </div>
      <div className="form-group">
        <label>Contact</label>
        <input name="contact" value={contact} type="number" onChange={(e) => setContact(e.target.value)} required />
      </div>
      {password !== "" && !update && <p style={{color: "red" , textShadow: "0 0 3px #f25d13"}}>password mismatch!! </p>}
      <div className="form-group">
        <label>Create Password</label>
        <input name="password" value={password} type='password' onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input name="cpassword" value={cpassword} type='password' onChange={(e) => setCpassword(e.target.value)} required/>
      </div>
      {(!update)? (<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register New Employee</button>) : 
      (<button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update Employee</button>)
      }
    
    
    </form>
  )
}

export default AddEmployee