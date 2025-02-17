import { Component, Input } from "@angular/core";

@Component({
  selector: 'image-preview',
  templateUrl:'./image-preview.component.html'

})
export class ImagePreviewComponent {

    @Input() imageUrl?:string


}