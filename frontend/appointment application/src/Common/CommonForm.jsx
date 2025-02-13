import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CommonInput from './CommonInput';

const formElementType = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea'
}

function CommonForm({ formControls = [], setFormData, formData, onSubmit, errors }) {
    const location = useLocation();



    function renderFormElement(getFormControl, getFormData,index) {
        let Element = null;




        switch (getFormControl.componentType) {
            case formElementType.INPUT:
                Element = (
                    <CommonInput
                    key={index}
                        label={getFormControl.label}
                        type={getFormControl.type}
                        placeholder={getFormControl.placeholder}
                        value={getFormData[getFormControl.name]}
                        name={getFormControl.name}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getFormControl.name]: event.target.value
                        })}
                    />
                );
                break;

            default:
                Element = (
                    <CommonInput
                    key={index}
                        label={getFormControl.label}
                        type={getFormControl.type}
                        placeholder={getFormControl.placeholder}
                        value={getFormData[getFormControl.name]}
                        name={getFormControl.name}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getFormControl.name]: event.target.value
                        })}
                    />
                );
                break;
        }

        return Element;
    }


    console.log(formData);


    return (
        <form onSubmit={onSubmit} className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-6 flex flex-col gap-6">
                    {
                        formControls.map((formControl,index) => renderFormElement(formControl, formData,index))
                    }
                </div>
            </div>
            {
                location.pathname === '/register' ? (
                    <ul className="list-disc pl-5">
                        {/* <li className='text-black'>Your email should be in a valid format (e.g., user@example.com).</li> */}
                        <li className='text-black text-left'>Your password should be at least 5 characters long.</li>
                        <li className='text-black text-left'>Choose a unique username.</li>
                    </ul>
                ) : null
            }
            <div className='mt-2'>
                {
                    location.pathname === '/login' ? (
                        <Link to="/register" className="text-blue-950 hover:underline">
                            Don't have an account? Register
                        </Link>) : (
                        <Link to="/login" className="text-blue-950 hover:underline">
                            Already have an account? Login
                        </Link>)
                }
            </div>


            <div className="mt-3 w-full flex items-center justify-center z-50">
                <button
                    type="submit"
                    className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    {location.pathname === '/login' ? 'Login' : 'Register'}
                </button>
            </div>
            <div className='mt-2'>
                {
                    location.pathname === '/login' ? (
                        <Link to="/reset" className="text-blue-950 hover:underline">Forget Password?</Link>
                    ) : null
                }
            </div>
        </form>
    );
}

export default CommonForm;
