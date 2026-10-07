
function Footer(){

    return(
        <footer className="foot">
            <p>&copy;BAXY | Engineering – All Rights Reserved.</p>
            <p>
                {new Date().getFullYear()}
            </p>
        </footer>
    )
}

export default Footer