package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.config.UserAuthenticationProvider;
import com.sergio.jwt.backend.dtos.CredentialsDto;
import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.entites.TokenRefreshRequest;
import com.sergio.jwt.backend.entites.TokenRefreshResponse;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.TokenResponse;
import com.sergio.jwt.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);

        // Генерация Access и Refresh токенов
        TokenResponse tokenResponse = userAuthenticationProvider.createTokens(userDto);

        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);

        // Генерация Access и Refresh токенов
        TokenResponse tokenResponse = userAuthenticationProvider.createTokens(createdUser);

        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(tokenResponse);
    }

    // Метод для обновления токенов
    @PostMapping("/refresh-token")
    public ResponseEntity<TokenRefreshResponse> refreshAccessToken(@RequestBody TokenRefreshRequest request) {
        try {
            // Валидация Refresh Token
            Authentication authentication = userAuthenticationProvider.validateToken(request.getRefreshToken());

            UserDto user = (UserDto) authentication.getPrincipal();

            // Генерация нового Access Token
            String newAccessToken = userAuthenticationProvider.createAccessToken(user);

            // Отправляем новый Access Token в ответе
            return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(new TokenRefreshResponse("Invalid refresh token"));
        }
    }
}
