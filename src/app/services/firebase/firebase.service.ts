import { computed, inject, Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';
import { LocationService } from '../location/location.service';
import { retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  firebaseConfig = {
    apiKey: "AIzaSyA7ymoFr6ZVE0AEy-SNkrpLws95vcMq-cc",
    authDomain: "cinguetto-69d31.firebaseapp.com",
    projectId: "cinguetto-69d31",
    storageBucket: "cinguetto-69d31.firebasestorage.app",
    messagingSenderId: "1001473759556",
    appId: "1:1001473759556:web:6027bafeb24555a1f99f11"
  };

  db?: any;

  cinguettii = signal<Cinguettio[]>([])

  geoCinguettii = computed(() => {
    this.fromCinguettiiToGeojson(this.cinguettii())
  })

  // geojson = signal<string>("")

  locationServ = inject(LocationService);

  constructor() { }

  init() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  async getAllCinguettii() {
    // const newArray: Cinguettio[] = [];
    // const querySnapshot = await getDocs(collection(this.db, "cinguettii"));
    // querySnapshot.forEach((doc) => {

    //   // const newCinguettio: Cinguettio = {id: doc.id, ...doc.data()}

    //   const newCinguettio = doc.data() as Cinguettio;

    //   newCinguettio.id = doc.id;

    //   newArray.push(newCinguettio);

    // });

    // this.cinguettii.update((_) => newArray)



    const unsubscribe = onSnapshot(collection(this.db, "cinguettii"), (snap) => {

      const newArray: Cinguettio[] = [];

      snap.forEach((doc) => {

        // const newCinguettio: Cinguettio = {id: doc.id, ...doc.data()}

        const newCinguettio = doc.data() as Cinguettio;

        newCinguettio.id = doc.id;

        newArray.push(newCinguettio);

      });

      this.cinguettii.set(newArray);

      // this.geojson.set(this.fromCinguettiiToGeojson(this.cinguettii()))


    })




  }

  postCiguettio(cinguettioText: string) {

    const newCinguettio: Cinguettio = {
      text: cinguettioText,
      creationTime: Timestamp.now()
    }

    this.locationServ.getLocation()
      .then(loc => {
        newCinguettio.location = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude
        }
        const path = collection(this.db, 'cinguettii');
        addDoc(path, newCinguettio);

      })
      .catch(err => {
        console.log(err)
        const path = collection(this.db, 'cinguettii');
        addDoc(path, newCinguettio);
      });



  }

  saveUser(uid: string, nick: string) {
    const user = {
      nick: nick,
    }
    const path = doc(this.db, 'users', uid);
    setDoc(path, user);

  }

  getUser(uid: string) {

    var path = doc(this.db, "users", uid);

    return getDoc(path).then(snap => snap.data());

  }

  fromCinguettiiToGeojson(cinguettii: Cinguettio[]): any {
    const emptyGeojson: any = {
      type: "FeatureCollection",
      features: []
    }

    for (const cinguettio of cinguettii) {

      if (cinguettio.location) {
        const feature = {
          type: "Feature",
          properties: {
            text: cinguettio.text,
            creationTime: cinguettio.creationTime.toDate()
          },
          geometry: {
            coordinates: [
              cinguettio.location.lng,
              cinguettio.location.lat
            ],
            type: "Point"
          },
          id: cinguettio.id
        }

        emptyGeojson.features.push(feature);
      }

    }

    console.log('computed', JSON.stringify(emptyGeojson))

    return JSON.stringify(emptyGeojson)
  }

}
