package com.appointmentApp.Appointment.Dao;

import com.appointmentApp.Appointment.Entity.BookingStatus;
import com.appointmentApp.Appointment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingStatusDao extends JpaRepository<BookingStatus, Integer> {


    BookingStatus getBookingStatusByName(String name);
}
