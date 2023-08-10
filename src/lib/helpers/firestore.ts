import type { FirebaseApp } from "firebase/app";
import { app } from "./firebase";
import {
  collection,
  getFirestore,
  type Firestore,
  QueryDocumentSnapshot,
  Query,
  onSnapshot,
  QueryConstraint,
  query,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { Checklist } from "../models/checklist";

export class Database {
  constructor(app: FirebaseApp) {
    this.firestore = getFirestore();
    this.auth = getAuth(app);
  }
  firestore: Firestore;
  auth: Auth;
  private get userChecklistsCollection() {
    return collection(
      this.firestore,
      `users/${this.auth.currentUser.uid}/checklists`
    ).withConverter({
      fromFirestore: (snapshot: QueryDocumentSnapshot) =>
        Checklist.fromMap(snapshot.id, snapshot.data()),
      toFirestore: (model: Checklist) => model.toMap(),
    });
  }
  private getSnapshot<T>(set: (data: T[]) => void, q: Query<T>) {
    onSnapshot(q, (snapshot) => {
      set(snapshot.docs.map((doc) => doc.data()));
    });
  }

  getChecklistsSnapshot(
    set: (data: Checklist[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) {
    let q = query(this.userChecklistsCollection, ...queryConstraints);
    this.getSnapshot(set, q);
  }

  getChecklistSnapshot(id: string, set: (data: Checklist) => void) {
    let docRef = doc(this.userChecklistsCollection, id);
    onSnapshot(docRef, (doc) => {
      set(doc.data());
    });
  }

  addChecklist(checklist: Checklist) {
    addDoc(this.userChecklistsCollection, checklist);
  }

  updateChecklist(checklist: Checklist) {
    let docRef = doc(this.userChecklistsCollection, checklist.id);
    setDoc(docRef, checklist);
  }

  deleteChecklist(id: string) {
    let docRef = doc(this.userChecklistsCollection, id);
    return deleteDoc(docRef);
  }
}

export default new Database(app);
