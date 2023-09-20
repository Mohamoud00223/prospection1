import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {


  constructor(private auth : AuthService, private router: Router) { }

  // navigateToAddProspect(){
  //   this.router.navigate(['/dashboard/liste-prospect']);
  // }

  ngOnInit(): void {
    // window.location.reload();
  }

  logout() {
    this.auth.logout();
  }

  
}
