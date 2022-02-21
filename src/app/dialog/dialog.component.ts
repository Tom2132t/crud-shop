import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  hoursList = ['Full Time', 'Part Time'];
  actionBtn: string = 'save';
  employerForm!: FormGroup;

  constructor(private  formBuilder: FormBuilder,
              private api: ApiService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject (MAT_DIALOG_DATA) public editData: any
              ) { }

  ngOnInit(): void {
    this.employerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      job: ['', Validators.required],
      hours: ['', Validators.required],
      salary: ['', [Validators.required,Validators.min(0)]],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
    
    if(this.editData){
      this.actionBtn = 'Update'; //changes button from save to edit
      this.employerForm.controls['fullName'].setValue(this.editData.fullName);
      this.employerForm.controls['job'].setValue(this.editData.job);
      this.employerForm.controls['hours'].setValue(this.editData.hours);
      this.employerForm.controls['salary'].setValue(this.editData.salary);
      this.employerForm.controls['comment'].setValue(this.editData.comment);
      this.employerForm.controls['date'].setValue(this.editData.date);

    }
  }

  addEmployer(){
    if(!this.editData){
      if(this.employerForm.valid){
        this.api.postEmployer(this.employerForm.value)
        .subscribe({
          next: (response)=>{
            alert('Product added successfully');
            this.employerForm.reset();
            this.dialogRef.close('save');
          },
          error: (response)=>{
            alert('Error while adding the employer')
          }
        })
      }
    }
    else{
      this.updateEmployer()
    }
  }

  updateEmployer(){
    this.api.putEmployer(this.employerForm.value, this.editData.id)
    .subscribe({
      next: (response) => {
        alert("Employer updated");
        this.employerForm.reset();
        this.dialogRef.close("update");
      }
    })
  }

}
