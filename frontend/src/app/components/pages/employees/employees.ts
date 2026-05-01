import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  private readonly employeeService = inject(EmployeesService);
  private readonly cdr = inject(ChangeDetectorRef);

  employees: any[] = [];
  
  isEditMode = false;
  currentEmployeeCode: number | null = null;

  form = new FormGroup({
    employeeCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName1: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName2: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    departmentCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employees = res.data;
      this.cdr.detectChanges();
    });
  }

  createEmployee() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.employeeService.create(this.form.getRawValue()).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err),
    });
  }

  updateEmployee() {
    if (this.form.invalid || this.currentEmployeeCode === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.employeeService.update(this.currentEmployeeCode, this.form.getRawValue()).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err),
    });
  }

  afterSave() {
    this.loadEmployees();
    this.form.reset();
    this.isEditMode = false;
    this.currentEmployeeCode = null;

    const modal = document.getElementById('modalEmpleado');
    (globalThis as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  trackByCode(index: number, emp: any) {
    return emp.employeeCode;
  }

  editEmployee(emp: any) {
    this.form.setValue({
      employeeCode: emp.employeeCode,
      firstName: emp.firstName,
      lastName1: emp.lastName1,
      lastName2: emp.lastName2,
      departmentCode: emp.departmentCode,
    });

    this.currentEmployeeCode = emp.employeeCode;
    this.isEditMode = true;
  }

  deleteEmployee(employeeCode: number) {
    if (!confirm('¿Eliminar empleado?')) return;

    this.employeeService.delete(employeeCode).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => console.error(err),
    });
  }
}
