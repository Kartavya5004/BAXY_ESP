import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { getDoc, doc , collection } from "firebase/firestore";

function Login_card({ newAccount, setNewAccount , authorized , setAuthorized}){
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [noName, setNoName] = React.useState("");
    const [login, setLogin] = React.useState("");
    const [user, setUser] = React.useState("");


    // const [authorized, setAuthorized] = React.useState();
    // const [newAccount, setNewAccount] = React.useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("https://dummyjson.com/c/fe6e-6e50-4e20-b90c");

        const snapshot = await getDoc(doc(db, "ADMIN", "Admin"));

            const data = snapshot.data();
                // console.log(response.status);

        // const data = await response.Admin.json();

        if(username == "" || password == ""){setNoName(true);}
        else{setNoName(false);}
        
        const userExists = (
          data.UserName === username && data.Password === password
        );
        setAuthorized(userExists);
        if(userExists){console.log("entered")}
        setLogin(userExists);
    }

    
    return(
        <div className="Card">
            <h1>Log Yourself In</h1>
            <br/>
            {/* <h2>to continue exploring!!</h2> */}
            {noName === true && (<p style={{color: "red" , textShadow: "0 0 3px #f25d13"}}> Enter the username or password. </p> )}
            {noName === false && login === false && <p style={{color: "red" , textShadow: "0 0 3px #f25d13"}}>Invalid Username or Passwor!!</p>}
            <table style={{margin: "auto"}}>
                <tbody>
                <tr>
                    <th>Username:</th>
                    <td>
                        <input name="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
                    </td>
                    
                </tr>
                <tr>
                    <th>Password:</th>
                    <td>
                        <input name="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                    </td>
                </tr>
                </tbody>
            </table>
            <a href="#" onClick={()=>{setNewAccount(true)}}  style={{flex: "right", left: "220px",  color: "#48abf6"}}>new user!! register here!!</a>
            {noName === false && login === false && (<a  href=""  style={{paddingLeft: "300px",  color: "#48abf6"}}>forget password?</a> ) }
            <br></br><br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login_card 