package com.appointmentApp.Appointment.Dao;

import com.appointmentApp.Appointment.DTO.BookingResponse;
import com.appointmentApp.Appointment.Entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;

public interface BookingDao extends JpaRepository<Booking, Integer> {

//    get the booking by appointment id and time slot
    @Query("SELECT b from Booking b where b.appointments_id.id=?2 and b.timeSlot=?1")
    Booking getExistingBookingByTimeAndAppointmentId(LocalTime time, int appointmentId);

//    Get the latest booking number for the given appointment date
    @Query(value = "SELECT MAX(CAST(SUBSTRING(BookingID, 12, 3) AS UNSIGNED)) " +
            "FROM bookings WHERE BookingID LIKE CONCAT(:appointmentDate, '/%')", nativeQuery = true)
    Integer getLatestBookingNumberForDate(@Param("appointmentDate") String appointmentDate);

//      get all the bookings as booking response (to get only the needed fields)
    @Query("select new com.appointmentApp.Appointment.DTO.BookingResponse(b.id, b.BookingID, b.createdAt, b.timeSlot, b.email, b.phone, b.name, b.appointments_id.date, b.status_id.name ,b.user_id.username) FROM Booking b WHERE b.user_id.id = ?1 order by b.createdAt desc ")
    Page<BookingResponse> findByBookingsUserId(int userId, Pageable pageable);

//    find booking by id
    @Query("select new com.appointmentApp.Appointment.DTO.BookingResponse(b.id, b.BookingID, b.createdAt, b.timeSlot, b.email, b.phone, b.name, b.appointments_id.date, b.status_id.name,b.user_id.username) FROM Booking b WHERE b.id = ?1")
    BookingResponse findBookingById(int bookingid);

//    get all the bookings for the admin user
    @Query("select new com.appointmentApp.Appointment.DTO.BookingResponse(b.id, b.BookingID, b.createdAt, b.timeSlot, b.email, b.phone, b.name, b.appointments_id.date, b.status_id.name ,b.user_id.username) FROM Booking b  order by b.createdAt desc ")
    Page<BookingResponse> findAllBookings(Pageable pageable);
}
