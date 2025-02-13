package com.appointmentApp.Appointment.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "starttime")
    private LocalTime starttime;

    @Column(name = "endtime")
    private LocalTime endtime;


    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;


    public Appointment() {
    }

    public Appointment(int id, LocalDate date, LocalTime starttime, LocalTime endtime, int duration, User user_id) {
        this.id = id;
        this.date = date;
        this.starttime = starttime;
        this.endtime = endtime;
        this.duration = duration;
        this.user_id = user_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStarttime() {
        return starttime;
    }

    public void setStarttime(LocalTime starttime) {
        this.starttime = starttime;
    }

    public LocalTime getEndtime() {
        return endtime;
    }

    public void setEndtime(LocalTime endtime) {
        this.endtime = endtime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }
}
