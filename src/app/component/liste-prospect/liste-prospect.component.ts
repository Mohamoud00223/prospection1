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
  prospectList: Prospect[] = [];
  prospectObj: Prospect = {
    id: '',
    prenom: '',
    nom: '',
    numero: '',
    adresse: '',
    sexe: '',
    status: ''
  };
  id: string = '';
  prenom: string = '';
  nom: string = '';
  numero: string = '';
  adresse: string = '';
  sexe: string = '';
  status: string = '';
  // Ajoutez une variable pour gérer la pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // prospectList: Prospect[] = [];
  constructor(private auth: AuthService, private data: DataService, private mh: AngularFirestore) { }


  ngOnInit(): void {
    // Définissez itemsPerPage
    this.itemsPerPage = 15;
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
      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Suppression effectuee avec succès',
        showConfirmButton: false,
        timer: 2500
      })
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



  afficherFormulaire: boolean = false;
  afficherModalAjout() {

    this.afficherFormulaire = true;
  }

  fermerModalAjout() {
    this.afficherFormulaire = false;
    // Réinitialisez le nouveau conseil avec des valeurs vides pour le formulaire lors de la fermeture de la modal
    this.prospectObj = {
      id: '',
      prenom: '',
      nom: '',
      numero: '',
      adresse: '',
      sexe: '',
      status: '',

    };
  }


  isPhoneNumberUnique(phoneNumber: string): boolean {
    // Vérifiez si le numéro de téléphone existe déjà dans la liste des prospects
    return !this.prospectList.some(prospect => prospect.numero === phoneNumber);
  }


  resetForm() {
    this.id = '';
    this.prenom = '';
    this.nom = '';
    this.numero = '';
    this.adresse = '';
    this.sexe = '';
    this.status = '';
  }

  addProspect() {
    // Vérifiez d'abord si le numéro de téléphone est unique
    if (!this.isPhoneNumberUnique(this.numero)) {
      // Affichez un message d'erreur ou gérez la non-uniqueness du numéro de téléphone ici
      // alert('Ce numéro de téléphone existe deja. Veuillez entrer un numéro de téléphone valide.');
      Swal.fire({
        heightAuto: false,
        icon: 'error',
        text: 'Ce numéro de téléphone existe deja. Veuillez entrer un numéro de téléphone valide.',
        showConfirmButton: false,
        timer: 2500
      })
      return; // Ne pas ajouter le prospect s'il n'est pas unique
    }

    console.log()
    if (this.prenom == '' || this.nom == '' || this.numero == '' || this.adresse == '' || this.sexe == '' || this.status == '') {
      // alert('Remplissez tous les champs de saisie');
      Swal.fire({
        heightAuto: false,
        icon: 'error',
        text: 'Remplissez tous les champs de saisie',
        showConfirmButton: false,
        timer: 2500
      })
      return;
    }

    this.prospectObj.id = '';
    this.prospectObj.prenom = this.prenom;
    this.prospectObj.nom = this.nom;
    this.prospectObj.numero = this.numero;
    this.prospectObj.adresse = this.adresse;
    this.prospectObj.sexe = this.sexe;
    this.prospectObj.status = this.status;

    this.data.addProspect(this.prospectObj);
    this.resetForm();

    // alert('Prospect ajouté avec succès!');
    Swal.fire({
      heightAuto: false,
      icon: 'success',
      text: 'Prospect ajouté avec succès',
      showConfirmButton: false,
      timer: 2500
    })

  }


  convertToClient(prospect: Prospect) {
    if (window.confirm('Êtes-vous sûr de vouloir convertir ' + prospect.prenom + ' ' + prospect.nom + ' en client ?')) {
      prospect.status = 'Client'; // Mettez à jour le statut du prospect en "Client"

      // Mettez à jour les données Firebase
      this.mh.collection('/Prospects').doc(prospect.id).update({
        status: 'Client'
      })

      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Prospect convertit avec succès',
        showConfirmButton: false,
        timer: 2500
      })


        .then(() => {
        })
        .catch(error => {
          console.error('Erreur lors de la conversion en client : ', error);
          // Gérez l'erreur ici, par exemple, affichez une alerte
        });
    }
  }


}
