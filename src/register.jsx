import React,{useState} from 'react'
import "./register.css"

function Register() {
      const [gender, setGender] = useState("");
  return (

    <>
    <section className='s1' >
      <br/><h1 align="center">REGISTER here!!</h1><br/>

    <form name="Login" >
        <table className="registerTable" align="center" >
          <tbody>
          <tr>
          <th>Username:</th>
            <td><input type="text" placeholder="Enter the username"/><br/></td>
          </tr>
          <tr>
           <th>First name:</th>
           <td><input type="text" placeholder="firstName here"/><br/></td>
          </tr>
          <tr>
           <th>Last name:</th>
            <td><input type="text" placeholder="lastName here"/><br/></td>
          </tr>
          <tr>
            <th>E-mail:</th>
            <td><input type="email" placeholder="email for verification"/><br/></td>
          </tr>

          <tr>
            <th>Mobile number:</th>
            <td><input type="number" placeholder="mobile number"/></td>
          </tr>

          <tr>
            <th>Gender:</th>
            <td>
               <label><input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)}/> Male</label>
               <label><input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)}/> Female</label>
            </td>
          </tr>
          <tr>
            <th>Birth:</th>
            <td><input type="date"/></td>
          </tr>
          <tr>
            <th>Create Password:</th>
            <td><input type="password" placeholder="Create a Password"/></td>
          </tr><tr>
            <th>Confirm Password:</th>
            <td><input type="password" placeholder="Confirm Password"/></td>
          </tr>
          </tbody>
        </table>
        {/* <button className='registerButton' onclick="document.getElementsByClassName('.additional') .scrollIntoView({behavior:'smooth'});">Continue</button> */}
        <div align="center">
            <button className='registerButton' type="submit" placeholder="submit"> Submit </button> <button type="reset"className='registerButton' placeholder="reset"> Reset </button>
            
        </div>
    </form>    
    </section>

 </>
  )
}

export default Register



