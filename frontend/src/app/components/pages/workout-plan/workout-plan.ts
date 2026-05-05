import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users';
import { ExercisesService } from '../../../services/exercises';
import { WorkoutPlanService } from '../../../services/workout-plan';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-workout-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-plan.html',
  styleUrl: './workout-plan.css',
})
export class WorkoutPlan implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly exercisesService = inject(ExercisesService);
  private readonly workoutPlanService = inject(WorkoutPlanService);
  private readonly cdr = inject(ChangeDetectorRef);

  users: any[] = [];
  exercises: any[] = [];
  plans: any[] = [];

  selectedUser: string = '';
  selectedExercises: any[] = [];

  sets: number = 3;
  reps: number = 10;
  restSeconds: number = 60;

  ngOnInit(): void {
    this.loadUsers();
    this.loadExercises();
    this.loadPlans();
  }

  // 🔹 Cargar usuarios
  loadUsers() {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
      this.cdr.detectChanges();
    });
  }

  // 🔹 Cargar ejercicios
  loadExercises() {
    this.exercisesService.getAllExercises().subscribe((res: any) => {
      this.exercises = res.data;
    });
  }

  // 🔹 Seleccionar / deseleccionar ejercicios
  toggleExercise(exercise: any) {
    const exists = this.selectedExercises.find((e) => e._id === exercise._id);

    if (exists) {
      this.selectedExercises = this.selectedExercises.filter((e) => e._id !== exercise._id);
    } else {
      this.selectedExercises.push(exercise);
    }
  }

  // 🔥 CREAR PLAN
  createPlan() {
    const exercises = this.selectedExercises.map((e) => ({
      exerciseId: e._id,
      sets: this.sets,
      reps: this.reps,
      restSeconds: this.restSeconds,
    }));

    const body = {
      userId: this.selectedUser,
      sessions: [
        {
          sessionIndex: 0,
          title: 'Full Body',
          exercises,
        },
      ],
    };

    console.log('BODY PLAN:', body);

    this.workoutPlanService.createPlan(body).subscribe({
      next: () => {
        alert('Plan creado 🔥');

        // reset rápido
        this.selectedUser = '';
        this.selectedExercises = [];
        this.sets = 3;
        this.reps = 10;
        this.restSeconds = 60;
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear plan');
      },
    });
  }

  loadPlans() {
    this.workoutPlanService.getAllPlans().subscribe((res: any) => {
      this.plans = res.data;
      this.cdr.detectChanges();
    });
  }
}
