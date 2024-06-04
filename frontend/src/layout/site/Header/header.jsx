
import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <h1>Header</h1>
            <div className="d-flex m-5">
                <Link to="/admin" className="btn btn-primary">Admin</Link>
                <Link to={"/"} className="btn btn-primary">Home</Link>
                <Link to={"/admin/add"} className="btn btn-primary">Add </Link>
            </div>
        </div>
    )
}

export default Header
                                