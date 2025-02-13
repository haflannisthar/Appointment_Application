package com.appointmentApp.Appointment.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingRequest {

    private String name;
    private String phone;
    private String email;
    private LocalTime timeslot;
    private LocalDate date;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalTime getTimeslot() {
        return timeslot;
    }

    public void setTimeslot(LocalTime timeslot) {
        this.timeslot = timeslot;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
