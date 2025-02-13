package com.appointmentApp.Appointment.Service;

import com.appointmentApp.Appointment.Dao.UserDao;
import com.appointmentApp.Appointment.Entity.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailService implements UserDetailsService {


    private final UserDao userDao;

    public CustomUserDetailService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user not found : " + username));




        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getName())));
    }
}
