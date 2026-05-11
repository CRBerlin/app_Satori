import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private readonly httpClient = inject(HttpClient);
  // private readonly apiUrl = 'http://localhost:3000/exercises';
  private readonly apiUrl = 'http://18.219.13.137:3000/exercises';

  createExercise(exercises: any) {
    return this.httpClient.post(this.apiUrl, exercises);
  }

  getAllExercises() {
    return this.httpClient.get(this.apiUrl);
  }

  updateExercise(id: string, exercise: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, exercise);
  }

  deleteExercise(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
