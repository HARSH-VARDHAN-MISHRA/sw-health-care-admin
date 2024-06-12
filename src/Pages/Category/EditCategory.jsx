import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const { id } = useParams();

    const [formData, setData] = useState({
        categoryName: '',
        categoryImage: null,
        categoryActive: false,
        previewImage: null // State to hold the preview image
        
    });

    const [loading, setLoading] = useState(true); // Add loading state
    const [btnLoading, setBtnLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setData({
                ...formData,
                [name]: checked
            });
        } else if (type === 'file') {
            const file = files[0];
            setData({
                ...formData,
                [name]: file,
                previewImage: URL.createObjectURL(file) // Set preview image URL
            });
        } else {
            setData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFetch = async () => {
        try {
            const res = await axios.get(`https://sw-health-care-backend.onrender.com/api/v1/get-all-category`);
            const category = res.data.data;
            const filterData = category.filter((item) => item._id === id);
            if (filterData.length > 0) {
                setData({
                    categoryName: filterData[0].categoryName,
                    categoryImage: null, // We don't set the image here since we can't preview it from a URL
                    categoryActive: filterData[0].categoryActive,
                    previewImage: filterData[0].categoryImage // Set the existing image URL for preview
                });
            }
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching category:', error);
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBtnLoading(true)
        const data = new FormData();
        data.append('categoryName', formData.categoryName);
        if (formData.categoryImage) {
            data.append('categoryImage', formData.categoryImage);
        }
        data.append('categoryActive', formData.categoryActive);

        try {
            const response = await axios.put(`https://sw-health-care-backend.onrender.com/api/v1/update-category/${id}`, data);
            toast.success("Category Updated Successfully!");
            setBtnLoading(false);
            window.location.href = '/all-category';
        } catch (error) {
            setBtnLoading(false)
            console.error('Error updating category:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        handleFetch();
    }, [id]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="categoryName" className="form-label">Category Name</label>
                            <input type="text" onChange={handleChange} name='categoryName' value={formData.categoryName} className="form-control" id="categoryName" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="categoryImage" className="form-label">Category Image</label>
                            <input type="file" onChange={handleChange} name='categoryImage' className="form-control" id="categoryImage" />
                        </div>
                        {formData.previewImage && (
                            <div className="col-12">
                                <img src={formData.previewImage} alt="Category Preview" style={{ width: '100px', height: '100px' }} />
                            </div>
                        )}
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" onChange={handleChange} type="checkbox" name="categoryActive" id="categoryActive" checked={formData.categoryActive} />
                                <label className="form-check-label" htmlFor="categoryActive">
                                    Active in Homepage
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            {/* <button type="submit" className="">Update Category</button> */}
                            <button type="submit" className={`${btnLoading ? 'not-allowed':'allowed'}`} >{btnLoading ? "Please Wait.." : "Update Category"} </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditCategory;
