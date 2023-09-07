import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-afficheractivite',
  templateUrl: './afficheractivite.component.html',
  styleUrls: ['./afficheractivite.component.css']
})
export class AfficheractiviteComponent implements OnInit {
  tab!: any[];
  constructor(private auth: AuthService, private dataService: DataService, private mh: AngularFirestore,
    private changeDetector: ChangeDetectorRef, private data: DataService, private routes: ActivatedRoute) { }

    
  ngOnInit(): void { 
    this.recupererActivite()
  }


  

 // prospectId = '';

  recupererActivite() {
    const prospectId = this.routes.snapshot.params['prospectId']
    console.log(prospectId);
    this.dataService.getActivitiesForProspect(prospectId)
      .subscribe((documentChanges: DocumentChangeAction<any>[]) => {
        const activ = documentChanges.map((change) => {
          return {
            id: change.payload.doc.id,
            ...change.payload.doc.data()
          };
        });
        console.log(activ); 
        // Affichez les données dans la console
        this.tab=activ;
      });
  }

}
