import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-tableaubord',
  templateUrl: './tableaubord.component.html',
  styleUrls: ['./tableaubord.component.css']
})
export class TableaubordComponent implements OnInit {
  nombreTotalProspects: number = 0;
  nombreTotalServices: number = 0;
  nombreTotalOffres: number = 0;
  nombreTotalProspectsClients: number = 0;
  nombreTotalActivitesSuivi: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getNombreTotalProspects().then(totalProspects => this.nombreTotalProspects = totalProspects);
    this.dataService.getNombreTotalServices().then(totalServices => this.nombreTotalServices = totalServices);
    this.dataService.getNombreTotalOffres().then(totalOffres => this.nombreTotalOffres = totalOffres);
    this.dataService.getNombreTotalProspectsStatutClient().then(totalProspectsClients => this.nombreTotalProspectsClients = totalProspectsClients);
    this.dataService.getNombreTotalActivitesSuivi().then(totalActivitesSuivi => this.nombreTotalActivitesSuivi = totalActivitesSuivi);
 
    
    
    
  }
}
