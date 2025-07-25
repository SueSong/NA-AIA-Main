package com.stackops.user;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@RestController
@CrossOrigin 
@RequestMapping("/userAPI")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user,
                                          @RequestHeader("Authorization") String googleToken) {
        try {
            if (googleToken.startsWith("Bearer ")) {
                googleToken = googleToken.substring(7);
            }

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance()
            ).setAudience(Collections.singletonList(userService.getGoogleClientId())).build();

            // Verify Google token
            GoogleIdToken idToken = verifier.verify(googleToken);
            if (idToken == null) {
                return ResponseEntity.status(401).body("Invalid Google token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String userId = payload.getSubject();  // Unique ID for the Google user
            String email = payload.getEmail();
            boolean emailVerified = payload.getEmailVerified();

            if (!emailVerified) {
                return ResponseEntity.status(401).body("Email not verified by Google");
            }

            // Check if the user already exists in the database
            if (userService.findUser(email)!=null) {
                return ResponseEntity.status(409).body("User already exists");
            }

            UserEntity newUser = userService.registerUser(user);
            
            // Optionally, generate a JWT token for the newly registered user
            String token = userService.generateJwtToken(newUser.getId(), newUser.getEmail());

            return ResponseEntity.ok(Collections.singletonMap("token", token));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO authRequest) {
        String token;
        try {
            if (authRequest.getGoogleToken() != null) {
                // Google OpenID authentication
                GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                        .setAudience(Collections.singletonList(userService.getGoogleClientId()))
                        .build();

                GoogleIdToken idToken = verifier.verify(authRequest.getGoogleToken());
                if (idToken != null) {
                    GoogleIdToken.Payload payload = idToken.getPayload();
                    String userId = payload.getSubject();
                    String email = payload.getEmail();

                    token = userService.generateJwtToken(userId, email);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
                }
            } else if (authRequest.getEmail() != null && authRequest.getPassword() != null) {
            	String email = authRequest.getEmail();
            	String password = authRequest.getPassword();
            	
            	Optional<UserEntity> user = userService.loginUser(email, password);
            	
                if (user == null ) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }

                token = userService.generateJwtToken(email, email);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid authentication method");
            }

            // Return JWT token in response
            return ResponseEntity.ok(Collections.singletonMap("access_token", token));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable String email, @RequestBody UserEntity updatedUser) {
    	UserEntity user = userService.updateUser(email, updatedUser);
    	
    	if(user!=null) {
    		return ResponseEntity.ok(user);
    	}else {
            return ResponseEntity.status(404).build(); // 404 if user not found
    	}    
    }
    
    
}