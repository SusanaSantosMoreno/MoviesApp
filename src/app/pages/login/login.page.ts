import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    mail: '',
    password: ''
  }

  @ViewChild('slide_principal') slides: IonSlides;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(formLogin: NgForm) {
    console.log(formLogin.valid);
    console.log(this.loginUser);
  }

  signup(formSignUp: NgForm) {
    console.log(formSignUp.valid)
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
