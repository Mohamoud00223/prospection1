import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Prospect } from 'src/app/model/prospect';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etatprocessus',
  templateUrl: './etatprocessus.component.html',
  styleUrls: ['./etatprocessus.component.css']
})
export class EtatprocessusComponent implements OnInit{
  prospectList: Prospect[] = [];


constructor(private auth: AuthService, private dataService: DataService,  private mh : AngularFirestore,
  private changeDetector: ChangeDetectorRef ) { }

ngOnInit(): void {
  this.loadProspects();
}


loadProspects() {
  this.dataService.getAllProspects().subscribe((prospectsSnapshot) => {
    this.prospectList = prospectsSnapshot.map((snapshot) => {
      const prospect: Prospect = snapshot.payload.doc.data() as Prospect;
      prospect.id = snapshot.payload.doc.id;
      return prospect;
    });
    this.changeDetector.detectChanges(); // Détecter les changements
  });
}





updateEtape(prospect: Prospect) {
  // Mettre à jour la date ici, par exemple: prospect.dateMiseAJour = new Date();
  prospect.dateMiseAJour = new Date();
  // Mettre à jour les données dans Firebase via le service DataService
  this.dataService.updateProspect(prospect)
    .then(() =>  Swal.fire({
      heightAuto: false,
      icon: 'success',
      text: 'Etape mise à jour avec succès',
      showConfirmButton: false,
      timer: 2500
    }))

    .catch(error => console.error('Erreur lors de la mise à jour de l\'étape', error));
}



}
