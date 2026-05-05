import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutPlanService } from '../../../services/workout-plan';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-workout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-workout.html',
  styleUrl: './user-workout.css',
})
export class UserWorkout implements OnInit {

  private readonly workoutService = inject(WorkoutPlanService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  plan: any = null;

  ngOnInit(): void {
    this.loadPlan();
  }

  loadPlan() {
    this.workoutService.getMyPlan().subscribe({
      next: (res: any) => {
        console.log("PLAN USUARIO:", res);
        this.plan = res.data;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error("Error cargando plan:", err);
      }
    });
  }

  // 🔥 Convertir URL de YouTube a embed seguro
  getEmbedUrl(url: string) {
    const videoId = url.split('v=')[1]?.split('&')[0];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}