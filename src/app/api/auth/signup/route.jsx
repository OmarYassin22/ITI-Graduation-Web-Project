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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
import cors from '../../_cors'; // Adjust the path if needed based on your folder structure

export async function POST(request) {
  // Apply CORS middleware
  const response = new NextResponse(); // Create an empty response to pass to the CORS middleware
  cors(request, response); // Apply CORS headers

  // Check for preflight response (OPTIONS request)
  if (request.method === 'OPTIONS') {
    return response; // Return early for preflight requests
  }

  try {
    // Parse the request body to get email and password
    const { email, password } = await request.json();

    // Create a new user using Firebase Authentication
    const userData = await createUserWithEmailAndPassword(auth, email, password);

    // Return the created user data with a 201 status code
    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    // Handle errors and return a 400 status code with the error message
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
