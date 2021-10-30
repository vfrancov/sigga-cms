import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Combo } from '@app/core/models/domains/combo.interface';
import { DataEmployee, EditEmployee, Employee, FilterEmployee, FormEmployee } from '@app/core/models/domains/employee.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class EmployeesService {

  constructor(
    private http: HttpClient,
    private storage: LocalstorageService
  ) { }

  getListEmployees(payload: FilterEmployee, type?: number): Observable<Employee> {
    let endpoint = (type === undefined) ? 'api/employee/all' : 'api/employee/all/' + type;
    return this.http.post<Employee>(`${environment.API}/${endpoint}`, payload, {
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  createEmployee(payload: FormEmployee): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.API}/api/employee`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  editEmployee(payload: FormEmployee, idEmployee: number): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${environment.API}/api/employee/${idEmployee}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    })
  }

  updateEmployee(payload: EditEmployee, idEmployee: number): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${environment.API}/api/employee/${idEmployee}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    })
  }

  combos(endpoint: string): Observable<Array<Combo>> {
    return this.http.get<Array<Combo>>(`${environment.API}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  exportExcel(payload: FilterEmployee): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.API}/api/employee/all`, payload, {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storage.getToken()}`,
        'responseType': 'text'
      }
    });
  }

  downloadFile(fileId: any): Observable<any> {
    return this.http.get(`${environment.API}/api/Download/${fileId}`, {
      responseType: 'blob' as 'json',
      headers: {
        'accept': 'text/plain',
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  createUserControl(idEmployee: number, password: string, isUserAdmin: boolean, isResidential: number): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.API}/api/Employee/SetUserControl`, { employeeId: idEmployee, password: password, isUserAdmin: isUserAdmin, isResidential: isResidential }, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  associateSedeControl(idEmployee: number, sedes: Array<any>): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.API}/api/employee/employeeControlSedes`, { employeeId: idEmployee, sedesId: sedes }, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }

  activateOrInactivateEmployee(id: number, status: number): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${environment.API}/api/employee/${id}/${status}`, {}, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      }
    });
  }
}
