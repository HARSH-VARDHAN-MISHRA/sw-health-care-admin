import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [formData, setData] = useState({
        categoryName: '',
        categoryImage: null,
        categoryActive: false
    });
    const [isLoading, setIsloding] = useState(false)
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setData(prevData => ({
                ...prevData,
                categoryActive: checked
            }));
        } else if (type === 'file') {
            setData(prevData => ({
                ...prevData,
                categoryImage: event.target.files[0]
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloding(true)
        console.log(formData)
        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        data.append('categoryImage', formData.categoryImage);
        data.append('categoryActive', formData.categoryActive);

        try {
            const response = await axios.post('http://localhost:9875/api/v1/create-category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsloding(false)

            toast.success("Category Added Successfully !!");
            window.location.href = '/all-category';
        } catch (error) {
            setIsloding(false)

            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input type="text" onChange={handleChange} name='categoryName' value={formData.categoryName} className="form-control" id="categoryName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input type="file" onChange={handleChange} name='categoryImage' className="form-control" id="categoryImage" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" onChange={handleChange} type="checkbox" name="categoryActive" id="categoryActive" checked={formData.categoryActive} />
                            <label className="form-check-label" htmlFor="categoryActive">
                                Active in Homepage
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Category"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCategory;
