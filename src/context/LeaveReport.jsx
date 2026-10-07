import React from 'react'
import { createPortal } from 'react-dom';
import { addDoc, collection ,getDocs , updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from './Modal';


function LeaveReport({employees }) {

  // const [leaves, setLeaves] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);
  const [open , setOpen] = React.useState(false);
  const [empLeave , setEmpLeave] = React.useState([]);
  const [count, setCount] = React.useState(0);

  
  const today = new Date();

  const [empId, setEmpId]= React.useState("");
  const [requestDate , setRequestDate] = React.useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  const [startDate , setStartDate] = React.useState("");
  const [endDate , setEndDate] = React.useState("");
  const [note , setNote] = React.useState("");
  const [status , setStatus] = React.useState("Pending");
  const [filled , setFilled] = React.useState(false);



  const handleSubmit = async () =>{
    // e.preventDefault();
    // const f =( (empId != "") && (startDate != "") && (endDate != ""));
    // setFilled(f)

    // setRequestDate(new Date().toISOString().split("T")[0]);
  // setRequestDate( `${today.getFullYear()}-${
  //   today.getMonth() + 1
  // }-${today.getDate()}`);

( await addDoc(collection (db, "Leave") , {
      empId: empId,
      requestDate: requestDate,
      startDate: startDate,
      endDate: endDate,
      status: status,
      note: note
    }),
      
    console.log("Leave added:"),
    console.log(empId , requestDate , startDate , endDate , status ,note),
    
    // React.useEffect(() => {
      setOpen(false),
    // })
    // // To clear form
    setEmpId(""),
    setRequestDate(""),
    setStartDate(""),
    setEndDate(""),
    setNote(""),
    setRequestDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),

    setCount(prev => prev +1)
)

  }


  React.useEffect(() => {
    const fetchEmployees = async () => {
        const querySnapshot = await getDocs(collection(db, "Leave"));
    
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        setEmpLeave(data);
      };
     fetchEmployees();
 },[count])


  return (
    <>
    {console.log("Rendered")}
    <div className="bg-white rounded-lg  shadow">
      <table className="data-table" >
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-center min-w-auto">Emp ID</th>
            <th className="p-4 text-center min-w-auto">Start Date</th>
            <th className="p-4 text-center min-w-auto">End Date</th>
            <th className="p-4 text-center min-w-auto">Status</th>
            <th className="p-4 text-center min-w-auto">Approver</th>
            <th className="p-4 text-center min-w-auto">Request Date</th>
            <th className="p-4 text-center min-w-auto">Notes</th>
          </tr>
        </thead>

        <tbody>
          {empLeave.map((leave) => (
            <tr key={leave.id} className="border-b center">
              <td className="p-4 text-center min-w-auto">{leave.empId}</td>
              <td className="p-4 text-center min-w-auto">{leave.startDate}</td>
              <td className="p-4 text-center min-w-auto">{leave.endDate}</td>
              <td className="p-4 text-center min-w-auto">{leave.status}</td>
              <td className="p-4 text-center min-w-auto">{leave.approver}</td>
              <td className="p-4 text-center min-w-auto">{leave.requestDate}</td>
              <td className="p-4 text-center min-w-auto">{leave.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary align-left' onClick={() => setOpen(true)}> Add New</button>




  <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="text-shadow-white w-120 fixed inset-0 z-9999 rounded-4xl bg-slate-600 grid place-items-center h-fit opacity-95  top-1/8  left-2/6  shadow-2xl shadow-gray-900">
          
            <div className="border-b p-4 "  >
            <h2 className="text-xl font-semibold">
              Add Leave Request
            </h2>
          </div>
          <div className="form-group text-white">
            <label className="text-white">Select Employee Profile*</label>
            <select value={empId} onChange={(e) => setEmpId(e.target.value)} required>
              <option value="">Choose a profile...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.employeeId}>{emp.name}</option>
                // <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
              
              ))}
            </select>

          </div>
          <div className="p-5 text-shadow-white  ">
            <div className="grid grid-cols-2 gap-4">
              <label className='text-shadow-white'>start Date*</label> 
              <label className='text-shadow-white'>End date*</label>
              <input
                type="date"
                className="border rounded-md p-2 text-shadow-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <input
                type="date"
                className="border rounded-md p-2 text-shadow-white"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <textarea
              rows={4}
              className="w-full border rounded-md p-2 mt-4 bg-amber-50 text-shadow-white"
              placeholder="Notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}

            />
          </div>

          <div className="border-t p-4 flex justify-end gap-3 text-shadow-white">
            <button
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button className="btn btn-primary"   onClick={handleSubmit}  >
              Save
            </button>
          </div>
        </div>
      </Modal>
        

{/* {open && createPortal(
    <div className="float-left fixed inset-0 z-9999 flex items-center justify-center bg-yellow-400">
      <div className="w-162 rounded-xl bg-white shadow-2xl">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">
            Add Leave Request
          </h2>
        </div>

        <div className="p-5 space-y-4">
          <input
            type="date"
            className="w-full border rounded-md p-2"
          />

          <input
            type="date"
            className="w-full border rounded-md p-2"
          />

          <textarea
            placeholder="Notes"
            className="w-full border rounded-md p-2"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 p-5 border-t">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button className="btn btn-primary" onClick={() => setOpen(false)}>
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  // <div className="float-left inset-0 flex items-center justify-center z-1 border-black">
)} */}


    </div>
    </>
  )
}

