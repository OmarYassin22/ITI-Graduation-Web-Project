// // // File: /pages/api/_cors.js
// export default function cors(req, res) {
//   const allowedOrigins = [
//     "https://e-learning-o4h8w8rvb-omaryassin22s-projects.vercel.app/", // Add your frontend URL here
//     "https://e-learning-o4h8w8rvb-omaryassin22s-projects.vercel.app", // Add your frontend URL here
//     "http://localhost:3000",
//   ];

//   // Get the origin of the request
//   const origin = req.headers.origin;

//   // Check if the request's origin is allowed
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin); // Dynamically set allowed origin
//   }

//   // Set other CORS headers
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS"); // Allowed methods
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
//   res.setHeader("Access-Control-Allow-Credentials", "true"); // If credentials are needed

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
// }

// File: /lib/cors.js

export default function cors(req) {
  const allowedOrigins = [
    "https://e-learning-oxg71xdhk-omaryassin22s-projects.vercel.app",
    "https://e-learning-o4h8w8rvb-omaryassin22s-projects.vercel.app",
  ];

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Change '*' to specific origins as needed
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Set CORS headers for normal requests
  return {
    headers: {
      "Access-Control-Allow-Origin": "*", // Change '*' to specific origins as needed
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  };
}

// // File: /pages/api/_cors.js
// export default function cors(req, res) {
//     // Allow all origins by setting '*'
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Set other necessary CORS headers
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allow necessary methods
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow necessary headers
//     res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials if needed (can be removed if not using cookies or credentials)

//     // Handle preflight (OPTIONS) requests
//     if (req.method === 'OPTIONS') {
//       res.status(200).end(); // End preflight requests early
//       return;
//     }
//   }
