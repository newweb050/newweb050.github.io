/* ============================================
   CLIENTS CONFIGURATION FILE (FALLBACK)
   ============================================
   
   NOTE: The portfolio now AUTOMATICALLY fetches
   your latest repos from GitHub!
   
   This file is only used as a FALLBACK if:
   - GitHub API is unavailable
   - Rate limit is exceeded
   - Network issues occur
   
   Your client websites will automatically appear
   when you push them to your GitHub account.
   
   ============================================ */

// Fallback clients (used only if GitHub fetch fails)
const CLIENTS = [
    // ============================================
    // CLIENT 1 - Example Restaurant
    // ============================================
    {
        // Client/Business Name (displayed on card)
        name: "Sharma's Kitchen",
        
        // Short description of the project
        description: "Full business website with menu display and photo gallery",
        
        // Live website URL (hosted on GitHub Pages)
        // Format: https://newweb050.github.io/repo-name/
        // Or the client's custom domain if connected
        liveUrl: "https://newweb050.github.io/sharmas-kitchen/",
        
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
        liveUrl: "https://newweb050.github.io/glamour-beauty/",
        image: null,
        tags: ["Salon", "Essential", "Services"]
    },
    
    // ============================================
    // CLIENT 3 - Example Retail Store
    // ============================================
    {
        name: "Kumar Electronics",
        description: "Product showcase with contact and location details",
        liveUrl: "https://newweb050.github.io/kumar-electronics/",
        image: null,
        tags: ["Retail", "Full Website", "Products"]
    },
    
    // ============================================
    // CLIENT 4 - Example Clinic
    // ============================================
    {
        name: "City Dental Clinic",
        description: "Healthcare website with services and appointment booking",
        liveUrl: "https://newweb050.github.io/city-dental/",
        image: null,
        tags: ["Healthcare", "Full Website", "Appointments"]
    },
    
    // ============================================
    // CLIENT 5 - Example Coaching Center
    // ============================================
    {
        name: "Bright Future Academy",
        description: "Education website with courses and faculty information",
        liveUrl: "https://newweb050.github.io/bright-future-academy/",
        image: null,
        tags: ["Education", "Full Website", "Courses"]
    },
    
    // ============================================
    // CLIENT 6 - Example Cafe
    // ============================================
    {
        name: "The Coffee Corner",
        description: "Cafe website with menu and ambiance gallery",
        liveUrl: "https://newweb050.github.io/coffee-corner/",
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
        liveUrl: "https://newweb050.github.io/repo-name/",
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
    githubUsername: "newweb050",
    
    // WhatsApp number (without + sign, country code included)
    // Example: 919876543210 for +91 98765 43210
    whatsappNumber: "919876543210",
    
    // Your email address
    email: "newweb050@gmail.com",
    
    // Your phone number (for display)
    phone: "+91 98765 43210",
    
    // Business name
    businessName: "NewWeb050",
    
    // Social media links
    social: {
        instagram: "https://instagram.com/newweb050",
        facebook: "https://facebook.com/newweb050",
        github: "https://github.com/newweb050",
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
   
   3. GITHUB PAGES HOSTING:
      - All client sites are hosted on GitHub Pages
      - URL format: https://newweb050.github.io/repo-name/
      - The portfolio auto-fetches latest repos from GitHub
   
   4. URL FORMAT:
      - For liveUrl, use the hosted GitHub Pages URL
      - Example: https://newweb050.github.io/client-website/
      - Or use client's custom domain if they have one connected
   
   ============================================ */
