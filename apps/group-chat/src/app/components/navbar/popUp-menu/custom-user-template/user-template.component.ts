import { Component, Input } from '@angular/core';
@Component({
  selector: 'user-template',
  templateUrl: './user-template.component.html',
})
export class UserTemplateComponent {
  @Input() username?: string;
  @Input() role?: string;
}
