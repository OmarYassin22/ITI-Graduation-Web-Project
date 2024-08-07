import { createUserWithEmailAndPassword } from "firebase/auth";

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
    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
