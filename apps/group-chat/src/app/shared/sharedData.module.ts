import { NgModule } from '@angular/core';
import { SharedDataService } from './services/sharedDataService';
import { AuthGuard } from './guards/authentication.guard';

@NgModule({

  providers: [SharedDataService,AuthGuard],
})
export class SharedDataModule {}
