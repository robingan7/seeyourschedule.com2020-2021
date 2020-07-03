import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../../services/service.service';
import { DataTransferService } from '../../services/data-transfer.service';

@Component({
  selector: 'app-quick-check',
  templateUrl: './quick-check.component.html',
  styleUrls: ['./quick-check.component.css']
})
export class QuickCheckComponent implements OnInit {

  constructor(private auth: ServiceService,
    private cookie: CookieService,
    private dataTransfer: DataTransferService) { }

  private luncper = {
    startPeriod:'',
    startTime:'',
    type:'DAY OFF'
  };
  private isDone = false
  private isShowTimeBar;
  private lunchOfDay
  private todaytimes
  private date
  private isLoad
  private todayblock
  private todayblockD
  private blockAndTime
  private room
  private blocktypes = {
    R: `Regular`,
    S: `Single Block Mtg`,
    D: `Double Block Mtg`,
    Mn: `Minimum`,
    All: `All Periods`,
    Ms: `Mass`,
    Rly: `Rally`,
    A: `Assembly`,
    Sp: `Special`,
    RE: `Regular ETV`,
    SE: `Single Block Mtg ETV`,
    RlyE: `Rally ETV`,
    SpE: `Special ETV`,
    AP: `Academic Period`,
    MsE: 'Mass Special',
    OHM: 'Office hour meeting',
    TA: 'Modified schedule Trial run All periods',
    TR: 'Modified schedule Trial run Regular day',
    TM: 'Modified schedule Trial run Meeting',
    Ex: 'Exam',
    ExO: 'Exam',
    Online: `Online Instruction Periods`,
    OnlineOffice: `Online Instruction Periods`,
    OnlineAll: `Online Instruction Periods`,
    LAR: 'Late Academic Regular',
    LAM: 'Late Academic Meeting',
    Mt: 'Meeting'
  }
  private isAAuto = true
  private isDateChange = false
  private isGotDate = false
  private forFormerD = ""
  
  ngOnInit() {
    this.getSche();
    this.room = this.cookie.get("tem_smlunch");
    document.querySelector('#linkToLogin').classList.remove('active');
    document.querySelector('#linkToQuickCheck').classList.add('active');
    document.title = "Home | See Your Schedule";

    if (this.room == 'B' || this.room == 'C' || this.room == 'S' || this.room == 'G115' || this.room == 'G116'
      || this.room == 'G117' || this.room == 'Talon') {
      this.lunchOfDay = "First Lunch"
    } else if (this.room == '') {
      this.lunchOfDay = "1st or 2nd lunch"
    } else {
      this.lunchOfDay = "Second Lunch"
    }

    setInterval(() => {
      if (this.date == "00 : 00 : 01" || !this.isGotDate) {
        this.getSche()
      }

      var b = this.dataTransfer.getisAuto
      if (b != this.isAAuto) {
        this.isAAuto = b;
        this.getSche();
      }

      var b2 = this.dataTransfer.getisChange
      if (!this.isAAuto && b2 != this.isDateChange) {
        this.getSche();
        this.isDateChange = b2;
      }

      var mmmm = (<HTMLButtonElement>document.querySelector("#monnum"))
      if (mmmm != undefined && this.forFormerD != mmmm.innerText && this.isAAuto) {
        this.getSche();
        this.forFormerD = mmmm.innerText;
      }

    }, 1000)
  }

  getSche() {
    try {
      //this.auth.getSche("non").subscribe(data => {
      let data = JSON.parse(localStorage.getItem('smlunch.ga_sche'));

      if (this.isAAuto) {
        this.date = (<HTMLButtonElement>document.querySelector("#monnum")).innerText
      } else {
        this.date = (<HTMLButtonElement>document.querySelector("#manual_date")).value
      }
      //for testing
      //this.date = "2019-9-11"

      this.todayblock = data.block[this.date];

      if (this.todayblock == undefined || this.todayblock == 'Off') {
        this.luncper = {
          startPeriod: '',
          startTime: '',
          type: 'DAY OFF'
        };
        this.isShowTimeBar = false;
      } else {
        let type = this.todayblock.substring(0, this.todayblock.length - 1);
        let timeLL = data.sche[type];
        let period = this.todayblock[this.todayblock.length-1];
        let periodCopy = period;
        let start = '8:00';
        let firstClass = Object.keys(timeLL)[0];

        
        if (firstClass == 'Meeting') {
          start = '9:00';
          if (Object.keys(timeLL)[1].includes('Block')) {
            period = 'period ' + period;
          } else {
            period = Object.keys(timeLL)[1];
          }
        } else {
          if (firstClass.includes('Block')) {
            period = 'period ' + period;
          } else {
            period = firstClass;
          }

          let fff = timeLL[firstClass];
          start = fff.split('-')[0];
        }

        if(type.includes('Sp')) {
          type = 'Sp';
        }
        type = this.blocktypes[type];

        this.luncper = {
          startPeriod: period,
          startTime: start,
          type: type + periodCopy
        };
        this.isShowTimeBar = true;
      }
    //});
    } catch {

    }
    
  }
}
