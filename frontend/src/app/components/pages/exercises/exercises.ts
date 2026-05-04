import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExercisesService } from '../../../services/exercises';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css',
})
export class Exercises implements OnInit {
  private readonly exercisesService = inject(ExercisesService);
  private readonly cdr = inject(ChangeDetectorRef);

  exercises: any[] = [];

  exercise = {
    name: '',
    description: '',
    videoUrl: '',
    muscleGroup: '',
    difficulty: 'beginner',
  };

  ngOnInit(): void {
    this.loadExercises();
  }

  createExercise() {
    this.exercisesService.createExercise(this.exercise).subscribe({
      next: () => {
        this.loadExercises();
        this.resetForm();
      },
      error: (err) => console.error(err),
    });
  }

  loadExercises() {
    this.exercisesService.getAllExercises().subscribe((res: any) => {
      this.exercises = res.data;
      this.cdr.detectChanges();
    });
  }

  resetForm() {
    this.exercise = {
      name: '',
      description: '',
      videoUrl: '',
      muscleGroup: '',
      difficulty: 'beginner',
    };
  }
}
