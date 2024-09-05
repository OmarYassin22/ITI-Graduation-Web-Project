// import { addDoc, getDocs, collection } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";

// import { NextResponse } from "next/server";
// import { auth } from "../../../firebaseConfig";
// export async function POST(request) {
//   let { fname, lname, email, number } = await request.json();
//   console.log(fname, lname, email, number);
//   try {
//     console.log(fname, lname, email, number);
//     await addDoc(collection(db, "DataUser"), {
//       fname: fname,
//       lname: lname,
//       email: email,
//       number: number,
//     });

//     return NextResponse.json({ user: userData.user }, { status: 201 });
//   } catch (error) {
//     console.log(fname, lname, email, number);
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// File: /pages/api/auth/dataUser.js

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { NextResponse } from "next/server";
import cors from '../_cors'; // Adjust the import path according to your folder structure

export async function POST(request) {
  // Apply CORS middleware
  const response = new NextResponse(); // Create an empty response object to use with the middleware
  cors(request, response); // Apply CORS headers

  // Check for preflight response (OPTIONS request)
  if (request.method === 'OPTIONS') {
    return response; // Return early for preflight requests
  }

  try {
    // Parse the request body to extract the data
    const { fname, lname, email, number } = await request.json();
    console.log(fname, lname, email, number);

    // Add a new document to the Firestore collection "DataUser"
    await addDoc(collection(db, "DataUser"), {
      fname: fname,
      lname: lname,
      email: email,
      number: number,
    });

    // Respond with a success message
    return NextResponse.json({ message: 'User data added successfully' }, { status: 201 });
  } catch (error) {
    // Log the error and return a 400 status code with the error message
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
