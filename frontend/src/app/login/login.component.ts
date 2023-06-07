import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (this.loginForm.valid)
    {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const confirmPassword = this.loginForm.value.confirmPassword;

      if (email === 'test@test.at' && password === '12345678' && confirmPassword === '12345678')
      {
        console.log('Login erfolgreich');
        alert('Login erfolgreich.');
        this.authService.setCurrentUser(email);
        this.router.navigate(['/landing-page']).then(r => console.log('Weiterleitung zur Landing Page'));
        this.isLoggedIn = true;
      } else
      {
        console.log('Login fehlgeschlagen');
        this.isLoggedIn = false;
      }
    }
    else
    {
      alert('Username und Passwort sind erforderlich');
    }
  }
}
