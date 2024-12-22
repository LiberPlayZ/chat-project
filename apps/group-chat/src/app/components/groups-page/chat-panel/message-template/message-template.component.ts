import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Buffer } from 'buffer';
@Component({
  selector: 'message-template',
  templateUrl: './message-template.component.html',
})
export class MessageTemplateComponent implements OnInit {

  @Input() username!: string;
  @Input() text!: string;
  @Input() date!: Date;
  @Input() connectedUser!: string | null;
  @Input() image?: any;
  imageSrc?: string;

  ngOnInit(): void {
    if (this.image &&  this.image !== undefined) {

      const base64String = Buffer.from(this.image.data, "binary").toString('base64')

      this.imageSrc = `data:image/jpg;base64,${base64String}`;
    }


  }


  public getClassByConnectedUser(messageUserName: string): string {
    if (messageUserName === this.connectedUser) return 'bg-green-400'
    return 'bg-blue-400 '
  }



}
