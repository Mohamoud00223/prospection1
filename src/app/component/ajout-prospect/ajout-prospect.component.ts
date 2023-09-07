import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/model/prospect';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-prospect',
  templateUrl: './ajout-prospect.component.html',
  styleUrls: ['./ajout-prospect.component.css']
})
export class AjoutProspectComponent implements OnInit {
  
  prospectList: Prospect[] = [];
  prospectObj: Prospect = {
    id : '',
    prenom : '',
    nom :'',
    numero :'',
    adresse :'',
    sexe :'',
    status :''
  };
  id : string ='';
  prenom : string = '';
  nom : string ='';
  numero : string='';
  adresse : string='';
  sexe : string='';
  status : string='';
  
  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    // this.getAllProspects();
  }

  // getAllProspects() {
   
  //   this.data.getAllProspects().subscribe(res => {

  //     this.prospectList = res.map((e: any) => {
  //       const data = e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       return data;
  //     })

  //   }, err => {
  //     alert('Erreur lors de la récupération des données des étudiants');
  //   })

  // }

  resetForm() {
    this.id = '';
    this.prenom ='';
    this.nom ='';
    this.numero ='';
    this.adresse ='';
    this.sexe ='';
    this.status ='';
    }

    addProspect() {
      console.log()
      if (this.prenom == '' || this.nom== '' || this.numero == '' || this.adresse == ''|| this.sexe== ''|| this.status == '') {
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
      this.prospectObj.prenom = this.prenom ;
      this.prospectObj.nom = this.nom;
      this.prospectObj.numero= this.numero ;
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

  



}
