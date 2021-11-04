import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { statusCode } from '@app/core/constants/status.responses';
import { UserAuthenticationModel } from '@app/core/models/domains/user.authentication.model';
import { Authentication } from '@app/core/models/enums/buttons';
import { CacheService } from '@app/core/services/auth/cache.service';
import { LoginService } from '@app/core/services/auth/login.service';
import { SedesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showMessageError: boolean = true;
  btnAuthSigga: string = Authentication.BUTTON_AUTH;

  frmAuthSigga: FormGroup;

  constructor(
    private auth: LoginService,
    private formBuilder: FormBuilder,
    private route: Router,
    private sedesservice: SedesService,
    private storage: LocalstorageService,
    private cache: CacheService) { }

  ngOnInit() {
    this.cache.removeKey('us');
    this.initializeForm();
  }

  initializeForm() {
    this.frmAuthSigga = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  siggaUserAuth(formData: UserAuthenticationModel) {
    this.btnAuthSigga = Authentication.BUTTON_PROGRESS;

    this.auth.siggaUserAuthentication(formData).subscribe((response) => {
      if (response.status === statusCode.SUCCESS) {
        if (response.body.isHeaquarter) {
          this.checkRolUser(response.body.rolId);
        }
        else {
          this.checkRolUser(response.body.rolId);
          this.handlerError(response.status);
        }
      }
      else
        this.handlerError(response.status);

      this.btnAuthSigga = Authentication.BUTTON_AUTH;
      this.cache.setKey('us', response.body);

      this.sedesservice.getSedesByUser().subscribe(response => {
        if(response.body.length > 0)
          this.storage.setData('IdSede', response.body[0].id);
      });
    }, (error) => {
      this.handlerError(error)
      this.btnAuthSigga = Authentication.BUTTON_AUTH;
    });
  }

  checkRolUser(rolUser: number) {
    switch (rolUser) {
      case 0:
        this.route.navigate(['/dashboard/home/empleados']);
        break;
      case 2:
        this.route.navigate(['/dashboard/home/empleados']);
        break;
      case 3:
        break;
      case 4:
        this.route.navigate(['/dashboard/control/monitor']);
        break;
      default:
        this.route.navigate(['/dashboard/home/empleados']);
        break;
    }
  }

  handlerError(error) {

    switch (error.status) {
      case 204:
        this.showMessageError = false;
        break;
      case 400:
        this.showMessageError = false;
        break;
      case 500:
        this.showMessageError = false;
      default:
        this.showMessageError = false;
        break;
    }

    this.handleTimeError();
  }

  handleTimeError() {
    setTimeout(() => {
      this.showMessageError = true;
    }, 2500);
  }
}
