import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentsService } from '../../../services/departments';
import { EmployeesService } from '../../../services/employees';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments implements OnInit {
  private readonly deptService = inject(DepartmentsService);
  private readonly empService = inject(EmployeesService);
  private readonly cdr = inject(ChangeDetectorRef);

  departments: any[] = [];
  employees: any[] = [];

  isEditMode = false;
  currentDepartmentCode: number | null = null;

  form = new FormGroup({
    departmentCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    departmentName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.deptService.getAllDepartments().subscribe((res: any) => {
      this.departments = res.data;
      this.cdr.detectChanges();
    });
  }

  loadEmployees() {
    this.empService.getAllEmployees().subscribe((res: any) => {
      this.employees = res.data;
      this.cdr.detectChanges();
    });
  }

  createDepartment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const data = {
      departmentCode: Number(raw.departmentCode),
      departmentName: raw.departmentName.trim(),
    };

    this.deptService.create(data).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err),
    });
  }

  updateDepartment() {
    if (this.form.invalid || this.currentDepartmentCode === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.deptService.update(this.currentDepartmentCode, this.form.getRawValue()).subscribe({
      next: () => this.afterSave(),
      error: (err) => console.error(err),
    });
  }

  deleteDepartment(code: number) {
    if (!confirm('¿Eliminar departamento?')) return;

    this.deptService.delete(code).subscribe({
      next: () => this.loadDepartments(),
      error: (err) => console.error(err),
    });
  }

  editDepartment(dep: any) {
    this.form.setValue({
      departmentCode: dep.departmentCode,
      departmentName: dep.departmentName,
    });

    this.currentDepartmentCode = dep.departmentCode;
    this.isEditMode = true;
  }

  afterSave() {
    this.loadDepartments();
    this.form.reset();
    this.isEditMode = false;
    this.currentDepartmentCode = null;

    const modal = document.getElementById('modalDepartment');
    (globalThis as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  trackByCode(index: number, dep: any) {
    return dep.departmentCode;
  }

  getEmployeeCount(departmentCode: number) {
    return this.employees.filter((emp) => emp.departmentCode === departmentCode).length;
  }
}
