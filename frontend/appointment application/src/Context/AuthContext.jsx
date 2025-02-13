import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeSlots, setTimeSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8081/auth/me", { withCredentials: true });
                setUser(res.data.username);
                setRole(res.data.role);
            } catch (err) {
                setUser(null);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // login function
    const login = async (loginFormData) => {
        try {
            const res = await axios.post("http://localhost:8081/auth/login", loginFormData, { withCredentials: true });
            setUser(res.data.username);
            setRole(res.data.role);
            return true;
        } catch (err) {
            return false;
        }
    };

    // logout function
    const logout = async () => {

        try {
            const res = await axios.post("http://localhost:8081/auth/logout", {}, { withCredentials: true });
            console.log(res);

            setUser(null);
            setRole(null);
            setTimeSlots([])
            setBookings([])
            setTotalPages(0)
            return true;
        } catch (err) {
            console.log(err);

            return false;
        }
    }

    // register function
    const register = async (registerFormData) => {
        try {
            const result = await axios.post("http://localhost:8081/auth/register", registerFormData, { withCredentials: true });
            return result; // successful response
        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        }
    };

    // add schedule function
    const addAppointmentSchedule = async (appointmentSchedule) => {
        try {
            const result = await axios.post("http://localhost:8081/appointment-schedule", appointmentSchedule, { withCredentials: true });
            return result;
        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        }
    }

// get the rime slots by the date 
    const getTimeSlotsByDate = async (selectedDate) => {
        console.log(selectedDate);

        try {
            const result = await axios.get("http://localhost:8081/appointment/get-slots", {
                params: { date: selectedDate }, // Send date as a query parameter
                withCredentials: true
            });


            setTimeSlots([])
            setTimeSlots(result.data);
            return result;
        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        }
    }

// save new booking
    const createNewBooking = async (bookingData) => {
        console.log(bookingData);

        try {
            const result = await axios.post("http://localhost:8081/booking/new-booking", bookingData, { withCredentials: true });
            return result;
        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        }
    }

// empty the slots 
    const emptyTheSlots = () => {
        setTimeSlots([])
    }

// fetch all the booking for a user
    const fetchBookings = async (page = 0) => {
        try {
            const response = await axios.get(
                `http://localhost:8081/booking/get-all?page=${page}&size=5`,
                { withCredentials: true }
            );

         console.log(response);

         if (response.status===200) {
            setBookings(response.data.content); // Extract paginated content
            setTotalPages(response.data.totalPages); // Total pages from response
         }else{
            setBookings([])
            setTotalPages(0)
         }
         


           
        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        } finally {
            setLoading(false);
        }

    }

// cancel booking
    const cancelAppointment = async (bookingID) => {
        try {
            const response = await axios.delete(
                `http://localhost:8081/booking/cancelbooking?bookingid=${bookingID}`,
                { withCredentials: true }
            );

            console.log(response);
            

            if (response.status === 200) {
                const updatedBooking = await axios.get(
                    `http://localhost:8081/booking/getbookingdetails?bookingid=${bookingID}`,
                    { withCredentials: true }
                );
                console.log(updatedBooking);
                
                fetchBookings();
                return updatedBooking;

            } else {
                return response;
            }


        } catch (error) {
            if (error.response && error.response.data) {
                return { status: error.response.status, data: error.response.data };
            }
            return { status: 500, data: "An unexpected error occurred" };
        } finally {
            setLoading(false);
        }

    }

    return (
        <AuthContext.Provider value={{
            user, role, login, loading, logout, register,
            addAppointmentSchedule, getTimeSlotsByDate, timeSlots, createNewBooking
            , emptyTheSlots, fetchBookings, bookings, totalPages, cancelAppointment
        }}>
            {children}
        </AuthContext.Provider>
    );
}
