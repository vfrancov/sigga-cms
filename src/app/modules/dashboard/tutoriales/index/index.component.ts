import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexTutorialComponent implements OnInit {

  tutoriales = [{
    title: 'Crear áreas',
    video: 'https://www.youtube-nocookie.com/embed/kPbQBHRq6w8?controls=0',
    description: 'Registra tus áreas'
  },
  {
    title: 'Asignar área',
    video: 'https://www.youtube-nocookie.com/embed/Fl-lD4_9kjg?controls=0',
    description: 'Asigna tus áreas'
  },
  {
    title: 'Reasignar área',
    video: 'https://www.youtube-nocookie.com/embed/FLxWQx_ZW5M?controls=0',
    description: 'Reasigna tus áreas'
  },
  {
    title: 'Crear empleado',
    video: 'https://www.youtube-nocookie.com/embed/Bbtm1HxEhLU?controls=0',
    description: 'Crea los empleados que necesites.'
  },
  {
    title: 'Editar empleado',
    video: 'https://www.youtube-nocookie.com/embed/a_mGh9U3CmE?controls=0',
    description: 'Actualiza los datos de tus empleados.'
  },
  {
    title: 'Control de Aforo',
    video: 'https://www.youtube-nocookie.com/embed/1CMOBC4xkb0?controls=0',
    description: 'Control de aforo'
  }];
  videoSetted: any = {};
  showModal: boolean = false;
  video: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  setVideo(tuto) {
    this.videoSetted = tuto;
    this.showModal = true;
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoSetted.video);
    document.querySelector('body').classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    document.querySelector('body').classList.remove('modal-open');
  }
}
