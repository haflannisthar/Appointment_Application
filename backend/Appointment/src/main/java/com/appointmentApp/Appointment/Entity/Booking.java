package com.appointmentApp.Appointment.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int id;

   @Column(name = "BookingID", unique = true)
    private String BookingID;

    @Column(name = "createdat")
    private LocalDateTime createdAt;

    @Column(name = "timeslot")
    private LocalTime timeSlot;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "appointments_id",referencedColumnName = "id")
    private Appointment appointments_id;


    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private BookingStatus status_id;

    public BookingStatus getStatus_id() {
        return status_id;
    }

    public void setStatus_id(BookingStatus status_id) {
        this.status_id = status_id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Appointment getAppointments_id() {
        return appointments_id;
    }

    public void setAppointments_id(Appointment appointments_id) {
        this.appointments_id = appointments_id;
    }

    public Booking() {
    }

    public Booking(int id, String bookingID, LocalDateTime createdAt, LocalTime timeSlot, String email, String phone, String name, User user_id, Appointment appointments_id, BookingStatus status_id) {
        this.id = id;
        BookingID = bookingID;
        this.createdAt = createdAt;
        this.timeSlot = timeSlot;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.user_id = user_id;
        this.appointments_id = appointments_id;
        this.status_id = status_id;
    }
//    public Booking(int id,String bookingID,LocalDateTime createdAt,LocalTime timeSlot,String email,String name,String phone,User user_id,Appointment appointments_id,BookingStatus status_id) {
//        this.id=id;
//        this.BookingID=bookingID;
//        this.createdAt=createdAt;
//        this.timeSlot=timeSlot;
//        this.email=email;
//        this.name=name;
//        this.phone=phone;
//        this.user_id=user_id;
//        this.appointments_id=appointments_id;
//        this.status_id=status_id;
//
//    }


}
