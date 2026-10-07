import React from 'react';
import { useState } from 'react';


export default function Sidebar({employees ,setEmployees , active, setActive , setUpdate , remove}) {

    // const[active, setActive] = useState(false);
    const items = [
        { id: 'details', label: "Employee Details" },
        { id: 'add', label: "Add Employee" },
        { id: 'remove', label: "Remove Employee" },
        { id: 'status', label: "Company Status" },
        { id: 'leave' , label: "Leave Report"  },
    ];
    return (
        <section className="sidebar" >
            <div className="sidebar-brand">
                {/* <img className="brand-icon"  alt='img'/> */}
                <span className="brand-name" style={{paddingLeft: "0", fontSize:"35px" , fontWeight: "700" , letterSpacing: "0.4px", marginBottom: "20px"}}>BAXY</span><br/>
                <nav className='sidebar-nav'>
                    {items.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-button ${active === item.id ? "active" : ""}`}
                            onClick={() =>{  setUpdate(null) ;setActive(item.id) ;}}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="sidebar-footer">Employee Services Portal v1.0</div>
        </section>
    );
}