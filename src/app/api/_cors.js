// File: /pages/api/_cors.js
export default function cors(req, res) {
    const allowedOrigins = [
      'https://e-learning-i1mijhwiy-omaryassin22s-projects.vercel.app', // Add your frontend URL here
    ];
  
    // Get the origin of the request
    const origin = req.headers.origin;
  
    // Check if the request's origin is allowed
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin); // Dynamically set allowed origin
    }
    
    // Set other CORS headers
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If credentials are needed
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  }
  