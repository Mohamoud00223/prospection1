import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {


  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    // window.location.reload();
  }

  logout() {
    this.auth.logout();
  }

}
