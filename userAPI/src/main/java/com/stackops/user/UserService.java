package com.stackops.user;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    private static final String google_client_id = "736588363997-hhfe654ejcvi9pv5jt0b5893b90ttv16.apps.googleusercontent.com";
    
    private static final String jwt_secret = System.getenv("JWT_SECRET");  //System.getProperty("JWT_SECRET")

    public Optional<UserEntity> findUser(String email) {
    	
        return userRepository.findByEmail(email);
    }
    
    public UserEntity registerUser(UserEntity user) {
    	String encodedPassword = customPasswordEncode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
    
    public Optional<UserEntity> loginUser(String email, String password) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        if (user.isPresent() && customPasswordEncode(password).equals(user.get().getPassword())) {
            return user;
        }
        return Optional.empty(); 
    }
    
    public String customPasswordEncode(String password) {
        // Implement your custom password encoding logic here.
        // For example, you can use a simple Base64 encoding or any hashing method.
        // This is a simple example; consider using a secure hashing algorithm in production.
        return Base64.getEncoder().encodeToString(password.getBytes());
    }
    
    public UserEntity updateUser(String email, UserEntity updatedUser) {
        // Check if user exists
        Optional<UserEntity> existingUserOpt = userRepository.findByEmail(email);
        if (!existingUserOpt.isPresent()) {
            throw new RuntimeException("User not found");
        }

        UserEntity existingUser = existingUserOpt.get();

        // Update fields - assuming you want to update name, email, and password
        existingUser.setUserName(updatedUser.getUserName()); // Update name
        existingUser.setEmail(updatedUser.getEmail()); // Update email
        
        // Optionally update password only if it's provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(customPasswordEncode(updatedUser.getPassword())); // Encode new password
        }

        return userRepository.save(existingUser); // Save updated user
    }
    
    public String getGoogleClientId() {
    	return UserService.google_client_id;
    }
    
    public String generateJwtToken(String userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 15*60*1000);  // Token expires in 15 minutes

        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .setIssuer("na-aia")
                .signWith(SignatureAlgorithm.HS512, this.jwt_secret)
                .compact();
    }
}