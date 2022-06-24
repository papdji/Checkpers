import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signUp(this.credentialForm.value).then(user => {
      loading.dismiss();
      // replaced URL faz com que o utilizador não possa retroceder no Android
      this.router.navigateByUrl('/tabs/feed', { replaceUrl: true });
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Sign up failed',
        message: err.message,
        buttons: ['OK'],
      });

      await alert.present();
    });
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signIn(this.credentialForm.value).then(user => {
      loading.dismiss();
      // replaced URL faz com que o utilizador não possa retroceder no Android
      this.router.navigateByUrl('/tabs/feed', { replaceUrl: true });
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Sign in failed',
        message: err.message,
        buttons: ['OK'],
      });

      await alert.present();
    });
  }

  // aceder aos valors da form para poder validar
  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }

}