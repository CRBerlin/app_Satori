import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);

  users: any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    role: new FormControl('user', { nonNullable: true }),
  });

  createUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usersService.createUser(this.form.getRawValue()).subscribe({
      next: () => {
        this.loadUsers();
        this.form.reset({ role: 'user' });
      },
      error: (err) => console.error(err),
    });
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
      this.cdr.detectChanges();
    });
  }
}
