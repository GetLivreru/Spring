import { Component, OnInit } from '@angular/core'; // импорт Component и OnInit
import { QuizService } from './quiz.service'; // импортируем наш сервис

@Component({
  selector: 'app-quiz', // селектор для использования компонента в HTML
  templateUrl: './quiz.component.html', // путь к HTML-шаблону
  styleUrls: ['./quiz.component.css'] // путь к стилям
})
export class QuizComponent implements OnInit {
  quiz: any; // свойство для хранения данных теста

  constructor(private quizService: QuizService) {} // Инжектируем сервис в компонент

  // Метод, который вызывается при инициализации компонента
  ngOnInit(): void {
    this.loadQuiz(1); // Загружаем тест с id = 1
  }

  // Метод для загрузки теста из сервиса
  loadQuiz(id: number): void {
    this.quizService.getQuiz(id).subscribe(
      (data) => {
        this.quiz = data; // сохраняем данные теста в свойстве quiz
      },
      (error) => {
        console.error('Error loading quiz', error); // обработка ошибок
      }
    );
  }
}
