package com.appointmentApp.Appointment.Controller;


import com.appointmentApp.Appointment.DTO.AppointmentRequest;
import com.appointmentApp.Appointment.Dao.AppointmentDao;
import com.appointmentApp.Appointment.Dao.RoleDao;
import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.Appointment;
import com.appointmentApp.Appointment.Entity.Role;
import com.appointmentApp.Appointment.Entity.User;
import com.appointmentApp.Appointment.Security.jwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
public class AddScheduleController {


    private final jwtUtil jwtUtil;

    private final AppointmentDao appointmentDao;

    private final UserDao userDao;

    public AddScheduleController(jwtUtil jwtUtil, AppointmentDao appointmentDao, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.appointmentDao = appointmentDao;
        this.userDao = userDao;
    }

//
    @PostMapping("/appointment-schedule")
    public ResponseEntity<String> addNewSchedule(HttpServletRequest request, @RequestBody AppointmentRequest appointmentRequest) {

        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }


        //        if token is null or invalid return
        if (jwtToken == null || !jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT Cookie Missing or Invalid");
        }

        try {
            // Extract  role from the token
            String role = jwtUtil.extractRole(jwtToken);


            // Check roles and return appropriate data
            if (role.equals("ADMIN")) {
                Appointment appointment = appointmentDao.getAppointmentByDateAndTime(appointmentRequest.getDate(), appointmentRequest.getStarttime());

                if (appointment != null) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Appointment already exists for that date and time");
                }
                // get the username from the token
                String username = jwtUtil.extractUsername(jwtToken);

                Optional<User> User = userDao.findByUsername(username);

                Appointment newAppointment = new Appointment();
                newAppointment.setDate(appointmentRequest.getDate());
                newAppointment.setStarttime(appointmentRequest.getStarttime());
                newAppointment.setEndtime(appointmentRequest.getEndtime());
                newAppointment.setDuration(appointmentRequest.getDuration());
                newAppointment.setUser_id(User.get());
                appointmentDao.save(newAppointment);


                return ResponseEntity.ok("new schedule added successfully");

            } else {
                return ResponseEntity.status(403).body("Access denied!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Token");
        }
    }
}
