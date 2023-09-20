import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Prospect } from '../model/prospect';
import { Service } from '../model/service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offre } from '../model/offre';
import { activitesuivi } from '../model/activitesuivi';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private activities: activitesuivi[] = [];
  private prospectListSubject: BehaviorSubject<Prospect[]> = new BehaviorSubject<Prospect[]>([]);

  
  constructor(private mh: AngularFirestore, private firestore: AngularFirestore) { }



   // Méthode pour obtenir le nombre total de prospects depuis la base de données
   async getNombreTotalProspects(): Promise<number> {
    try {
      const snapshot = await this.mh.collection('Prospects').get().toPromise();
      return snapshot ? snapshot.size : 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total de prospects', error);
      return 0; // Retourner 0 en cas d'erreur
    }
  }

  // Méthode pour obtenir le nombre total de services depuis la base de données
  async getNombreTotalServices(): Promise<number> {
    try {
      const snapshot = await this.mh.collection('Services').get().toPromise();
      return snapshot ? snapshot.size : 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total de services', error);
      return 0;
    }
  }
  

  // Méthode pour obtenir le nombre total d'offres depuis la base de données
  async getNombreTotalOffres(): Promise<number> {
    try {
      const snapshot = await this.mh.collection('Offres').get().toPromise();
      return snapshot ? snapshot.size : 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total d\'offres', error);
      return 0;
    }
  }



  // Méthode pour obtenir le nombre total d'activités de suivi depuis la base de données
  async getNombreTotalActivitesSuivi(): Promise<number> {
    try {
      const snapshot = await this.mh.collection('Activites').get().toPromise();
      return snapshot ? snapshot.size : 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total d\'activités de suivi', error);
      return 0;
    }
  }


  async getNombreTotalProspectsStatutClient(): Promise<number> {
    try {
      const snapshot = await this.mh.collection('Prospects', ref => ref.where('status', '==', 'Client')).get().toPromise();
      return snapshot ? snapshot.size : 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total de prospects avec statut "Client"', error);
      return 0;
    }
  }


  //add prospect
  addProspect(prospect: Prospect) {
    prospect.id = this.mh.createId();
    return this.mh.collection('/Prospects').add(prospect);
    
  }

  // get all prospect
  getAllProspects() {
    return this.mh.collection('/Prospects').snapshotChanges();
  }




  // delete prospect
  deleteProspect(prospect: Prospect) {
    this.mh.doc('/Prospects/' + prospect.id).delete();
  }


  // update prospect
  updateProspect(prospect: Prospect) {
    const prospectRef = this.mh.doc(`/Prospects/${prospect.id}`);
    return prospectRef.update(prospect);
  }


  getProspectListObservable() {
    return this.prospectListSubject.asObservable();
  }

  //--------------------------------------------------------------------------------------------------

  //add service
  addService(service: Service) {
    service.id = this.mh.createId();
    return this.mh.collection('/Services').add(service);
  }

  // get all services
  getAllServices() {
    return this.mh.collection('/Services').snapshotChanges();
  }

  // delete service
  deleteService(service: Service) {
    this.mh.doc('/Services/' + service.id).delete();
  }


  // update service
  updateService(service: Service) {
    const serviceRef = this.mh.doc(`/Services/${service.id}`);
    return serviceRef.update(service);
  }



  //--------------------------------------------------------------------------------------------------

  private prospectSource = new BehaviorSubject<Prospect[]>([]);
  currentProspects = this.prospectSource.asObservable();

  updateProspects(prospects: Prospect[]) {
    this.prospectSource.next(prospects);
  }

  //------------------------------------------------------------------------------------------------------
  // Ajouter une offre avec services et prospect
  addOffre(offre: Offre, services: Service[], prospect: Prospect) {
    offre.id = this.mh.createId();
    // Ajouter l'offre à la collection d'offres
    this.mh.collection('/Offres').add(offre).then((offreRef) => {
      // Associer les services à l'offre
      services.forEach(service => {
        this.mh.collection(`/Offres/${offreRef.id}/Services`).add(service);
      });
      // Associer le prospect à l'offre s'il est sélectionné
      if (prospect) {
        this.mh.doc(`/Offres/${offreRef.id}`).update({ prospectId: prospect.id });
      }
    });
  }

  getAllOffres() {
    return this.mh.collection('/Offres').snapshotChanges();
  }

  // delete offre
  deleteOffre(offre: Offre) {
    this.mh.doc('/Offres/' + offre.id).delete();
  }

// update Offre
updateOffre(offre: Offre) {
  const offreRef = this.mh.doc(`/Offres/${offre.id}`);
  return offreRef.update(offre);
}


  //-------------------------------------------------------------------------------------------------
  //Ajout activiteSuivi
  addActiviteSuivi(activite: activitesuivi) {
    activite.id = this.mh.createId();
    return this.mh.collection('/Activites').add(activite);
  }


  //recuperer activite
  getActivitiesForProspect(prospectId: string): Observable<any[]> {
    return this.firestore.collection('Activites', (ref) =>
      ref.where('prospectId', '==', prospectId)
    ).snapshotChanges();
  }



//---------------------------------------------------------------------------------------------------------------



}
