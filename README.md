# NewWeb050 - Portfolio Website

A professional portfolio website for your freelance web development business. Built with pure HTML, CSS, and JavaScript - ready to deploy on GitHub Pages.

## 🚀 Features

- **Modern & Responsive Design** - Looks great on all devices
- **Pricing Plans Display** - Showcases Essential (₹3,500) and Full Business (₹7,500) packages
- **Dynamic Portfolio** - Automatically fetches latest projects from GitHub
- **Client Reviews** - Displays testimonials with star ratings
- **Review Submission Form** - Clients can submit reviews directly
- **WhatsApp Integration** - Contact form sends inquiries via WhatsApp
- **Easy Configuration** - Simple JS files to manage clients and reviews

## 📁 File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Main JavaScript functionality
├── clients.js          # ⭐ EDIT THIS - Client projects configuration
├── reviews.js          # ⭐ EDIT THIS - Client reviews/testimonials
└── README.md           # This documentation
```

## ⚡ Quick Start

### 1. Update Your Contact Information

Open `clients.js` and update the `CONFIG` object:

```javascript
const CONFIG = {
    githubUsername: "newweb050",
    whatsappNumber: "919876543210",  // Your WhatsApp number
    email: "newweb050@gmail.com",
    phone: "+91 98765 43210",
    businessName: "NewWeb050"
};
```

### 2. Update Contact Details in HTML

Open `index.html` and search for these placeholders to update:
- WhatsApp number: `919876543210`
- Email: `newweb050@gmail.com`
- Phone: `+91 98765 43210`

### 3. Add Your Client Projects

Edit `clients.js` to add your actual client projects:

```javascript
const CLIENTS = [
    {
        name: "Client Business Name",
        description: "Brief project description",
        liveUrl: "https://client-domain.com",
        githubUrl: "https://github.com/you/repo",
        image: null,  // or "images/screenshot.png"
        tags: ["Industry", "Plan Type"]
    },
    // Add more clients...
];
```

### 4. Add Client Reviews

Edit `reviews.js` to add verified client testimonials:

```javascript
const REVIEWS = [
    {
        name: "Client Name",
        business: "Their Business",
        rating: 5,
        message: "Their review...",
        website: "https://their-site.com"
    },
    // Add more reviews...
];
```

## 🌐 Deploying to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `your-username.github.io` (for main site) or any name for project site

### Step 2: Upload Files

```bash
# Initialize git in your Portfolio folder
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/your-repo.git

# Push
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://your-username.github.io/your-repo/`

## 📱 Customization Guide

### Changing Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --primary-dark: #4f46e5;   /* Darker shade */
    --secondary: #0ea5e9;      /* Secondary color */
    --accent: #f59e0b;         /* Accent/highlight */
}
```

### Changing Logo/Brand Name

In `index.html`, find and update:

```html
<a href="#" class="logo">
    <i class="fas fa-code"></i>
    <span>NewWeb050</span>
</a>
```

### Adding Screenshots

1. Create an `images` folder
2. Add screenshots of client websites
3. Update `clients.js`:

```javascript
{
    name: "Client Name",
    image: "images/client-screenshot.png",
    // ...
}
```

### Updating Pricing

In `index.html`, find the pricing section and update the amounts:
- Search for `₹3,500` and `₹7,500` to find pricing elements
- Update the features list as needed

## 🔗 Connecting Custom Domain

After deploying to GitHub Pages:

1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter the domain (e.g., `webcraftstudio.com`)
3. Click **Save**
4. Add DNS records at your domain registrar:
   - **A Record**: Point to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record** (for www): Point to `your-username.github.io`

## 📋 Client Website Workflow

When you complete a client project:

1. **Host on GitHub Pages** - Push client site to their own repo
2. **Connect Domain** - Help client connect their domain
3. **Update Portfolio** - Add to `clients.js`:

```javascript
{
    name: "New Client Business",
    description: "What you built for them",
    liveUrl: "https://their-domain.com",
    githubUrl: "https://github.com/you/their-repo",
    tags: ["Industry", "Full Website"]
}
```

4. **Request Review** - Ask client to submit a review on your portfolio

## 🛠 Technical Notes

- **No Backend Required** - Pure static site, works on any host
- **No Build Process** - Edit files directly, changes apply immediately
- **SEO Ready** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support
- **Performance** - Optimized CSS and lazy loading images

## 📞 Support

For issues with this template:
- Check browser console for JavaScript errors
- Ensure all files are in the same directory
- Verify GitHub username in `clients.js` CONFIG

---

Made with ❤️ for small business web developers
# newweb050.github.io
