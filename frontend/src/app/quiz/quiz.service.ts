import { Injectable } from '@angular/core'; // импортируем Injectable
import { HttpClient } from '@angular/common/http'; // импорт для отправки HTTP-запросов
import { Observable } from 'rxjs'; // тип Observable для асинхронных данных

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/api/quizzes'; // URL API на сервере

  constructor(private http: HttpClient) {} // Inject HttpClient для отправки запросов

  // Метод для получения теста по id
  getQuiz(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); // GET-запрос на сервер
  }
}
