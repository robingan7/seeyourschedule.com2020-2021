import { Component ,OnInit} from '@angular/core';
import { ServiceService } from './services/service.service';
import { DataTransferService } from './services/data-transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private auth: ServiceService,
    private dataTransfer: DataTransferService){}
    
  ngOnInit(){

    this.auth.getScheVersion("non").subscribe(data2 => {
      if (localStorage.getItem("smlunch.ga_scheVersion") != data2.version) {
        localStorage.setItem("smlunch.ga_scheVersion", data2.version);
        this.auth.getSche("non").subscribe(data => {
          localStorage.setItem("smlunch.ga_sche", JSON.stringify(data));
          this.datelist = data.scheArray;
          this.load = false;
        });
      } else {
        let data = JSON.parse(localStorage.getItem('smlunch.ga_sche'));
        this.datelist = data.scheArray;
        this.load = false;
      }
    });

    /*
    this.auth.getSche("non").subscribe(data => {
      this.datelist = data.scheArray;
      this.load = false;
      
      update scheArray
      let newssss = JSON.stringify(this.datelist).replaceAll('2020', '2021');
      newssss = newssss.replaceAll('2019', '2020');
      console.log(newssss);
    });*/

    setInterval(()=>{
      this.hexClock()

      if(this.displayNom != this.monnum){
        this.displayNom = this.monnum
      }
    },1000)
  }
  title = 'SM Lunch';
  lat: number = 51.678418;
  lng: number = 7.809007;
  private isManual = false
  private datelist 
  private load = true
  private clock = "11 : 00 : 00"
  private date = "2019-8-11"
  private monnum = "2019-8-11"
  private displayNom = ""
  switch(e){
    var tee = (<HTMLElement>document.getElementById('currentTimes'))
    e.preventDefault();
    var inn = e.target.innerText
    if(inn == "Current"){
      e.target.innerText = "Manual"
      tee.style.display = "none"
      this.isManual = true
    }else{
      e.target.innerText = "Current"
      tee.style.display = "block"
      this.isManual = false
      this.dataTransfer.setIsAuto(true)
    }
  }
  changeData(){
    this.dataTransfer.setIsAuto(false)
    var b = this.dataTransfer.getisChange
    this.dataTransfer.setIsChange(!b)
  }

  hexClock() {
      var time = new Date();
      var hours = (time.getHours()).toString();
      var minutes = time.getMinutes().toString();
      var seconds = time.getSeconds().toString();

      if (hours.length < 2) {
        hours = '0' + hours;
      }

      if (minutes.length < 2) {
        minutes = '0' + minutes;
      }

      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }

      var clockStr = hours + ' : ' + minutes + ' : ' + seconds;
      var dateStr = time.toDateString();
        this.clock = clockStr;
        //this.clock = "11 : 00 : 00";
        this.date = dateStr;
        //this.date = "2019-8-15";
        this.monnum = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
        //this.monnum = "2019-8-13";
  } 

}