export default LeaveReport













 

  
    // <div className="min-h-screen bg-gray-100">
    //   <div className="h-1 bg-blue-600" />

    //   <div className="p-6">
    //     <div className="flex items-center gap-3 mb-6">
    //       <h1 className="text-3xl font-semibold text-gray-800">
    //         My Leaves
    //       </h1>
    //       <Search size={20} className="text-gray-500" />
    //     </div>

    //     <div className="flex gap-3 mb-6">
    //       {["All Types", "All Status", "All Dates"].map((item) => (
    //         <button
    //           key={item}
    //           className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full text-gray-600"
    //         >
    //           {item}
    //         </button>
    //       ))}
    //     </div>

    //     <div className="bg-white border rounded overflow-hidden">
    //       <table className="w-full text-sm">
    //         <thead className="bg-gray-50 border-b">
    //           <tr className="text-left text-gray-700">
    //             <th className="px-4 py-4">ID</th>
    //             <th className="px-4 py-4">Requested</th>
    //             <th className="px-4 py-4">Start Date</th>
    //             <th className="px-4 py-4">End Date</th>
    //             <th className="px-4 py-4">Days</th>
    //             <th className="px-4 py-4">Type</th>
    //             <th className="px-4 py-4">Status</th>
    //             <th className="px-4 py-4">Approver</th>
    //             <th className="px-4 py-4">Notes</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {rows.map((row) => (
    //             <tr key={row.id} className="border-b">
    //               <td className="px-4 py-4 underline">{row.id}</td>
    //               <td className="px-4 py-4">{row.requested}</td>
    //               <td className="px-4 py-4">{row.start}</td>
    //               <td className="px-4 py-4">{row.end}</td>
    //               <td className="px-4 py-4">{row.days}</td>
    //               <td className="px-4 py-4">{row.type}</td>
    //               <td
    //                 className={`px-4 py-4 underline ${
    //                   statusColor[row.status]
    //                 }`}
    //               >
    //                 {row.status}
    //               </td>
    //               <td className="px-4 py-4">{row.approver}</td>
    //               <td className="px-4 py-4">{row.notes}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    //   <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
    //     <div className="w-[580px] bg-white rounded-xl overflow-hidden shadow-2xl">
    //       <div className="bg-blue-600 text-white px-6 py-5 flex items-center justify-center relative">
    //         <h2 className="text-2xl font-medium">Leave Request</h2>

    //         <button className="absolute right-5">
    //           <X size={26} />
    //         </button>
    //       </div>

    //       <div className="border-b">
    //         <div className="flex px-5">
    //           <button className="px-5 py-4 text-gray-900 border-b-2 border-blue-500 font-medium">
    //             Leave
    //           </button>

    //           <button className="px-5 py-4 text-gray-400">
    //             Credit
    //           </button>
    //         </div>
    //       </div>

    //       <div className="p-5">
    //         <div className="grid grid-cols-2 gap-5">
    //           <div>
    //             <label className="text-xs text-gray-500">
    //               Start Date*
    //             </label>

    //             <div className="mt-1 relative">
    //               <input
    //                 type="text"
    //                 value="20/03/2023"
    //                 readOnly
    //                 className="w-full border rounded px-3 py-2 pr-10"
    //               />

    //               <Calendar
    //                 size={18}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    //               />
    //             </div>

    //             <div className="flex gap-5 mt-4 text-sm">
    //               <label className="flex items-center gap-2">
    //                 <input type="radio" checked readOnly />
    //                 Full
    //               </label>

    //               <label className="flex items-center gap-2">
    //                 <input type="radio" />
    //                 1st Half
    //               </label>

    //               <label className="flex items-center gap-2">
    //                 <input type="radio" />
    //                 2nd Half
    //               </label>
    //             </div>
    //           </div>

    //           <div>
    //             <label className="text-xs text-gray-500">
    //               End Date*
    //             </label>

    //             <div className="mt-1 relative">
    //               <input
    //                 type="text"
    //                 value="20/03/2023"
    //                 readOnly
    //                 className="w-full border rounded px-3 py-2 pr-10"
    //               />

    //               <Calendar
    //                 size={18}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    //               />
    //             </div>

    //             <div className="flex gap-5 mt-4 text-sm">
    //               <label className="flex items-center gap-2">
    //                 <input type="radio" checked readOnly />
    //                 Full
    //               </label>

    //               <label className="flex items-center gap-2">
    //                 <input type="radio" />
    //                 1st Half
    //               </label>

    //               <label className="flex items-center gap-2">
    //                 <input type="radio" />
    //                 2nd Half
    //               </label>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="border-t">
    //         <div className="px-5 py-3 font-medium text-gray-700">
    //           Notes
    //         </div>

    //         <div className="px-5 pb-5">
    //           <textarea
    //             rows={5}
    //             placeholder="Notes*"
    //             className="w-full border rounded resize-none p-3"
    //           />
    //         </div>
    //       </div>

    //       <div className="border-t p-5">
    //         <button className="bg-blue-600 text-white px-5 py-2.5 rounded">
    //           Send Request
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>