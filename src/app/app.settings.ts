import { environment } from '../environments/environment';

export class AppSettings {
  public protocol = 'https://';
  public apiIp = this.protocol + environment.location;
  public apiUrl = this.apiIp + '/';
}
