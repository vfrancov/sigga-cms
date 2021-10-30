import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'terminalStatus'
})
export class TerminalStatusPipe implements PipeTransform {
  transform(data: any, index: number): boolean {
    let getModules = Object.keys(data).map(item => item.match('module')).filter(item => item != null).map(item => item['input']);
    let statusTerminal = JSON.parse(data[getModules[index]]);

    return (statusTerminal?.status);
  }
}
