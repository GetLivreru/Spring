import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})



export class AuthContentComponent {
  isLoggedIn: boolean = false;
  data: string[] = [];

  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.axiosService.request("GET", "/messages", {})
      .then((response) => {
        this.isLoggedIn = true;  // Логин успешен
        this.data = response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
        } else {
          this.data = error.response.code;
        }
      });
  }
}

