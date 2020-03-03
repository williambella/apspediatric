import { Router } from '@angular/router';
import { MessagesService } from '@core/services/messages.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Login } from '@core/models/login';
import { User } from '@core/models/user';
import { MessagesStatus } from '@core/enum/messages-status.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messagesService: MessagesService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      this.userService.login(this.formGroup.value as Login)
      .subscribe((user: User) => {
        this.userService.setUSer(user);
        this.messagesService.message('auth.successful', MessagesStatus.SUCCESS);

        this.router.navigate(['/']);
      });
    }
  }

}
