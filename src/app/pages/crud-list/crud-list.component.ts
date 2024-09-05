import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProfessionalService } from '../../professional.service';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [ConfirmationDialogComponent] 
})
export class SharedModule { }

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
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})
export class CrudListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'specialty', 'crm', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<Professional>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private professionalService: ProfessionalService ,private dialog: MatDialog,
    private snackBar: MatSnackBar, private http: HttpClient) { }


  ngOnInit(): void {
    this.getProfessionals();
  }

  getProfessionals(): void {
    this.professionalService.getProfessionals().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.error('Erro ao buscar profissionais:', error)
    );
  }

  deleteItem(element: Professional): void {
    // Abre o diálogo de confirmação
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Tem certeza de que deseja excluir este profissional?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se o usuário confirmar a exclusão, faz a chamada DELETE para a API
        this.http.delete(`http://localhost:8000/api/professionals/${element.id}`).subscribe({
          next: () => {
            // Atualiza a fonte de dados após a exclusão
            this.dataSource.data = this.dataSource.data.filter((item) => item !== element);
            
            // Mostra uma mensagem de sucesso
            this.snackBar.open('Profissional excluído com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: () => {
            // Mostra uma mensagem de erro se a exclusão falhar
            this.snackBar.open('Erro ao excluir profissional. Tente novamente.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }
}
