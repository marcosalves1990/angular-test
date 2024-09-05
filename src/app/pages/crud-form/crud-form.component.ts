import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm,FormControl } from '@angular/forms'; 
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    RouterLink, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatSelectModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './crud-form.component.html',
  styleUrl: './crud-form.component.scss'
})
export class CrudFormComponent {

  form: FormGroup;

   daysOfWeek = [
    { name: 'Segunda-feira' },
    { name: 'Terça-feira' },
    { name: 'Quarta-feira' },
    { name: 'Quinta-feira' },
    { name: 'Sexta-feira' },
    { name: 'Sábado' },
    { name: 'Domingo' },
  ];

  specialties: { especialidade: string }[] = [
    { especialidade: 'Pediatria' },
    { especialidade: 'Ginecologia' },
    { especialidade: 'Obstetrícia' },
    { especialidade: 'Neonatologia' },
    { especialidade: 'Endocrinologia Pediátrica' },
    { especialidade: 'Nutrição Infantil' },
    { especialidade: 'Genética Pediátrica' },
    { especialidade: 'Alergologia Pediátrica' },
  ];

  selectedSpecialty: string = ''; 
  status: boolean = true;

  
  onCheckboxChange(event: any) {
    const daysOfWeekControl = this.form.get('daysOfWeek');
    if (event.checked) {
      
      daysOfWeekControl?.value.push(event.source.value);
    } else {
      
      const index = daysOfWeekControl?.value.indexOf(event.source.value);
      if (index > -1) {
        daysOfWeekControl?.value.splice(index, 1);
      }
    }
    daysOfWeekControl?.setValue([...daysOfWeekControl.value]); 
  }
  
  constructor(private fb: FormBuilder, private http: HttpClient,private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    
    
    
    this.form = this.fb.group({
      name: [''],
      specialty: [''],
      crm: [''],
      contact: [''],
      email: [''],
      hire_date: [''],
      start_time: [''],
      end_time: [''],
      status: [true]
    });
  }
  //,
  //daysOfWeek: [[]]
  onSubmit(form: NgForm) {
    if (form.valid) {


      const formDataWithStatus = {
        ...form.value,
        status: Boolean(form.value.status == "true") 
      };
      
      this.http.post('http://localhost:8000/api/professionals', formDataWithStatus).subscribe(
        response => {
          console.log('Profissional cadastrado com sucesso!', response);
        },
        error => {
          console.error('Erro ao cadastrar o profissional:', error);
        }
      );
    }
  }

}
