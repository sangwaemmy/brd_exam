/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proc_tender.jwtsecurity;

import com.proc_tender.repository.AccountRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author SANGWA Emmanuel code [CODEGURU - info@codeguru.com]
 */
@RestController
@Slf4j
public class TokenLogin {

    @Autowired
    private JwtUtils jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/authenticate")
    public Map<String, Object> generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        Map<String, Object> userdetails = new HashMap<>();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
            userdetails.put("stat", "OK");
            userdetails.put("token", jwtUtil.generateToken(authRequest.getUserName()));
            userdetails.put("userDetails", accountRepository.findUserAndProfile(authRequest.getUserName(), "enabled")  );

        } catch (Exception ex) {
            System.out.println("---------Error: " + ex.toString());
            userdetails.put("stat", "fail");
//            throw new Exception("invalid username/password");
            return userdetails;
        }
        return userdetails;
    }

}
