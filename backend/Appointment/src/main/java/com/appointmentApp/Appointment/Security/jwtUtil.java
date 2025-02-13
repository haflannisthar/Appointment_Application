package com.appointmentApp.Appointment.Security;

import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.Role;
import com.appointmentApp.Appointment.Entity.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class jwtUtil {


    private final UserDao userDao;


    private final SecretKey secretKey;

    public jwtUtil(UserDao userDao, @Value("${jwt.secret}") String secret) {
        this.userDao = userDao;
        try {
            // Ensuring secret is properly decoded from Base64
            this.secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid JWT secret key format. Please check the application.properties value for jwt.secret.", e);
        }
    }


    public String generateToken(String username) {
        User user = userDao.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = user.getRole();
        int jwtExpirationTimeMS = 86400000;

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationTimeMS))
                .signWith(secretKey)
                .compact();
    }

    //extract username
    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();

    }

    //    extract role
    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    //    validate the token
    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    //    extract token from the cookies
    public String extractTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }


}
