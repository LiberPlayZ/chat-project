import { NgModule } from '@angular/core';
import { ChatComponentStore } from './chat-component-store.service';
@NgModule({
  providers: [ChatComponentStore],
  exports: [],
})
export class ChatComponentStoreModule {}
