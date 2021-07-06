import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slide_principal') slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatar_slide_options = {
    slidesPerView: 3.5
  }

  slide_principal_options = {
    allowTouchMove: false
  }

  loginUser = {
    mail: "",
    password: ""
  }

  signUpUser = {
    mail: '',
    password: '',
    name: '',
    role: 'USER_ROLE'
  }

  constructor(private userService: UserService, private navCtrl: NavController, private alertCtrl: AlertController) { }

  ngOnInit() { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async login(formLogin: NgForm) {

    if (formLogin.invalid) { return; }

    const valid = await this.userService.login(this.loginUser.mail, this.loginUser.password);

    console.log(valid);
    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      await this.presentAlert('Email or password incorrect');
    }
  }

  async signup(formSignUp: NgForm) {
    if (formSignUp.invalid) { return; }

    const valid = await this.userService.signup(this.signUpUser);

    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      await this.presentAlert('Data incorrect');
    }

    console.log(valid);
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    avatar.seleccionado = true;
  }

  getSignup() {
    this.slides.slideTo(0, 500);
  }

  getLogin() {
    this.slides.slideTo(1, 500);
  }
}
