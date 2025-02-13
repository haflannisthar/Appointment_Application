package com.appointmentApp.Appointment.Controller;

import com.appointmentApp.Appointment.DTO.BookingRequest;
import com.appointmentApp.Appointment.DTO.BookingResponse;
import com.appointmentApp.Appointment.Dao.AppointmentDao;
import com.appointmentApp.Appointment.Dao.BookingDao;
import com.appointmentApp.Appointment.Dao.BookingStatusDao;
import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.Appointment;
import com.appointmentApp.Appointment.Entity.Booking;
import com.appointmentApp.Appointment.Entity.User;
import com.appointmentApp.Appointment.Security.jwtUtil;
import com.appointmentApp.Appointment.Service.BookingService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
public class BookingController {


    private final jwtUtil jwtUtil;

    private final AppointmentDao appointmentDao;

    private final UserDao userDao;

    private final BookingDao bookingDao;

    private final BookingService bookingService;

    @Autowired
    private BookingStatusDao bookingStatusDao;


    public BookingController(jwtUtil jwtUtil, AppointmentDao appointmentDao, UserDao userDao, BookingDao bookingDao, BookingService bookingService) {
        this.jwtUtil = jwtUtil;
        this.appointmentDao = appointmentDao;
        this.userDao = userDao;
        this.bookingDao = bookingDao;
        this.bookingService = bookingService;
    }

//    add new boooking
    @PostMapping("/new-booking")
    public ResponseEntity<?> addBooking(@RequestBody BookingRequest bookingRequest, HttpServletRequest request) {
        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }
        // Validate the JWT token

        if (jwtToken == null || !jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT Cookie Missing or Invalid");
        }

        try {


            String username = jwtUtil.extractUsername(jwtToken);
            User user = userDao.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));


            bookingService.addNewBooking(bookingRequest, user);

            return ResponseEntity.ok("Booking Added");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }

    }


    //    get all the records of the logged-in user
    @GetMapping("/get-all")
    public ResponseEntity<?> getUserBookings(HttpServletRequest request, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {

        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken == null || !jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT Cookie Missing or Invalid");
        }

        try {
            String username = jwtUtil.extractUsername(jwtToken);
            String role = jwtUtil.extractRole(jwtToken);
            User user = userDao.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));


            Page<BookingResponse> userBookings;


            if (Objects.equals(role, "ADMIN")){
                 userBookings=bookingService.getAllBookings(page, size);
            }else{
                userBookings=bookingService.getUserBookings(user.getId(), page, size);
            }



            if (userBookings.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No bookings found");
            }


            return ResponseEntity.ok(userBookings);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }

    }

    //change the status to cancelled from  created
    @DeleteMapping("/cancelbooking")
    public ResponseEntity<?> deleteBooking(HttpServletRequest request, @RequestParam int bookingid) {
        String jwtToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken == null || !jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT Cookie Missing or Invalid");
        }

        try {
            String username = jwtUtil.extractUsername(jwtToken);
            userDao.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

            boolean status = bookingService.deleteBooking(bookingid);

            if (status) {
                return ResponseEntity.status(HttpStatus.OK).body("Booking successfully deleted");
            }


            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }

    }


    //    get the booking details by id
    @GetMapping("/getbookingdetails")
    public ResponseEntity<?> getBookingsDetails(HttpServletRequest request, @RequestParam int bookingid) {
        System.out.println(bookingid);
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
            String username = jwtUtil.extractUsername(jwtToken);
            userDao.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

            BookingResponse userBookingResponse = bookingService.getDeletedBooking(bookingid);


            return ResponseEntity.ok(userBookingResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }

    }


}
