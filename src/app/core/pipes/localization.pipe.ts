import { Pipe, PipeTransform } from "@angular/core";
import { Dictionary } from "../constants/dictionary";
import { AuthResponse } from "../models/domains/auth.response";
import { Roles } from "../models/enums/roles";
import { LocalstorageService } from "../services/storage/localstorage.service";

@Pipe({
  name: 'localization'
})
export class LocalizationPipe implements PipeTransform {

  constructor(private storage: LocalstorageService) { }

  transform(key: string, property: string): string {
    const typeUser: AuthResponse = this.storage.getData('us');
    let pickControlDictionary = (typeUser.isResidential) ? 'control_residencial' : 'control_empresa';

    if (typeUser.isResidential && typeUser.rolId === Roles.control)
      return Dictionary[pickControlDictionary][key][property];
    else if (typeUser.rolId === Roles.empresa)
      return Dictionary[typeUser.rolId][key][property];
    else if (typeUser.rolId === Roles.residencial)
      return Dictionary[typeUser.rolId][key][property];
    else
      return Dictionary[pickControlDictionary][key][property];
  }
}
