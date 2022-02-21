import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'crud-shop';
  displayedColumns: string[] = ['fullName', 'job', 'date', 'hours', 'salary','comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployers();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed()
      .subscribe(
        value => {
          if(value === 'save'){
            this.getAllEmployers();
          }
        }
      )
  }

  getAllEmployers(){
    this.api.getEmployer()
    .subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        alert(error)
      }
    })
  }

  editEmployer(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed()
    .subscribe(
      value => {
        if(value === 'update'){
          this.getAllEmployers();
        }
      }
    )
  }

  deleteEmployer(id: number){
    if(confirm("Employer Removed")){
     this.api.deleteEmployer(id)
    .subscribe({
      next: (response) => {
        this.getAllEmployers();
      }
    })
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

