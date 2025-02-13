package com.appointmentApp.Appointment.Entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private int id;

    @Column(name = "username",unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email",unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User() {
    }

    public User(String username, int id, String password, String email, Role role) {
        this.username = username;
        this.id = id;
        this.password = password;
        this.email = email;
        this.role = role;
    }


}
