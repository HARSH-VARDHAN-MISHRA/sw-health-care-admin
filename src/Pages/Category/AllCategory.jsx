import React from 'react'
import { Link } from 'react-router-dom'

const AllCategory = () => {
    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Category List </h4>
                </div>
                <div className="links">
                    <Link className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Show in home page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllCategory