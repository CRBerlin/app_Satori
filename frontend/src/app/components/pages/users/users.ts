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
  selectedUserId = '';
  isEditMode = false;

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
    this.isEditMode = false;
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

  editUser(user: any) {
    this.selectedUserId = user._id;
    this.isEditMode = true;

    this.form.patchValue({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
  }

  updateUser() {
    const formData = this.form.getRawValue();

    const data: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    // Solo enviar password si existe
    if (formData.password?.trim()) {
      data.password = formData.password;
    }

    this.usersService.updateUser(this.selectedUserId, data).subscribe({
      next: () => {
        this.loadUsers();

        this.form.reset({
          role: 'user',
        });
      },

      error: (err) => console.error(err),
    });
  }

  deleteUser(id: string) {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este usuario?');

    if (!confirmDelete) return;

    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },

      error: (err) => console.error(err),
    });
  }
}
