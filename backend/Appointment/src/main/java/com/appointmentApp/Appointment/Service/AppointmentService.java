package com.appointmentApp.Appointment.Service;

import com.appointmentApp.Appointment.Dao.AppointmentDao;
import com.appointmentApp.Appointment.Dao.BookingDao;
import com.appointmentApp.Appointment.Entity.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private  BookingDao bookingDao;
    @Autowired
    private AppointmentDao appointmentDao;

//generate time slots
    public List<LocalTime> generateTimeSlots(LocalTime startTime, LocalTime endTime, int duration, int appointmentId) {
        List<LocalTime> slots = new ArrayList<>();

        // Get the appointment date from the database
        LocalDate appointmentDate = getAppointmentDate(appointmentId);
        LocalDate currentDate = LocalDate.now();  // Get today's date
        LocalDateTime currentDateTime = LocalDateTime.now(); // Get current date and time

        // Check if the appointment is scheduled for today
        boolean isToday = appointmentDate.isEqual(currentDate);

        while (startTime.plusMinutes(duration).isBefore(endTime) || startTime.plusMinutes(duration).equals(endTime)) {
            // Check if the time slot is already booked in the database
            if (!isTimeSlotBooked(startTime, appointmentId)) {

                // If the appointment date is today, ensure the slot is in the future
                if (isToday) {
                    LocalDateTime slotDateTime = LocalDateTime.of(currentDate, startTime); // Convert to LocalDateTime

                    if (slotDateTime.isAfter(currentDateTime)) { // Only add slots that are in the future
                        slots.add(startTime);
                    }
                } else {
                    // If the appointment is not today, all slots are valid
                    slots.add(startTime);
                }
            }

            startTime = startTime.plusMinutes(duration); // Move to the next slot
        }

        return slots;
    }

//    check that the there is a booking for the time slot  by time and appointment id
    private boolean isTimeSlotBooked(LocalTime time, int appointmentId) {
        // Query the database to check if the time slot is already booked for this appointment
        Booking extBooking= bookingDao.getExistingBookingByTimeAndAppointmentId(time, appointmentId);

        return extBooking != null;
    }

//    get the appointment date by ID
    private LocalDate getAppointmentDate( int appointmentId) {
        return appointmentDao.getAppointmentDateById(appointmentId);
    }

}
