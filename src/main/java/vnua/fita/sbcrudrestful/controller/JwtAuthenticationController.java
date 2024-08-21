package vnua.fita.sbcrudrestful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import vnua.fita.sbcrudrestful.dto.JwtRequest;
import vnua.fita.sbcrudrestful.dto.JwtResponse;
import vnua.fita.sbcrudrestful.dto.UserRequest;
import vnua.fita.sbcrudrestful.model.User;
import vnua.fita.sbcrudrestful.service.CustomUserDetailsService;
import vnua.fita.sbcrudrestful.util.JwtUtil;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        User user = userDetailsService.getUser(authenticationRequest.getUsername());

        return new JwtResponse(jwt, user.getUsername(), user.getRole(), user.getUser_id()); // Thêm user_id vào response
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRequest userRequest) {
        try {
            userDetailsService.registerNewUser(userRequest);
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
