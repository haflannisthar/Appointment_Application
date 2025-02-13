import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ReactPaginate from 'react-paginate';
import { EyeIcon } from '@heroicons/react/24/solid';

function BookedAppointment() {
  // authentication-related state and methods from AuthContext
  const { bookings, totalPages, fetchBookings, loading, cancelAppointment, role } = useContext(AuthContext);
  
  // // State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState(0);
   // State to store the selected booking details for modal display
  const [selectedBooking, setSelectedBooking] = useState(null);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); 
   // State to store success and error messages for booking cancellation
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch bookings whenever the current page changes
  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

   // Handles pagination change when user selects a different page
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Opens the modal and sets the selected booking details
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // close the modela dn clear the selected booking
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null); 
    setSuccess("")
    setError("")
  };



// Handles appointment cancellation with confirmation
  async function handleCancelBooking(bookingIDNumber) {


    const userResponse = confirm("Are you sure to cancel the Appintment ? ")

    if (userResponse) {
      const bookingDetails = await cancelAppointment(bookingIDNumber)
      console.log(bookingDetails);

      if (bookingDetails.status === 200) {
        setSuccess("Appointment Deleted Successfully")
        setSelectedBooking(bookingDetails.data)
      } else {
        setError(bookingDetails.data)
      }

    } else {
      alert("Appointment deletion cancelled")
    }

  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {bookings.map((booking) => (
              <li key={booking.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <p><strong>Booking ID:</strong> {booking.bookingID}</p>
                  <p><strong>Date:</strong> {booking.appointmentDate}</p>
                  <p>
                    <strong>Status: </strong>
                    <span
                      className={`${booking.status === "Booked" ? "text-green-500" :
                        booking.status === "Cancelled" ? "text-red-500" :
                          "text-gray-500"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                  {
                    role === "ADMIN" && (
                      <p><strong>User:</strong> {booking.username}</p>
                    )
                  }
                </div>
                <EyeIcon
                  className="h-6 w-6 text-gray-600 cursor-pointer"
                  onClick={() => openModal(booking)} // Open modal with the clicked booking's details
                />
              </li>
            ))}
          </ul>

          {/* Pagination Component */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}  // Total number of pages
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center mt-4 space-x-2"
            pageClassName="px-3 py-1 border rounded-lg cursor-pointer"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded-lg cursor-pointer"
            nextClassName="px-3 py-1 border rounded-lg cursor-pointer"
            breakClassName="px-3 py-1 border rounded-lg"
          />

          {/* Modal to show booking details */}
          {isModalOpen && selectedBooking && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onClick={closeModal}
              ></div>

              {/* Modal */}
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg mx-4 sm:mx-0"> {/* Added mx-4 for smaller screens */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-md sm:text-xl font-semibold text-gray-900">
                      Booking Details
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                      onClick={closeModal}
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1L1 13" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 text-sm sm:text-[16px]">
                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Booking ID : </strong>

                      <p>{selectedBooking.bookingID}</p>
                    </div>

                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Appointment Date : </strong>

                      <p>{selectedBooking.appointmentDate}</p>
                    </div>
                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Appointment Time :</strong>

                      <p>{selectedBooking.timeSlot.slice(0, 5)}</p>
                    </div>

                    <div className='flex justify-start gap-2'>
                      <strong className="text-right">Status :</strong>

                      <strong>
                        <span className={`${selectedBooking.status === "Booked" ? "text-green-500" :
                          selectedBooking.status === "Cancelled" ? "text-red-500" :
                            "text-gray-500"
                          }`}
                        >
                          {selectedBooking.status}
                        </span>
                      </strong>

                    </div>

                    <div className="flex flex-col sm:flex-row justify-start gap-2">
                      <strong className="sm:text-left hidden sm:block">Booked Date & Time:</strong>
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <p className="sm:hidden">  <strong>Booking Date:</strong> {selectedBooking.createdAt.split('T')[0]}</p>
                        <p className="sm:hidden"> <strong>Booking Time:</strong> {selectedBooking.createdAt.split('T')[1]}</p>
                        <p className="hidden sm:block">
                          {selectedBooking.createdAt.split('T')[0]} , {selectedBooking.createdAt.split('T')[1]}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Full Name : </strong>

                      <p>{selectedBooking.name}</p>
                    </div>

                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Email : </strong>

                      <p>{selectedBooking.email}</p>
                    </div>

                    <div className="flex justify-start gap-2">
                      <strong className="text-right">Contact Number : </strong>

                      <p>{selectedBooking.phone}</p>
                    </div>




                  </div>

                  <div className='w-full text-center'>
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
                  </div>




                  <div className="flex justify-end p-4 border-t border-gray-200">
                    {/* "cancel" button is visible only if the status is created and cancellation is successful */}
                    {selectedBooking.status !== "Cancelled" && !success && (
                      <button
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => handleCancelBooking(selectedBooking.id)}
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default BookedAppointment;


// check for admin to show all the appointments
// change the backedn code