import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Professional {
  id: number;
  name: string;
  specialty: string;
  crm: string;
  contact: string;
  email: string;
  hire_date: Date;
  start_time: string;
  end_time: string;
  status: boolean;
}

@Component({
  selector: 'app-crud-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-view.component.html',
})
export class CrudViewComponent implements OnInit {
  professional!: Professional; 
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da rota
    if (id) {
      this.getProfissional(id);
    }
  }

  getProfissional(id: string): void {
    this.http.get<Professional>(`http://localhost:8000/api/professionals/${id}`).subscribe({
      next: (data) => {
        this.professional = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao buscar o profissional. Tente novamente.';
        console.error('Erro ao buscar profissional:', error);
        this.isLoading = false;
      }
    });
  }
}
