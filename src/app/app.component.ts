import {Component, OnInit} from '@angular/core';
import {Employee} from "./Model/employee";
import {EmployeeService} from "./Service/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  selectEmployee!:number;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees():void{

    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee?:any,mode?:string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode=='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode=='update'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode=='delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }


  public onAddEmloyee(employee: any): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  public onAddEmloyee1(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {

    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.employeeFirstName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

}
