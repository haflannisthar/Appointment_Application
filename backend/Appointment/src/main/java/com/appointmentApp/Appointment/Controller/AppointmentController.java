package com.appointmentApp.Appointment.Controller;

import com.appointmentApp.Appointment.Dao.AppointmentDao;
import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.Appointment;
import com.appointmentApp.Appointment.Security.jwtUtil;
import com.appointmentApp.Appointment.Service.AppointmentService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final jwtUtil jwtUtil;

    private final AppointmentDao appointmentDao;

    private final UserDao userDao;

    private final AppointmentService appointmentService;

    public AppointmentController(jwtUtil jwtUtil,AppointmentDao appointmentDao,UserDao userDao,AppointmentService appointmentService) {
        this.jwtUtil = jwtUtil;
        this.appointmentDao = appointmentDao;
        this.userDao = userDao;
        this.appointmentService = appointmentService;
    }

    @GetMapping(value = "/get-slots",produces = "application/json")
    public ResponseEntity<?> getAvailableSlots(@RequestParam LocalDate date, HttpServletRequest request ) {

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
                List<LocalTime> allSlots = new ArrayList<>();

                List<Appointment> allAppointmentByDate=appointmentDao.getAppointmentsByDate(date);

                if (allAppointmentByDate.isEmpty()){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("No appointments available for the selected date.");
                }

                for(Appointment appointment:allAppointmentByDate){
                    LocalTime startTime=appointment.getStarttime();
                    LocalTime endTime=appointment.getEndtime();
                    int duration=appointment.getDuration();
                    int appointmentId=appointment.getId();

                    List<LocalTime> timeSlots=  appointmentService.generateTimeSlots(startTime,endTime,duration,appointmentId);
                    allSlots.addAll(timeSlots);
                }

                return ResponseEntity.ok(allSlots);
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Internal Server Error");
            }



    }
}
