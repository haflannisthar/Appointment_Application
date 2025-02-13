package com.appointmentApp.Appointment.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    private LocalDate date;
    private LocalTime starttime;
    private LocalTime endtime;
    private int duration;


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalTime getEndtime() {
        return endtime;
    }

    public void setEndtime(LocalTime endtime) {
        this.endtime = endtime;
    }

    public LocalTime getStarttime() {
        return starttime;
    }

    public void setStarttime(LocalTime starttime) {
        this.starttime = starttime;
    }

    public AppointmentRequest() {
    }

    public AppointmentRequest(LocalDate date, LocalTime starttime, LocalTime endtime, int duration) {
        this.date = date;
        this.starttime = starttime;
        this.endtime = endtime;
        this.duration = duration;
    }


}
