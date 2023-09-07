import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { activitesuivi } from 'src/app/model/activitesuivi';
import { Prospect } from 'src/app/model/prospect';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

import { of } from 'rxjs';


@Component({
  selector: 'app-activitesuivi',
  templateUrl: './activitesuivi.component.html',
  styleUrls: ['./activitesuivi.component.css']
})
export class ActivitesuiviComponent implements OnInit {

  ngOnInit(): void {
   
    // Définissez itemsPerPage
    this.itemsPerPage = 8;

    this.loadProspects();
    console.log(this.data);
  }

  constructor(private auth: AuthService, private dataService: DataService, private mh: AngularFirestore,
    private changeDetector: ChangeDetectorRef, private data: DataService) { }

  
  //  selectedProspectActivities: activitesuivi[] = [];

  activites$: Observable<any[]> | undefined;



  afficherFormulaire: boolean = false;
  activiteList: activitesuivi[] = [];
  activiteObj: activitesuivi = {
    id: '',
    type: '',
    description: '',
    date: '',
    prospectId: '',

  };
  id: string = '';
  type: string = '';
  description: string = '';
  date: string = '';
  selectedProspect: Prospect | null = null;



  resetForm() {
    this.id = '';
    this.type = '';
    this.description = '';
    this.date = '';
  }


  // Fonction pour sélectionner le prospect
  selectProspect(prospect: Prospect) {
    this.selectedProspect = prospect;
    // this.getActivitiesForProspect(prospect.id);
    this.afficherModalAjout();
  }

  // Fonction pour réinitialiser le prospect sélectionné
  clearSelectedProspect() {
    this.selectedProspect = null;
    // this.selectedProspectActivities = []; // Réinitialiser les activités de suivi
  }

  // Ajoutez une variable pour gérer la pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  prospectList: Prospect[] = [];

  
//-------------------------------------------------------------------------------------------------------
  prospectId = '';

  recupererActivite(prospectId: string) {
    console.log(prospectId);
    this.dataService.getActivitiesForProspect(prospectId)
  .subscribe((documentChanges: DocumentChangeAction<any>[]) => {
    const activites = documentChanges.map((change) => {
      return {
        id: change.payload.doc.id,
        ...change.payload.doc.data()
      };
    });
    console.log(activites); // Affichez les données dans la console
  });
  }
  



  

  loadProspects() {
    this.dataService.getAllProspects().subscribe((prospectsSnapshot) => {
      this.prospectList = prospectsSnapshot.map((snapshot) => {
        const prospect: Prospect = snapshot.payload.doc.data() as Prospect;
        prospect.id = snapshot.payload.doc.id;

        // Aucune conversion nécessaire si prospect.dateMiseAJour est déjà de type Date
        return prospect;
      });
      this.changeDetector.detectChanges(); // Détecter les changements
    });
  }


  addActiviteSuivi() {

    if (this.type == '' || this.description == '' || this.date == '' || !this.selectedProspect) {
      alert('Remplissez tous les champs de saisie');
      return;
    }

    this.activiteObj.id = '';
    this.activiteObj.type = this.type;
    this.activiteObj.description = this.description;
    this.activiteObj.date = this.date;
    this.activiteObj.prospectId = this.selectedProspect.id;


    this.data.addActiviteSuivi(this.activiteObj);
    this.resetForm();

    alert('Activite ajoutée avec succès!');

  }

 

  // Utilisez cette fonction pour obtenir la liste paginée d'offres
  getPaginatedProspectList(): Prospect[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.prospectList.slice(startIndex, endIndex);
  }

  // Restez à jour avec la page actuelle lorsque l'utilisateur change de page
  onPageChange(pageNumber: number): void {

    this.currentPage = pageNumber;
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNextPage(): void {
    // Vous pouvez ajouter une validation pour éviter de dépasser le nombre total de pages, si nécessaire
    // if (this.currentPage < this.totalPages) {
    this.currentPage++;
    // }
  }



  afficherModalAjout() {

    this.afficherFormulaire = true;
  }

  fermerModalAjout() {
    this.afficherFormulaire = false;
    // Réinitialisez le nouveau conseil avec des valeurs vides pour le formulaire lors de la fermeture de la modal
    this.activiteObj = {
      id: '',
      type: '',
      description: '',
      date: '',
      prospectId: '',

    };
  }

// ...




// Fonction pour charger les activités de suivi d'un prospect

// loadActivitiesForProspect(prospect: Prospect) {
//   if (!prospect) {
//     return;
//   }

//   this.dataService.getActivitiesForProspect(prospect.id).subscribe((activitiesSnapshot) => {
//     this.activiteList = activitiesSnapshot.map((snapshot) => {
//       const data = snapshot.payload.doc.data();
//       const activity: activitesuivi = {
//         id: snapshot.payload.doc.id,
//         type: data.type,
//         description: data.description,
//         date: data.date,
//         prospectId: data.prospectId,
//       };
//       return activity;
//     });
//     this.changeDetector.detectChanges();
//   });
// }

  // showActivities(prospect: Prospect) {
  //   console.log(this.data)
  //   this.selectedProspect = prospect;
  //   this.loadActivitiesForProspect(prospect);
  // }



}
