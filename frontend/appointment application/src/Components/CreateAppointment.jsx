import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function CreateAppointment() {
  // state to store  selected date
  const [selectedDate, setSelectedDate] = useState("");
  // state to store the min date and disable the date input dates
  const [minDate, setMinDate] = useState("");
  // to store errors
  const [error, setError] = useState("");
  // state to store the number of sessions
  const [sessions, setSessions] = useState(0);
    // state to handle loading state for saving appointment
  const [loading,setLoading]=useState(false)
  // state to store success message after appointment creatio
  const [success, setSuccess] = useState("");

// form data state to store the values from the form
  const [formData, setFormData] = useState({
    date: "",
    starttime: "",
    endtime: "",
    duration: "10", 
  });

// Extracting `addAppointmentSchedule` and `emptyTheSlots` from AuthContext
  const {addAppointmentSchedule,emptyTheSlots}=useContext(AuthContext);

  // Use effect to set today's date as the minimum date and clear slots when the component is mounted
  useEffect(() => {
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setMinDate(formattedDate);

    emptyTheSlots()
  }, []);


  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
  
    if (name === "date") {
      setSelectedDate(value);
  
      // Check if the selected start time is in the past
      if (formData.starttime && isTimeInPast(formData.starttime, value)) {
        setError("Start time cannot be in the past.");
        // Reset start time, end time, and sessions if invalid
        updatedFormData.starttime = ""; 
        updatedFormData.endtime = ""; 
        setSessions(0); 
      } else {
        setError("");
      }
    }
  
    // Handle starttime change
    if (name === "starttime") {
      if (formData.date === minDate && isTimeInPast(value, formData.date)) {
        setError("Start time cannot be in the past.");
        // Reset start time, end time, and sessions if invalid
        updatedFormData.starttime = ""; 
        updatedFormData.endtime = ""; 
        setSessions(0); 
      } else {
        setError("");
      }
    }
  
    // Handle endtime change
    if (name === "endtime") {
      if (formData.starttime && value <= formData.starttime) {
        setError("End time must be greater than start time.");
         // Reset sessions if invalid time
        updatedFormData.endtime = "";
        setSessions(0);
      } else {
        setError("");
        if (formData.starttime && value) {
          const startTime = new Date(`2000-01-01T${formData.starttime}`);
          const endTime = new Date(`2000-01-01T${value}`);
          const diffInMinutes = (endTime - startTime) / (1000 * 60);
  
          if (diffInMinutes < 60) {
            setError("End time must be at least 60 minutes after start time.");
            // Reset end time if invalid
            updatedFormData.endtime = ""; 
          } else {
             // Calculate sessions if valid
            calculateSessions(formData.starttime, value, formData.duration);
          }
        }
      }
    }
  
    // Handle duration change
    if (name === "duration") {
      const regex = /^[1-9][0-9]*$/;
      if (!regex.test(value)) {
        setError("Duration must be a positive integer greater than 0.");
        updatedFormData.duration = "";
      } else if (parseInt(value) > 30) {
        setError("Duration cannot be greater than 30.");
        // Reset value to default if invalid
        updatedFormData.duration = ""; 
      } else {
        setError("");
        if (formData.endtime) {
          // Calculate sessions if valid
          calculateSessions(formData.starttime, formData.endtime, value);
        }
      }
    }
  
    setFormData(updatedFormData);
  };
  
  // Function to check if the selected time is in the past
  const isTimeInPast = (selectedTime, selectedDate) => {
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    return selectedDateTime < now;
  };
  
  

  // Function to calculate the number of sessions
  const calculateSessions = (start, end, duration) => {
    if (start && end && duration) {
      const startTime = new Date(`2000-01-01T${start}`);
      const endTime = new Date(`2000-01-01T${end}`);

      // Convert milliseconds to minutes
      const diffInMinutes = (endTime - startTime) / (1000 * 60); 
      const sessionCount = Math.floor(diffInMinutes / parseInt(duration));

      setSessions(sessionCount);
    }
  };

  // save the appointment scedule to databse
  async function handleFormSubmit(e) {
    e.preventDefault();
    //  validate the form data
    if (!formData.date || !formData.starttime || !formData.endtime || !formData.duration) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // create a new appointment schedule
  const response= await addAppointmentSchedule(formData);
  if (response.status === 200) {
    setSuccess("Appointment Schedule created successfully!");

    setFormData({
      date: "",
    starttime: "",
    endtime: "",
    duration: "10", 
    })

    setSessions(0)
    setSelectedDate("")
    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setLoading(false)
  } else {
    setLoading(false);
    setError(response.data);
  };


  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Create Appointment Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Date Input */}
        <div className="flex flex-col sm:col-span-3 lg:col-span-1">
          <label htmlFor="default-datepicker" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Select a Date :<span className="text-red-600 font-extrabold"> *</span>
          </label>
          <input
            id="default-datepicker"
            type="date"
            name="date"
            min={minDate}
            value={formData.date}
            onChange={(e) => {
              handleChange(e);
              setSelectedDate(e.target.value);
            }}
            onKeyDown={(e) => e.preventDefault()}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Time Inputs */}
        <div className="sm:grid sm:grid-cols-3 lg:grid lg:grid-cols-3 lg:col-span-3 gap-6 mt-6 lg:mt-0">
          {/* Start Time */}
          <div className="relative">
            <label htmlFor="time1" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Start Time: <span className="text-red-600 font-extrabold"> *</span>
            </label>
            <input
              type="time"
              id="time1"
              name="starttime"
              value={formData.starttime}
              onChange={handleChange}
              onKeyDown={(e) => e.preventDefault()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              required
              disabled={!selectedDate}
            />
          </div>

          {/* End Time */}
          <div className="relative">
            <label htmlFor="time2" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              End Time: <span className="text-red-600 font-extrabold"> *</span>
            </label>
            <input
              type="time"
              id="time2"
              name="endtime"
              value={formData.endtime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              required
              disabled={!formData.starttime}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>

          {/* Time Interval */}
          <div className="flex flex-col">
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Time Duration for a session: <span className="text-red-600 font-extrabold"> *</span>
            </label>
            <input
              type="text"
              id="description"
              name="duration"
              value={formData.duration}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={!formData.endtime}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Appointment Details */}
      {selectedDate && !error && !success && (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold">Appointment Details</h2>
            <p className="text-gray-600 mt-2">
              <strong>Date:</strong> {formData.date}
            </p>
            {formData.starttime && (
              <p className="text-gray-600 mt-1">
                <strong>Start Time:</strong> {formData.starttime}
              </p>
            )}
            {formData.endtime && (
              <p className="text-gray-600 mt-1">
                <strong>End Time:</strong> {formData.endtime}
              </p>
            )}
            {formData.duration && (
              <p className="text-gray-600 mt-1">
                <strong>Duration:</strong> {formData.duration} minutes per session
              </p>
            )}
            {sessions > 0 && (
              <p className="text-gray-600 mt-1">
                <strong>Number of Sessions:</strong> {sessions}
              </p>
            )}
          </div>

          {/* Show Save button only when valid */}
          {formData.endtime && sessions > 0 && (
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleFormSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                {loading ? 'SAVING..':'SAVE'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateAppointment;
