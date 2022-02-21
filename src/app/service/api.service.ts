import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  fullName:string ,
  job: string ,
  hours:string ,
  salary: number,
  comment:string ,
  date: Date ,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployer(data: any): Observable<Employee[]> {
    return this.http.post<Employee[]>('http://localhost:3000/employerList/', data);
  }

  getEmployer(){
    return this.http.get<Employee[]>('http://localhost:3000/employerList/');
  }

  putEmployer(data: any, id: number){
    return this.http.put<Employee[]>('http://localhost:3000/employerList/' + id, data);
  }

  deleteEmployer(id: number){
    return this.http.delete<Employee[]>('http://localhost:3000/employerList/' + id);
  }
}
