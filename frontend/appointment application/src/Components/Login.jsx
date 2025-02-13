import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import CommonForm from "../Common/CommonForm";
import { LoginFormControls } from "../Common/config";

function Login() {
  // login function, user state, and loading state from AuthContext
  const { login, user, loading } = useContext(AuthContext);
  // navigate hook to navigate between ro
  const navigate = useNavigate();

   // Redirect to dashboard if user is already logged in
  useEffect(() => {
      if (user) {
          navigate("/dashboard");
      }
  }, [user, navigate]);

  // // Initialize state for login form data (username and password)
  const [loginFormData, setLoginFormData] = useState({
      username: "",
      password: "",
  });

  // Handle form submission when the user attempts to log in
  const handleLoginOnSubmit = async (e) => {
      e.preventDefault();
      if (!loginFormData.username || !loginFormData.password) {
          alert("Please fill in all fields");
          return;
      }

      // Call the login function with the form data and check success
      const success = await login(loginFormData);
      if (success) {
          navigate("/dashboard");
      } else {
          alert("Invalid credentials");
      }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/appointment.png')" }}>
      <div className="overlay"></div>

      <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6">Login</h2>

          <CommonForm
            formControls={LoginFormControls}
            formData={loginFormData}
            setFormData={setLoginFormData}
            onSubmit={handleLoginOnSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
