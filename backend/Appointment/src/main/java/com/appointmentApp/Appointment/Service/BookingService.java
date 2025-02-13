package com.appointmentApp.Appointment.Service;

import com.appointmentApp.Appointment.DTO.BookingRequest;
import com.appointmentApp.Appointment.DTO.BookingResponse;
import com.appointmentApp.Appointment.Dao.AppointmentDao;
import com.appointmentApp.Appointment.Dao.BookingDao;
import com.appointmentApp.Appointment.Dao.BookingStatusDao;
import com.appointmentApp.Appointment.Entity.Appointment;
import com.appointmentApp.Appointment.Entity.Booking;
import com.appointmentApp.Appointment.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private BookingStatusDao bookingStatusDao;


    @Autowired
    private AppointmentDao appointmentDao;

    public String getNextBookingId(LocalDate appointmentDate) {

        // Format the appointment date to match the format in the BookingID (yyyy/MM/dd)
        String formattedAppointmentDate = appointmentDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));


        // Get the latest booking number for the given appointment date
        Integer latestBookingNumber = bookingDao.getLatestBookingNumberForDate(formattedAppointmentDate);


        // If no bookings for this appointment date, start with 001
        int nextBookingNumber = (latestBookingNumber == null) ? 1 : latestBookingNumber + 1;

        return getFormattedBookingId(appointmentDate, nextBookingNumber);
    }

    private String getFormattedBookingId(LocalDate appointmentDate, int number) {
        // Format appointment date as yyyy/MM/dd
        String formattedDate = appointmentDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

        // Format the sequential number with leading zeros
        String formattedNumber = String.format("%03d", number);

        // Return the final BookingID in the format yyyy/MM/dd/xxx
        return formattedDate + "/" + formattedNumber;
    }


//   gat all the records for a user
    public Page<BookingResponse> getUserBookings(int userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookingDao.findByBookingsUserId(userId, pageable);
    }

    public BookingResponse getDeletedBooking(int bookingid) {

// get the booking record which was deleted (status changed to Cancelled) by id
        return bookingDao.findBookingById(bookingid);
    }


//      change the status to Cancelled
    public boolean deleteBooking(int bookingid) {
//        get the booking record by id
        Optional<Booking> booking = bookingDao.findById(bookingid);
// check for empty and if no record found return false
        if (booking.isEmpty()) {
            return false;
        }
//        if there is a record change the status and save then return true
        booking.get().setStatus_id(bookingStatusDao.getBookingStatusByName("Cancelled"));
        bookingDao.save(booking.get());
        return true;

    }

//    add new booking
    public void addNewBooking(BookingRequest bookingRequest, User user) {
        Appointment appointment = appointmentDao.getAppointmentByDate(bookingRequest.getDate());

        Booking newBooking = new Booking();
        newBooking.setBookingID(getNextBookingId(bookingRequest.getDate()));
        newBooking.setEmail(bookingRequest.getEmail());
        newBooking.setName(bookingRequest.getName());
        newBooking.setPhone(bookingRequest.getPhone());
        newBooking.setAppointments_id(appointment);
        newBooking.setCreatedAt(LocalDateTime.now());
        newBooking.setTimeSlot(bookingRequest.getTimeslot());
        newBooking.setUser_id(user);
        newBooking.setStatus_id(bookingStatusDao.getBookingStatusByName("Booked"));

        bookingDao.save(newBooking);



    }


//    get all the booking details if the logged user is admin
    public Page<BookingResponse> getAllBookings(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookingDao.findAllBookings( pageable);

    }
}
