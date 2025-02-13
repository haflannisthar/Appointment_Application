package com.appointmentApp.Appointment.Security;

import com.appointmentApp.Appointment.Service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Marking this class as a Spring component so it can be automatically registered as a bean
@Component
public class JWTFilter extends OncePerRequestFilter {

    private final jwtUtil jwtUtil; // Utility class for handling JWT operations
    private final CustomUserDetailService customUserDetailsService; // Service to load user details from the database
    // Constructor for injecting dependencies
    public JWTFilter(jwtUtil jwtUtil, CustomUserDetailService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    // Main filtering logic for every request that comes into the server
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//extract the token from the cookie
        String token= jwtUtil.extractTokenFromCookies(request);
// If token is present and valid, proceed with authentication
        if (token != null && jwtUtil.isTokenValid(token)) {
            // Extract the username from the token
            String username= jwtUtil.extractUsername(token);

            // If username is not null and the user is not already authenticated in the current request
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Load user details from the custom user details service
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
// Create an authentication token with the user details
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // Set the authentication object into the security context, meaning the user is now authenticated
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

      // Continue the request-response cycle after the authentication process
        filterChain.doFilter(request, response);


    }
}
