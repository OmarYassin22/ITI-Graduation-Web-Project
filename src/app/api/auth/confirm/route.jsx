import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
export async function POST(request) {
  let { fname, lname, email, number } = await request.json();
  console.log(fname, lname, email, number);
  try {
    console.log(fname, lname, email, number);
    await addDoc(collection(db, "DataUser"), {
      fname: fname,
      lname: lname,
      email: email,
      number: number,
    });

    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    console.log(fname, lname, email, number);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
