import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function BookAppointment({ onBookSuccess }) {

    // disable past date
    const [minDate, setMinDate] = useState("");
    // store selected date
    const [selectedDate, setSelectedDate] = useState("");
    // store selected time slots
    const [selectedSlot, setSelectedSlot] = useState(null);
    // store the current steps
    const [currentStep, setCurrentStep] = useState(1);
    // state to store the contact details
    const [contactDetails, setContactDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });
// to store form errors
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });
// state for handling API error messages
    const [error, setError] = useState("");
    // State for showing loading indicator
    const [loading, setLoading] = useState(false);
    // Context for fetching available slots and creating new bookings
    const { timeSlots, getTimeSlotsByDate, createNewBooking,emptyTheSlots } = useContext(AuthContext);
// State for showing success message after booking confirmation
    const [success, setSuccess] = useState("")

// Effect to disable past dates in the date picker
    useEffect(() => {
        const today = new Date();
        setMinDate(today.toISOString().split("T")[0]);


        emptyTheSlots();
    }, []);


    // fetch available time slots when a date is selected
    useEffect(() => {
        if (selectedDate) {
            setError("");
            setLoading(true);
            setSelectedSlot(null);

            getTimeSlotsByDate(selectedDate).then((response) => {
                setTimeout(() => {
                    setLoading(false);
                    if (response.status !== 200) {
                        setError(response.data);
                    }
                }, 1000);
            });
        }
    }, [selectedDate]);

// Function to validate form inputs
    const validateInput = (name, value) => {
        let error = "";

        // Full Name Validation
        if (name === "name") {
            const fullNamePattern = /^(([A-Z][a-z]{3,20}[ ])+([A-Z][a-z]{3,20}){1})$/;
            if (!fullNamePattern.test(value)) {
                error = "Enter a valid full name (First Last format, starting with uppercase).";
            }
        }

        // Email Validation
        if (name === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                error = "Enter a valid email address.";
            }
        }

        // Phone Validation (Assuming 10-digit numbers)
        if (name === "phone") {
            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(value)) {
                error = "Enter a valid 10-digit phone number.";
            }
        }

        return error;
    };

    // Handler for updating form inputs and validating data
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setContactDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

        // Validate input and update errors
        const error = validateInput(name, value);
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    // Function to confirm the booking and store details
    async function handleConfirm() {

        const appointmentDetails = {
            timeslot: selectedSlot,
            name: contactDetails.name,
            email: contactDetails.email,
            phone: contactDetails.phone,
            date: selectedDate
        };

        console.log(appointmentDetails);
        

        const response = await createNewBooking(appointmentDetails);
        console.log(response);
        
        if (response.status === 200) {
            // Show success message
            setSuccess("Appointment Booked  successfully!");

            // Reset form fields after successful booking
            setContactDetails({
                name: "",
                email: "",
                phone: "",
            })

//              reset the errors
            setFormErrors({
                name: "",
                email: "",
                phone: "",
            })
// reset the selected date , set the selected slot to null ,empty the slots 
            setSelectedDate("")
            setSelectedSlot(null)

            emptyTheSlots();
//  move to next slide/screen
            setCurrentStep(4)


        }else{
            // store the error message
            setError(response.data)
        }

    }

    // Function to switch to booked appointments tab after successful booking
    function goToBookedTab(){
        if (onBookSuccess) {
            onBookSuccess();
          }
    }


    return (
        <div className="p-4 max-w-4xl mx-auto">
            {currentStep === 1 && (
                <div>
                    <h2 className="text-xl font-semibold mb-3">Step 1: Choose Date & Time</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4">
                            <label className="block mb-1 text-sm font-medium">Select a Date: <span className="text-red-600 font-extrabold"> *</span></label>
                            <input
                                type="date"
                                min={minDate}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                onKeyDown={(e) => e.preventDefault()}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="p-4">
                            <p className="mb-1 text-sm font-medium">Available time slots: <span className="text-red-600 font-extrabold"> *</span></p>
                            {loading ? (
                                <div className="mt-1 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    Loading time slots... Please wait.
                                </div>) : error ? (
                                    <div className="mt-1 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                        {error}
                                    </div>) : (
                                <div className="grid grid-cols-4 gap-4">
                                    {timeSlots.map((slot, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`flex items-center justify-center p-2 cursor-pointer rounded-md text-white 
                                    ${selectedSlot === slot ? "bg-blue-900" : "bg-blue-500"}
                                    hover:bg-blue-600`}
                                        >
                                            {slot.slice(0, 5)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setCurrentStep(2)}
                            disabled={!selectedDate || !selectedSlot}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/*  Contact Information  */}
            {currentStep === 2 && (
                <div>
                    <h2 className="text-xl font-semibold mb-3">Step 2: Enter Contact Information</h2>
                    <div className="p-4">
                        <label className="block text-sm font-medium">
                            Full Name: <span className="text-red-600 font-extrabold"> *</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={contactDetails.name}
                            onChange={handleInputChange}
                            className={`border rounded p-2 w-full mb-2 ${formErrors.name && "border-red-500"}`}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}

                        <label className="block text-sm font-medium">
                            Email: <span className="text-red-600 font-extrabold"> *</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={contactDetails.email}
                            onChange={handleInputChange}
                            className={`border rounded p-2 w-full mb-2 ${formErrors.email && "border-red-500"}`}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}

                        <label className="block text-sm font-medium">
                            Phone: <span className="text-red-600 font-extrabold"> *</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={contactDetails.phone}
                            onChange={handleInputChange}
                            className={`border rounded p-2 w-full mb-4 ${formErrors.phone && "border-red-500"}`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mb-1">{formErrors.phone}</p>}

                        <div className="flex justify-between">
                            <button onClick={() => setCurrentStep(1)} className="px-4 py-2 bg-gray-500 text-white rounded">
                                Back
                            </button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                disabled={Object.values(formErrors).some((error) => error) || Object.values(contactDetails).some((val) => !val)}
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* confirmation */}
            {currentStep === 3 && (
                <div>
                    <h2 className="text-xl font-semibold mb-3">Step 3: Confirm Details</h2>
                    <div className="p-4 border rounded-md">
                        <p className="mb-2"><strong>Date:</strong> {selectedDate}</p>
                        <p className="mb-2"><strong>Time Slot:</strong> {selectedSlot.slice(0, 5)}</p>
                        <p className="mb-2"><strong>Name:</strong> {contactDetails.name}</p>
                        <p className="mb-2"><strong>Email:</strong> {contactDetails.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {contactDetails.phone}</p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button onClick={() => setCurrentStep(2)} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Back
                        </button>
                        <button onClick={handleConfirm} className="px-4 py-2 bg-green-600 text-white rounded">
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            {currentStep === 4 && (
                <div>
                {
                    success && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                </div>
                    )
                }
                {
                    error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
                    )
                }
                <div className="flex justify-center mt-5">
                    <button type="button" className="px-4 py-2 bg-green-600 text-white rounded" onClick={goToBookedTab}>GO TO BOOKED APPOINTMENTS</button>
                </div>
            </div>
            
            )}
        </div>
    );
}

export default BookAppointment;
