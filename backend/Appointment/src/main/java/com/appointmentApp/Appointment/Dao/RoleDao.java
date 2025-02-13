package com.appointmentApp.Appointment.Dao;

import com.appointmentApp.Appointment.Entity.Role;
import com.appointmentApp.Appointment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleDao extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);

    @Query("select r.name from Role r where r.id in (select u.role.id from User u where u.username=?1)")
    String getRoleByUsername(String username);
}
