package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

}