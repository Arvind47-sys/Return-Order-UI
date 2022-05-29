import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRegisterModel } from '../models/login-Register.model';
import { AccountService } from '../services/account.service';
import { ComponentProcessingService } from '../services/component-processing.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  model: LoginRegisterModel = {} as LoginRegisterModel;
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private componentProcessingService: ComponentProcessingService
  ) {}

  loggedInUserInfo$ = this.accountService.currentUser$;

  ngOnInit(): void {}

  login() {
    if (!this.model.username?.length) this.toastr.error('Username is required');
    if (!this.model.password?.length) this.toastr.error('Password is required');
    if (this.model.username?.length && this.model.password?.length) {
      this.accountService.login(this.model).subscribe(
        () => {
          this.toastr.info('Logged in');
        },
        (err) => {
          this.toastr.error(err.error);
          console.log(err);
        }
      );
    }
  }

  logout() {
    var processStatus = this.componentProcessingService.getProcessState();
    if (!processStatus) {
      this.accountService.logOut();
    } else {
      if (
        confirm(
          'Are you sure you want to Log Out, your current return request submission will be lost!!!!'
        )
      ) {
        this.componentProcessingService.resetProcessState();
        this.accountService.logOut();
      }
    }
  }
}
