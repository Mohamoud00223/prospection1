export interface User {
    uid: string;
    email: string;
    displayName?: string;
    roles: string[];
  }


  export interface Agent {
    email: string;
    displayName: string;
    roles: string[]; // Ajoutez cette propriété si nécessaire
  }
