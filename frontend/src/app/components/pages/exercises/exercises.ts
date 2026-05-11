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
  selectedExerciseId = '';

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

  editExercise(exercise: any) {
    this.selectedExerciseId = exercise._id;

    this.exercise = {
      name: exercise.name,
      description: exercise.description,
      videoUrl: exercise.videoUrl,
      muscleGroup: exercise.muscleGroup,
      difficulty: exercise.difficulty,
    };
  }

  updateExercise() {
    this.exercisesService.updateExercise(this.selectedExerciseId, this.exercise).subscribe({
      next: () => {
        this.loadExercises();

        this.resetForm();
      },

      error: (err) => console.error(err),
    });
  }

  deleteExercise(id: string) {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este ejercicio?');

    if (!confirmDelete) return;

    this.exercisesService.deleteExercise(id).subscribe({
      next: () => {
        // Eliminar localmente SIN rerender completo
        this.exercises = this.exercises.filter((exercise) => exercise._id !== id);
      },

      error: (err) => console.error(err),
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
