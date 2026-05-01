import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../services/departments';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './department-detail.html',
  styleUrl: './department-detail.css',
})
export class DepartmentDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly deptService = inject(DepartmentsService);
  private readonly cdr = inject(ChangeDetectorRef);

  department: any;
  employees: any[] = [];

  ngOnInit() {
    const code = Number(this.route.snapshot.paramMap.get('code'));

    this.deptService.getDepartmentWithEmployees(code).subscribe({
      next: (res: any) => {
        this.department = res.data.department;
        this.employees = res.data.employees;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('ERROR:', err),
    });
  }
}
