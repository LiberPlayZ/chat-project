import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import {
  LoggingState,
  SharedDataService,
  User,
  authenticating,
  isLoggingInFeature,
  loggingOut,
} from '../../../shared';
import { Store } from '@ngrx/store';
import { TransferGroupData } from '../../../shared/models/transfer_group_data.interface';

@Component({
  selector: 'popup-menu',
  templateUrl: './menu.component.html',
})
export class PopMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  currentUser!: Observable<User | null>;
  selectedGroupName: string | null = null;
  isDarkMode: boolean = false;
  showDialog: boolean = false;

  constructor(
    private store: Store<LoggingState>,
    private sharedService: SharedDataService
  ) {
    this.sharedService.selectedData$.subscribe(
      (transferData: { data: any; event: string }) => {
        if (transferData && transferData.event === 'OnGroupNameClick')
          this.selectedGroupName = transferData.data.name;
      }
    );
  }

  ngOnInit(): void {
    this.store.dispatch(authenticating());
    this.items = [
      {
        separator: true,
      },
      {
        label: 'Options',
        items: [
          {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.store.dispatch(loggingOut());
            },
          },
          {
            label: 'switch theme',
            icon: 'pi pi-palette',
            command: () => {
              this.switchTheme();
            },
          },
        ],
      },
    ];

    this.currentUser = this.store.select(isLoggingInFeature.selectUser);
  }

  openDialog() {
    this.showDialog = true;
  }

  handleDialogClose() {
    this.showDialog = false;
  }

  switchTheme() {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    this.isDarkMode = !this.isDarkMode;
    themeLink.href = this.isDarkMode
      ? 'assets/themes/bootstrap4-dark-purple/theme.css'
      : 'assets/themes/bootstrap4-light-purple/theme.css';
  }
}
