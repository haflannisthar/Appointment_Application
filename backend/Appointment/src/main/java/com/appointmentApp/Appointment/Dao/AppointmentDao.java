package com.appointmentApp.Appointment.Dao;

import com.appointmentApp.Appointment.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentDao extends JpaRepository<Appointment, Integer> {

    @Query("select a from Appointment  a where a.date=?1 and ?2 between a.starttime and a.endtime")
    Appointment getAppointmentByDateAndTime(LocalDate date, LocalTime starttime);

    @Query("select a from Appointment a where a.date=?1")
    List<Appointment> getAppointmentsByDate(LocalDate date);

    @Query(value = "SELECT * FROM appointments a WHERE a.date = ?1 LIMIT 1", nativeQuery = true)
    Appointment getAppointmentByDate(LocalDate date);

   @Query("select a.date from Appointment a where a.id=?1")
    LocalDate getAppointmentDateById(int appointmentId);
}
