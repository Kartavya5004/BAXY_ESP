import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate();
    return(
        <header className="head">
            <h1 style={{textAlign:"left", marginLeft: "0px", paddingLeft: "0px"}}>BAXY| Engineering</h1>
            
            <nav>
                <table>
                    <tbody>
                    <tr>
                        <td><a href="" onClick={() => navigate("/Homepage")}>Home</a></td>
                        <td><a href="https://baxyengineering.com/about.php">About_us</a></td>
                        <td><a href="https://baxyengineering.com/our-products.php">Products</a></td>
                        <td><a href="https://baxyengineering.com/contact.php">Contact</a></td>
                    </tr>
                    </tbody>
                </table>  
            </nav>
            <hr/>
            <br></br>
        </header>
    )
}

export default Header