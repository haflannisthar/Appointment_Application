import React, { useContext, useEffect, useState } from 'react'
import { RegisterFormControls } from "../Common/config";
import CommonForm from "../Common/CommonForm";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";


function Register() {

  // navigate hook to navigate between routes
  const navigate = useNavigate()
  // register method and user, loading states from auth context
  const { register, user, loading } = useContext(AuthContext);

  // redirect the user to dahboard if the user is logged in 
useEffect(() => {
      if (user) {
          navigate("/dashboard");
      }
  }, [user, navigate]);

// state to store register form data
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  




  // Submit handler
  const handleRegisterOnSubmit = async (event) => {
    event.preventDefault();

    // validation
    if (!registerFormData.email || !registerFormData.username || !registerFormData.password) {
      alert("Please fill in all fields");
      return;
    }
    // validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(registerFormData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    // validate username
    const usernamePattern = /^[a-zA-Z0-9]{5,16}$/;
    if (!usernamePattern.test(registerFormData.username)) {
      alert("Please enter a valid username");
      return;
    }
    // validate  password
    const passwordPattern = /^[A-Za-z\d]{5,}$/;
    if (!passwordPattern.test(registerFormData.password)) {
      alert("Please enter a valid password");
      return;
    }
    // register  user
    const response = await register(registerFormData);


    if (response.status === 200) {
      alert("Registration successful! You will be redirected to the login page.");
      navigate("/login");
    } else {
      alert(response.data);
    };

  }


  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/appointment.png')" }}
    >
      {/* Overlay */}
      <div className="overlay"></div>

      <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6">Register</h2>


          {/* Common Form */}
          <CommonForm
            formControls={RegisterFormControls}
            formData={registerFormData}
            setFormData={setRegisterFormData}
            onSubmit={handleRegisterOnSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default Register