import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Service } from 'src/app/model/service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

   // Ajoutez une variable pour gérer la pagination
   currentPage: number = 1;
   itemsPerPage: number = 5;

  serviceList: Service[] = [];
  serviceObj: Service = {
    id : '',
    nom :'',
    type :'',
    prix :''
  };
  id : string ='';
  nom : string ='';
  type : string='';
  prix : string='';

  constructor(private auth: AuthService, private data: DataService,  private mh: AngularFirestore) { }

  ngOnInit(): void {
    // Définissez itemsPerPage
    this.itemsPerPage = 10;
    // this.data.getServiceListObservable().subscribe(updatedService => {
    //   // this.serviceList = updatedService;
    // });
    this.getAllServices();
  }

  resetForm() {
    this.id = '';
    this.nom ='';
    this.type ='';
    this.prix ='';
    }


  addService() {
    console.log()
    if ( this.nom== '' || this.type == '' || this.prix == '') {
      // alert('Remplissez tous les champs de saisie');
      // return;
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

    this.serviceObj.id = '';
    this.serviceObj.nom = this.nom;
    this.serviceObj.type= this.type ;
    this.serviceObj.prix = this.prix;


    this.data.addService(this.serviceObj);
    this.resetForm();

    // alert('Service ajouté avec succès!');

      // alert('Prospect ajouté avec succès!');
      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Service ajouté avec succès',
        showConfirmButton: false,
        timer: 2500
      })


  }


  getAllServices() {
   
    this.data.getAllServices().subscribe(res => {

      this.serviceList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        data.editing = false;
        return data;
      })
      this.triAutomatique();

    }, err => {
      alert('Erreur lors de la récupération des données des Services');
    })

  }

  // Méthode pour trier la liste par nom
triAutomatique() {
  this.serviceList.sort((a, b) => a.nom.localeCompare(b.nom));
}

  updateService(service: Service) {
    this.data.updateService(service).then(() => {
      service.editing = false;
    });
    // alert('Modification effectuee avec succes')
      // alert('Prospect ajouté avec succès!');
      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Service modifie avec succès',
        showConfirmButton: false,
        timer: 2500
      })
  }





  deleteService(service: Service) {
    if (window.confirm('Etes vous sur de vouloir supprimer ' + service.nom + ' ' + service.type + ' ?')) {
      this.data.deleteService(service);
      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Suppression effectuee avec succès',
        showConfirmButton: false,
        timer: 2500
      })
    }
    
  }


   // Restez à jour avec la page actuelle lorsque l'utilisateur change de page
   onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  // ... Le reste de votre code ...

  // Utilisez cette fonction pour obtenir la liste paginée d'offres
  getPaginatedServiceList(): Service[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.serviceList.slice(startIndex, endIndex);
  }

  afficherFormulaire: boolean = false;
  afficherModalAjout() {
    
    this.afficherFormulaire = true;
  }

  fermerModalAjout() {
    this.afficherFormulaire = false;
    // Réinitialisez le nouveau conseil avec des valeurs vides pour le formulaire lors de la fermeture de la modal
    this.serviceObj = {
      id: '',
      nom: '',
      type: '',
      prix: '',
  };
  }



 


}
