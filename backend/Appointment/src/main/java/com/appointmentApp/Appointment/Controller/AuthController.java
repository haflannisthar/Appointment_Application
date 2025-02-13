package com.appointmentApp.Appointment.Controller;

import com.appointmentApp.Appointment.DTO.LoginResponse;
import com.appointmentApp.Appointment.DTO.RegisterRequest;
import com.appointmentApp.Appointment.Dao.RoleDao;
import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.Role;
import com.appointmentApp.Appointment.Entity.User;
import com.appointmentApp.Appointment.Security.jwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final jwtUtil jwtUtil;
    private final RoleDao roleDao;
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, jwtUtil jwtUtil, RoleDao roleDao, UserDao userDao, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.roleDao = roleDao;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }


    //    Register API
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userDao.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        if (userDao.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already registered");
        }

        Role userRole = roleDao.findByName("USER").orElseThrow(() -> new RuntimeException("USER role not found"));
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(userRole);
        user.setUsername(registerRequest.getUsername());

        userDao.save(user);
        return ResponseEntity.ok("User Registered Successfully");
    }


//    user login end point
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest, HttpServletResponse response) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (BadCredentialsException e) {
            // This exception is thrown when the credentials are invalid (incorrect username or password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or Password incorrect");
        } catch (Exception e) {
            System.err.println("Exception: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed. Please try again.");
        }

        String token = jwtUtil.generateToken(loginRequest.getUsername());
        Cookie cookie = new Cookie("jwtToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);


      String role=  roleDao.getRoleByUsername(loginRequest.getUsername());

        LoginResponse loginResponse=new LoginResponse(loginRequest.getUsername(),role);
        return ResponseEntity.ok(loginResponse);

    }


//    verify toke ned point
    @GetMapping("/user")
    public ResponseEntity<?> verifyToken(HttpServletRequest request) {
        // Extract the JWT token from the cookies
        Cookie[] cookies = request.getCookies();
        String jwtToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        // If there's no token, return Unauthorized
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        // Validate the token (use your JWT validation logic)
        boolean isValid = jwtUtil.isTokenValid(jwtToken);
        if (isValid) {
            String username=jwtUtil.extractUsername(jwtToken);
            String role=jwtUtil.extractRole(jwtToken);

            LoginResponse loginResponse=new LoginResponse(username,role);

            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

//    logout end point
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){
        // Check if the token is present in the cookies
        Cookie[] cookies = request.getCookies();
        boolean tokenFound = false;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    tokenFound = true;
                    break;
                }
            }
        }

        // If there's no token, return Unauthorized
        if (!tokenFound) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token found already logged out");
        }

        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Set the cookie's max age to 0 to immediately delete it
        response.addCookie(cookie);

        return ResponseEntity.status(200).body("Logged out successfully");
    }



//    verify user end point
    @GetMapping("/me")
    public ResponseEntity<?> getUserFromToken(@CookieValue(name = "jwtToken", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String username = jwtUtil.extractUsername(token);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }

        String role = roleDao.getRoleByUsername(username);

        LoginResponse loginResponse = new LoginResponse(username, role);
        return ResponseEntity.ok(loginResponse);
    }



}
