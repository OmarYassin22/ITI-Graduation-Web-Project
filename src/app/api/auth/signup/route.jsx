// import { createUserWithEmailAndPassword } from "firebase/auth";

// import { NextResponse } from "next/server";
// import { auth } from "../../../firebaseConfig";
// export async function POST(request) {
//   let { email, password } = await request.json();
//   try {
//     const userData = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     return NextResponse.json({ user: userData.user }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// File: /pages/api/auth/signup.js
// File: /pages/api/auth/signup.js

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
import cors from '../_cors'; // Ensure the path is correct to your CORS middleware

export async function POST(req) {
  // Initialize response object to pass through middleware
  const res = new NextResponse(); 
  
  // Apply CORS headers using the middleware
  cors(req, res); 

  // If the request is an OPTIONS request (preflight), end early
  if (req.method === 'OPTIONS') {
    return res; // This ends the preflight check with the necessary headers
  }

  try {
    // Parse the incoming JSON body
    const { email, password } = await req.json();

    // Create a new user with Firebase Authentication
    const userData = await createUserWithEmailAndPassword(auth, email, password);

    // Respond with the newly created user data
    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    // Handle errors (e.g., invalid email, weak password)
    console.error('Error during signup:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
