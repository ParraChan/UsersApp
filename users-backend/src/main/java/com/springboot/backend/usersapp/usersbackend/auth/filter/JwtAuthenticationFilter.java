package com.springboot.backend.usersapp.usersbackend.auth.filter;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.usersapp.usersbackend.entities.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;

    

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager ;
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

                String username = null;
                String password = null;

                try {
                    User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
                    username= user.getUsername();
                    password = user.getPassword();
                } catch (StreamReadException e) {
                    e.printStackTrace();
                } catch (DatabindException e) {
                    e.printStackTrace();
                } catch (IOException e) { 
                    e.printStackTrace();
                }
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
     return this.authenticationManager.authenticate(authenticationToken);
    }
    



}
