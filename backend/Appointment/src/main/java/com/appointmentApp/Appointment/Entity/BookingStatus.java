package com.appointmentApp.Appointment.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "status")
@Getter
@Setter
public class BookingStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int id;


    @Column(name = "name")
    private String name;
}
