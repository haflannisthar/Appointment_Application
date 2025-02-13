package com.appointmentApp.Appointment.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class BookingResponse {

    private int id;
    private String BookingID;
    private LocalDateTime createdAt;
    private LocalTime timeSlot;
    private String email;
    private String phone;
    private String name;
    private LocalDate appointmentDate;
    private String status;
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookingID() {
        return BookingID;
    }

    public void setBookingID(String bookingID) {
        BookingID = bookingID;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalTime getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(LocalTime timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BookingResponse(int id, String bookingID, LocalDateTime createdAt, LocalTime timeSlot, String email, String phone, String name, LocalDate appointmentDate, String status,String username) {
        this.id = id;
        BookingID = bookingID;
        this.createdAt = createdAt;
        this.timeSlot = timeSlot;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.username = username;
    }




}
