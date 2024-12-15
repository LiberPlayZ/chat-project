import { NgModule } from '@angular/core';
import { GroupsComponentStore } from './group-component-store.service';
@NgModule({
  providers: [GroupsComponentStore],
  exports: [],
})
export class GroupComponentStoreModule {}
