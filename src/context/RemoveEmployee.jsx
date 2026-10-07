import React, { useState } from 'react';
import { db } from '../firebase';
import { getDocs, doc  , collection } from 'firebase/firestore';


export default function RemoveEmployee({ employees , setRemove }) {
  const [selectedId, setSelectedId] = useState('');


  // const [employees, setEmployees] = React.useState([]); 
  
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
  

  const handleTermination = () => {
    if (selectedId) {
      setRemove(selectedId);
      // setSelectedId('');
      console.log(selectedId);
    }
  };

  return (
   

    <div className="form-container"> {console.log("Rendered")}
      <div className="warning-box">
        <strong>Warning:</strong> Offboarding an employee profile will permanently revoke system access rights.
      </div>
      <div className="form-group">
        <label>Select Employee Profile</label>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Choose a profile to terminate...</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
            // <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>

          ))}
        </select>
      </div>
      <button 
        type="button" 
        onClick={handleTermination}
        disabled={!selectedId}
        className="btn btn-danger"
        // style={{width : "120px"}}
      >
        Deactivate Account
      </button>
    </div>
  );
}