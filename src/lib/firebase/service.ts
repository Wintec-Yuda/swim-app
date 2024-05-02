import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function getData(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    return [];
  }
}

export async function getDataById(collectionName: string, id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getDataByField(collectionName: string, fieldName: string, value: string) {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const data = querySnapshot.docs
      .filter((doc) => doc.data()[fieldName] === value)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    return data;
  } catch (error) {
    return [];
  }
}

export async function addData(collectionName: string, data: any) {
  try {
    await addDoc(collection(firestore, collectionName), data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteDataById(collectionName: string, id: string) {
  try {
    await deleteDoc(doc(firestore, collectionName, id));
    return true;
  } catch (error) {
    return false;
  }
}

export async function addAthlete(collectionName: string, userId: string, athleteData: any) {
  try {
    const userRef = doc(firestore, collectionName, userId);
    await updateDoc(userRef, {
      athletes: arrayUnion(athleteData),
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteAthleteById(userId: string, athleteId: string) {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new Error("User document not found");
    }

    const userData = userSnapshot.data();
    if (!userData || !userData.athletes || !Array.isArray(userData.athletes)) {
      throw new Error("User data or athletes array not found");
    }

    const updatedAthletes = userData.athletes.filter((athlete) => athlete._id !== athleteId);

    if (updatedAthletes.length === userData.athletes.length) {
      throw new Error("Athlete not found");
    }

    await updateDoc(userRef, {
      athletes: updatedAthletes,
    });

    return true;
  } catch (error) {
    console.error("Error deleting athlete:", error);
    return false;
  }
}

export async function deleteEventAthleteById(eventId: string, athleteId: string) {
  try {
    const eventRef = doc(firestore, "events", eventId);
    const eventSnapshot = await getDoc(eventRef);

    if (!eventSnapshot.exists()) {
      throw new Error("Event document not found");
    }

    const eventData = eventSnapshot.data();
    if (!eventData || !eventData.athletes || !Array.isArray(eventData.athletes)) {
      throw new Error("Event data or athletes array not found");
    }

    const updatedEventAthletes = eventData.athletes.filter((athlete) => athlete._id !== athleteId);

    if (updatedEventAthletes.length === eventData.athletes.length) {
      throw new Error("Athlete not found");
    }

    await updateDoc(eventRef, {
      athletes: updatedEventAthletes,
    });

    return true;
  } catch (error) {
    console.error("Error deleting athlete:", error);
    return false;
  }
}

export async function updateAthleteWithEvent(userId: string, athleteId: string, eventData: any) {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new Error("User document not found");
    }

    const userData = userSnapshot.data();
    if (!userData || !userData.athletes || !Array.isArray(userData.athletes)) {
      throw new Error("User data or athletes array not found");
    }

    const updatedAthletes = userData.athletes.map((athlete) => {
      if (athlete._id === athleteId) {
        return {
          ...athlete,
          event: eventData,
        };
      }
      return athlete;
    });

    await updateDoc(userRef, {
      athletes: updatedAthletes,
    });

    return true;
  } catch (error) {
    console.error("Error updating athlete with event:", error);
    return false;
  }
}
