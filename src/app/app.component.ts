import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UiserviceService } from './core/services/control';
import { LocalstorageService } from './core/services/storage/localstorage.service';
import { default as translate } from "../assets/i18n/es.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck, AfterViewInit {

  constructor(
    private storage: LocalstorageService,
    private ui: UiserviceService,
    private config: PrimeNGConfig) { }

  ngOnInit() {
    this.storage.checkSession();
    this.setTemplateScripts();
    this.config.setTranslation(translate.primeng);
  }

  ngAfterViewInit(): void {
    this.setBackgroundBySession();
  }

  ngDoCheck(): void {
    this.setBackgroundBySession();
  }

  setBackgroundBySession() {
    let bodyApp = document.querySelector('#bodyapp');
    let session = this.storage.getData('us');

    if (session !== null) {
      if (bodyApp.classList.contains('bg-default'))
        bodyApp.classList.remove('bg-default');
    }
    else
      bodyApp.classList.add('bg-default');
  }

  setTemplateScripts() {
    let js = ['vendor/js-cookie/js.cookie.js', 'js/argon.js', 'js/demo.min.js'];

    js.forEach((element, index) => {
      if (document.getElementById(element))
        document.getElementById(element).remove();
      else {
        let script = document.createElement("script");
        script.setAttribute("id", index.toString());
        script.setAttribute("src", `./assets/${element}`);
        document.body.appendChild(script);
      }
    });
  }
}
