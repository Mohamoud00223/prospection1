import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Prospect } from 'src/app/model/prospect';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-prospect',
  templateUrl: './liste-prospect.component.html',
  styleUrls: ['./liste-prospect.component.css']
})
export class ListeProspectComponent implements OnInit {

  // Ajoutez une variable pour gérer la pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  prospectList: Prospect[] = [];
  constructor(private auth: AuthService, private data: DataService, private mh: AngularFirestore) { }


  ngOnInit(): void {
    // Définissez itemsPerPage
    this.itemsPerPage = 8;
    this.data.getProspectListObservable().subscribe(updatedProspects => {
      this.prospectList = updatedProspects;
    });

    this.getAllProspects();
  }



  getAllProspects() {
    this.data.getAllProspects().subscribe(
      res => {
        this.prospectList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          data.editing = false; // Initialisation de la propriété 'editing'
          return data;
        });

        this.data.updateProspects(this.prospectList); // Mettre à jour la liste partagée

         // Triez automatiquement la liste par nom après la mise à jour
         this.triAutomatique();
      },
      err => {
        alert('Erreur lors de la récupération des données des Prospects');
      }
    );
  }

// Méthode pour trier la liste par nom
triAutomatique() {
  this.prospectList.sort((a, b) => a.nom.localeCompare(b.nom));
}



  deleteProspect(prospect: Prospect) {
    if (window.confirm('Etes vous sur de vouloir supprimer ' + prospect.prenom + ' ' + prospect.nom + ' ?')) {
      this.data.deleteProspect(prospect);
    }
  }

  updateProspect(prospect: Prospect) {
    this.data.updateProspect(prospect).then(() => {
      prospect.editing = false;
    });
    // alert('Modification effectuee avec succes')
     // alert('Prospect ajouté avec succès!');
     Swal.fire({
      heightAuto: false,
      icon: 'success',
      text: 'Modification effectuee avec succès',
      showConfirmButton: false,
      timer: 2500
    })
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

  
}
