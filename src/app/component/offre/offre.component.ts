import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/service';
import { Prospect } from 'src/app/model/prospect';
import { DataService } from 'src/app/services/data.service';
import { Offre } from 'src/app/model/offre';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  constructor(private dataService: DataService, private mh: AngularFirestore, private data: DataService) { }
  // Ajoutez une variable pour gérer la pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  offreList: Offre[] = [];

  serviceList: Service[] = [];
  prospectList: Prospect[] = [];
  prospect: Prospect | null = null;
  selectedServices: Service[] = [];

  nouvelleOffre: Offre = {
    id: '',
    nom: '',
    type: '',
    prix: 0,
    description: '',
    date: '',
    services: [],
    prospect: null,// Initialiser à null
    editing: false,
    
  };

  // resetForm() {
  //   this.id = '';
  //   this.nom ='';
  //   this.type ='';
  //   this.prix ='';
  //   this.description ='';
  //   this.date: new Date(),
  //   this.services: [],
  //   this.prospect: null,// Initialiser à null
  //   this.editing: false
  //   }


 

  ngOnInit(): void {
    // Définissez itemsPerPage
    this.itemsPerPage = 10;

    this.getAllServices();
    console.log(this.serviceList);

    // Récupérer la liste des prospects depuis Firestore
    this.data.getProspectListObservable().subscribe(updatedProspects => {
      this.prospectList = updatedProspects;

    });

    this.getAllProspects();
    this.getAllOffres();
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
      },
      err => {
        alert('Erreur lors de la récupération des données des Prospects');
      }
    );
  }


  
  ajouterOffre() {
    if (this.prospect) {
      const nouvelleOffre: Offre = {
        id: '', // Générez un ID ou utilisez celui de Firestore
        nom: this.nouvelleOffre.nom, // Remplacez par la valeur appropriée
        type: this.nouvelleOffre.type, // Remplacez par la valeur appropriée
        prix: this.nouvelleOffre.prix, // Remplacez par la valeur appropriée
        description: this.nouvelleOffre.description, // Remplacez par la valeur appropriée
        date: this.nouvelleOffre.date, // Remplacez par la date appropriée
        services: this.selectedServices, // Utilisez la liste de services sélectionnés
        prospect: this.prospect,
        editing: false

      };

      // Appelez la méthode d'ajout d'offre du service DataService
      this.dataService.addOffre(nouvelleOffre, this.selectedServices, this.prospect);
    
      
      // alert('Prospect ajouté avec succès!');
      Swal.fire({
        heightAuto: false,
        icon: 'success',
        text: 'Offre ajoutée avec succès',
        showConfirmButton: false,
        timer: 2500
      })
      // Réinitialisez les valeurs du composant si nécessaire
      this.nouvelleOffre = {
        id: '',
        nom: '',
        type: '',
        prix: 0,
        description: '',
        date: '',
        services: [],
        prospect: null,
        editing: false
      };
      this.selectedServices = [];
      this.prospect = null;
    } else {
      // alert('Veuillez sélectionner un prospect avant d\'ajouter une offre.');
      Swal.fire({
        heightAuto: false,
        icon: 'error',
        text: 'Remplissez tous les champs de saisie',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }





  getAllServices() {

    this.data.getAllServices().subscribe(res => {

      this.serviceList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        console.log(data)
        return data;

      })

    }, err => {
      alert('Erreur lors de la récupération des données des Services');
    })

  }




  getAllOffres() {
    this.data.getAllOffres().subscribe(res => {
      this.offreList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        data.editing = false;
        return data as Offre; // Assurez-vous de caster les données en tant qu'objet Offre
      });

      // Pour chaque offre, récupérez les noms des services inclus
      this.offreList.forEach((offre: Offre) => {
        offre.serviceNom = offre.services.map(service => service.nom).join(', '); // Concatène les noms des services
      });
    }, err => {
      alert('Erreur lors de la récupération des données des Services');
    });
  }



  deleteOffre(offre: Offre) {
    if (window.confirm('Etes vous sur de vouloir supprimer cette offre' + ' ?')) {
      this.data.deleteOffre(offre);
    }
    Swal.fire({
      heightAuto: false,
      icon: 'success',
      text: 'Suppression effectuee avec succès',
      showConfirmButton: false,
      timer: 2500
    })
  }

  updateOffre(offre: Offre) {
    this.data.updateOffre(offre).then(() => {
      offre.editing = false;
    });
    // 
    Swal.fire({
      heightAuto: false,
      icon: 'success',
      text: 'Modification effectuee avec succès',
      showConfirmButton: false,
      timer: 2500
    })
  }

  // Restez à jour avec la page actuelle lorsque l'utilisateur change de page
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  // ... Le reste de votre code ...

  // Utilisez cette fonction pour obtenir la liste paginée d'offres
  getPaginatedOffreList(): Offre[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.offreList.slice(startIndex, endIndex);
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
    this.nouvelleOffre = {
      id: '',
      nom: '',
      type: '',
      prix: 0,
      description: '',
      date: '',
      services: [],
      prospect: null,// Initialiser à null
      editing: false

    };
  }


  calculerPrix() {
    // Obtenez la liste des services sélectionnés
    const servicesSelectionnes = this.selectedServices;
  
    // Initialisez le prix à zéro
    let prixTotal = 0;
  
    // Parcourez la liste des services sélectionnés et ajoutez leur prix au total
    servicesSelectionnes.forEach(service => {
      prixTotal += parseFloat(service.prix); // Assurez-vous que votre objet service a une propriété "prix" de type numérique
    });
  
    // Mettez à jour la propriété "prix" de la nouvelle offre en tant que nombre
    this.nouvelleOffre.prix = prixTotal;
  }
  
  

}
