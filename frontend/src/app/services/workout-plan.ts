import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkoutPlanService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/plans';

  // Crear plan (admin)
  createPlan(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // Obtener todos los planes (admin)
  getAllPlans() {
    return this.http.get(this.apiUrl);
  }

  // Obtener plan del usuario logeado
  getMyPlan() {
    return this.http.get(this.apiUrl + '/me');
  }
}
