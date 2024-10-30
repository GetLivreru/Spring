package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.entites.Question;
import com.sergio.jwt.backend.entites.Quiz;
import com.sergio.jwt.backend.repositories.QuestionRepository;
import com.sergio.jwt.backend.repositories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/{id}")
    public Quiz getQuizWithQuestions(@PathVariable Long id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
        List<Question> questions = questionRepository.findByQuizId(id);
        quiz.setQuestions(questions);
        return quiz;
    }
}
