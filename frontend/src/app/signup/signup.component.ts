import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AuthService} from "../services/authService";
import { catchError } from 'rxjs/operators';
import {throwError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      company: ['FH Technikum Wien'],
      address: [''],
      postalCode: ['', Validators.pattern('^[0-9]*$')],
    }, {validator: this.checkPasswords });

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit() {}

  hidePassword = true;
  hideConfirmPassword = true;
  submitted = false;

  checkPasswords(group: FormGroup)
  {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    if (pass !== confirmPass)
    {
      group.controls['confirmPassword'].setErrors({ notSame: true });
    }
    else
    {
      group.controls['confirmPassword'].setErrors(null);
    }
  }

  signUp() {
    if (this.signupForm.valid)
    {
      const username = this.signupForm.get('email')!.value;
      const password = this.signupForm.get('password')!.value;

      this.signUpRequest(username, password);

      console.log('Registrierung erfolgreich.');
      alert('Ihre Registrierung war erfolgreich');
      this.submitted = true;

    } else {
      console.log('Registrierung fehlgeschlagen');
      alert('Alle erforderlichen Felder müssen korrekt ausgefüllt sein');
      this.submitted = false;
    }
  }

  signUpRequest(username: string, password: string)
  {
    this.authService.signUp(username, password).pipe(
        catchError(error => {
          console.error('Registrierung fehlgeschlagen', error);
          return throwError(error);
        })
    ).subscribe(response => {
      console.log('Registrierung erfolgreich.', response);
    });
  }
}
