import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Scheduler } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "X-TBA-Auth-Key": ""
  })
};

interface loginData {
  success: boolean,
  message: string,
  name: string,
  display: string,
  email: string,
  id: number
}

interface signupData {
  success: boolean,
  message: string,
  name: string,
  display: string,
  email: string,
  id: number
}

interface scheData {
  p1: string,
  p2: string,
  p3: string,
  p4: string,
  p5: string,
  p6: string,
  p7: string,
  p8: string
}

interface status {
  meesage: string
}

interface timeData {
  block: string,
  sche: string,
  scheArray: string,
  startAndEnd: string
}

interface sendemail {
  back: string
}

interface version {
  version: string
}

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }
  private path = "http://localhost/seeyourschedule.com/";
  //private path = "/php/";

  sendEmail(non:any) {
    return this.http.post<sendemail>(this.path + 'sendEmail.php', {
      non
    })
  }

  getScheVersion(non: any) {
    return this.http.post<version>(this.path + 'getScheVersion.php', {
      non
    })
  }

  getSche(non: any) {
    return this.http.post<timeData>(this.path + 'scheduleYuhan(1).php', {
      non
    })
  }

  updatePeriod(id: any, val: any, idin: any) {
    return this.http.post<status>(this.path + 'updatePeriod.php', {
      id,
      val,
      idin
    })
  }

  updateUsername(id: any, val: any) {
    return this.http.post<status>(this.path + 'updateUsername.php', {
      id,
      val
    })
  }

  updateDisplay(id: any, val: any) {
    return this.http.post<status>(this.path + 'updateDisplay.php', {
      id,
      val
    })
  }

  updateEmail(id: any, val: any) {
    return this.http.post<status>(this.path + 'updateEmail.php', {
      id,
      val
    })
  }

  getPeriods(id: any) {
    return this.http.post<scheData>(this.path + 'getPeriods.php', {
      id
    })
  }

  login(name: any, password: any) {
    return this.http.post<loginData>(this.path + 'login.php', {
      name,
      password
    })
  }

  signup(username: any, display: any, email: any, password: any, passwordc: any, check: any) {
    return this.http.post<signupData>(this.path + 'signup.php', {
      username,
      display,
      email,
      password,
      passwordc,
      check
    })
  }
}
