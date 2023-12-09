import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  template: '<img [src]="path" id="auth-image">',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  path : string = "../../../../../assets/images/login-image.png";
}
