import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginRegisterModel } from '../models/login-Register.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: LoginRegisterModel = {} as LoginRegisterModel;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(() => {
      this.cancel();
      this.toastr.success('User is registered and logged in');
    }, error => {
      this.toastr.error(error.error);
      console.log(error);
    }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
