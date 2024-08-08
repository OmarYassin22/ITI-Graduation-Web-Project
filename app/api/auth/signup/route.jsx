import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
export async function POST(request) {
  let { email, password } = await request.json();
  console.log(email, password);

  try {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = await addDoc(collection(db, "UsersTypes"), {
      UID: userData.user.uid,
      type: "student",
    });

    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
