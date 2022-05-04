import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../Model/employee";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class EmployeeService{
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
  }

  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee:Employee): Observable<Employee>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(employee);
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,body,{'headers':headers});
  }

  public updateEmployee(employee:Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
  }

  public deleteEmployee(employeeId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
