/* ============================================
   CLIENTS CONFIGURATION FILE
   ============================================
   
   This file contains all your client projects.
   Edit this file to add/update/remove client websites.
   
   HOW TO ADD A NEW CLIENT:
   1. Copy an existing client object
   2. Update the details
   3. Save the file
   
   ============================================ */

const CLIENTS = [
    // ============================================
    // CLIENT 1 - Example Restaurant
    // ============================================
    {
        // Client/Business Name (displayed on card)
        name: "Sharma's Kitchen",
        
        // Short description of the project
        description: "Full business website with menu display and photo gallery",
        
        // Live website URL (the actual domain)
        // Set to null if not yet live
        liveUrl: "https://sharmas-kitchen.com",
        
        // GitHub repository URL (optional)
        // Set to null if you don't want to show it
        githubUrl: "https://github.com/your-username/sharmas-kitchen",
        
        // Screenshot/preview image URL (optional)
        // You can use a screenshot service or upload to the repo
        // Set to null to show a placeholder
        image: null,
        
        // Tags to display on the card
        tags: ["Restaurant", "Full Website", "Menu"]
    },
    
    // ============================================
    // CLIENT 2 - Example Salon
    // ============================================
    {
        name: "Glamour Beauty Parlour",
        description: "Essential website with services and booking features",
        liveUrl: "https://glamour-beauty.in",
        githubUrl: "https://github.com/your-username/glamour-beauty",
        image: null,
        tags: ["Salon", "Essential", "Services"]
    },
    
    // ============================================
    // CLIENT 3 - Example Retail Store
    // ============================================
    {
        name: "Kumar Electronics",
        description: "Product showcase with contact and location details",
        liveUrl: "https://kumar-electronics.com",
        githubUrl: null,
        image: null,
        tags: ["Retail", "Full Website", "Products"]
    },
    
    // ============================================
    // CLIENT 4 - Example Clinic
    // ============================================
    {
        name: "City Dental Clinic",
        description: "Healthcare website with services and appointment booking",
        liveUrl: "https://citydental.in",
        githubUrl: "https://github.com/your-username/city-dental",
        image: null,
        tags: ["Healthcare", "Full Website", "Appointments"]
    },
    
    // ============================================
    // CLIENT 5 - Example Coaching Center
    // ============================================
    {
        name: "Bright Future Academy",
        description: "Education website with courses and faculty information",
        liveUrl: "https://brightfuture-academy.com",
        githubUrl: null,
        image: null,
        tags: ["Education", "Full Website", "Courses"]
    },
    
    // ============================================
    // CLIENT 6 - Example Cafe
    // ============================================
    {
        name: "The Coffee Corner",
        description: "Cafe website with menu and ambiance gallery",
        liveUrl: "https://thecoffeecorner.in",
        githubUrl: "https://github.com/your-username/coffee-corner",
        image: null,
        tags: ["Cafe", "Essential", "Menu"]
    }
    
    // ============================================
    // ADD MORE CLIENTS BELOW
    // Copy the template and fill in the details
    // ============================================
    
    /*
    ,
    {
        name: "Client Business Name",
        description: "Brief description of the project",
        liveUrl: "https://client-domain.com",
        githubUrl: "https://github.com/your-username/repo-name",
        image: null,
        tags: ["Industry", "Plan Type", "Feature"]
    }
    */
];

/* ============================================
   CONFIGURATION SETTINGS
   ============================================
   
   Update these settings with your actual details
   
   ============================================ */

const CONFIG = {
    // Your GitHub username (for fetching latest repos)
    githubUsername: "your-github-username",
    
    // WhatsApp number (without + sign, country code included)
    // Example: 919876543210 for +91 98765 43210
    whatsappNumber: "919876543210",
    
    // Your email address
    email: "hello@webcraftstudio.com",
    
    // Your phone number (for display)
    phone: "+91 98765 43210",
    
    // Business name
    businessName: "WebCraft Studio",
    
    // Social media links
    social: {
        instagram: "https://instagram.com/webcraftstudio",
        facebook: "https://facebook.com/webcraftstudio",
        github: "https://github.com/your-github-username",
        whatsapp: "https://wa.me/919876543210"
    }
};

/* ============================================
   TIPS FOR MANAGING CLIENTS
   ============================================
   
   1. ADDING SCREENSHOTS:
      - Take a screenshot of the client's website
      - Upload to the images/ folder or use an external URL
      - Update the 'image' property with the path
      Example: image: "images/client1-screenshot.png"
   
   2. TAGS SUGGESTIONS:
      Industries: Restaurant, Salon, Retail, Healthcare, 
                  Education, Cafe, Service, Fitness, etc.
      Plan Types: Essential, Full Website
      Features: Menu, Gallery, Booking, Products, etc.
   
   3. GITHUB INTEGRATION:
      - If you host client sites on GitHub Pages
      - The portfolio can auto-fetch latest repos
      - Just update the githubUsername in CONFIG
   
   4. DOMAIN MAPPING:
      - For liveUrl, use the client's actual domain
      - This is what customers will click to visit
   
   ============================================ */
