import React from 'react'
import { addDoc, collection ,getDocs , updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';


function EmployeeDetails( {employees , setUpdate , setActive} ) {
//     const response = await fetch(
//   "https://database-d04fb-default-rtdb.firebaseio.com/users.json"
// );

// const data = await response.json();

// console.log(data);
    // const [update , setUpdate] = React.useState("");
//     const [employees, setEmployees] = React.useState([]); 

// React.useEffect(() => {
//       const fetchEmployees = async () => {
//     const querySnapshot = await getDocs(collection(db, "WhiteMouse"));

//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setEmployees(data);
//   };

//   fetchEmployees();
// }, []);



  return (
    <>
        <section className="coverDetail rounded-4xl">
            <div className="panel-header-row">
                <h3>Active Profiles</h3>
                <span className="badge">{employees.length} Total</span>
            </div>
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id} >
                                <td className="text-mono cursor-pointer text-red-700"><span onClick={() => {setUpdate(emp) , setActive("add")} } >{emp.employeeId}</span></td>
                                <td><strong>{emp.name}</strong></td>
                                <td>{emp.role}</td>
                                <td>{emp.department}</td>
                                <td>{emp.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </>
  ) 
}   

export default EmployeeDetails



//() => setUpdate(emp.id)