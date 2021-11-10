import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresasContratistas, EmpresasContratistasAll, MemberContratista, MemberDetails, MemberList } from '@app/core/models/domains/contratistas.interface';
import { Filter } from '@app/core/models/domains/office.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class ContratistasService {

  constructor(private http: HttpClient, private localstorage: LocalstorageService) { }

  getEmpresasContratistas(payload: Filter): Observable<HttpResponse<EmpresasContratistasAll>> {
    return this.http.post<EmpresasContratistasAll>(`${environment.API}/api/ContratistaCompanies/All`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  createEmpresaContratista(payload: EmpresasContratistas): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.API}/api/ContratistaCompanies`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  updateEmpresaContratista(idEmpresa: number, payload: EmpresasContratistas): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.API}/api/ContratistaCompanies/${idEmpresa}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    })
  }

  deleteEmpresaContratista(idEmpresa: number, payload: any): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.API}/api/ContratistaCompanies/${idEmpresa}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  createMemberContratista(payload: MemberContratista): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.API}/api/ContratistaUser`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  readMembersEmpresa(idEmpresa: number, payload: Filter): Observable<HttpResponse<MemberList>> {
    return this.http.post<MemberList>(`${environment.API}/api/ContratistaCompanies/Users/${idEmpresa}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  updateMemberContratista(idMember: number, payload: MemberDetails): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.API}/api/ContratistaUser/${idMember}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  deleteMemberContratista(idMember: number, payload: any): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.API}/api/ContratistaUser/${idMember}`, payload, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }

  createContratistaControl(id: number, password: string): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.API}/api/ContratistaUser/SetUserControl`, { employeeId: id, password: password }, {
      observe: 'response',
      headers: {
        'Authorization': `Bearer ${this.localstorage.getToken()}`
      }
    });
  }
}
