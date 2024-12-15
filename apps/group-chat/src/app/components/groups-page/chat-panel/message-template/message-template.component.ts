import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'message-template',
  templateUrl: './message-template.component.html',
})
export class MessageTemplateComponent implements OnInit {
  ngOnInit(): void {
    
  }
  @Input() username!: string;
  @Input() text!: string;
  @Input() date!: Date;
  @Input() connectedUser!: string | null;


  public getClassByConnectedUser(messageUserName:string):string{
    if (messageUserName === this.connectedUser) return 'bg-green-400'
    return 'bg-blue-400 '    
  }
}
