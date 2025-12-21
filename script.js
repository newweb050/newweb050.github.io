/* ============================================
   WebCraft Studio - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPortfolio();
    initReviews();
    initStarRating();
    initForms();
    initScrollAnimations();
});

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   Portfolio - Fetch ONLY from GitHub
   ============================================ */
async function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    // Show loading state
    portfolioGrid.innerHTML = '<div class="loading-skeleton"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div>';
    
    // Fetch repos from GitHub
    const repos = await fetchGitHubProjects();
    
    // Clear loading state
    portfolioGrid.innerHTML = '';
    
    if (repos.length > 0) {
        // Render each repo as a portfolio card
        repos.forEach(repo => {
            const hostedUrl = `https://newweb050.github.io/${repo.name}/`;
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            
            const repoName = repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const description = repo.description || 'Professional business website';
            const language = repo.language || 'Website';
            
            card.innerHTML = `
                <div class="portfolio-image">
                    <div class="placeholder"><i class="fas fa-globe"></i></div>
                    <div class="portfolio-overlay">
                        <a href="${hostedUrl}" target="_blank" title="Visit Website"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
                <div class="portfolio-content">
                    <h3>${repoName}</h3>
                    <p>${description}</p>
                    <div class="portfolio-tags">
                        <span class="portfolio-tag">${language}</span>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(card);
        });
    } else {
        // No repos found
        portfolioGrid.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-rocket"></i>
                <h3>Coming Soon!</h3>
                <p>Our client projects will appear here soon.</p>
            </div>
        `;
    }
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/newweb050/repos?sort=pushed&per_page=30');
        if (!response.ok) return [];
        
        const repos = await response.json();
        
        // Filter: exclude portfolio repo, forks, and hidden repos
        return repos.filter(repo => 
            repo.name !== 'newweb050.github.io' && 
            !repo.fork && 
            !repo.name.startsWith('.')
        ).slice(0, 6);
    } catch (error) {
        console.error('GitHub fetch error:', error);
        return [];
    }
}

/* ============================================
   Reviews
   ============================================ */
function initReviews() {
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return;
    
    // Load reviews from reviews.js or localStorage
    let reviews = [];
    
    // First check for defined reviews in reviews.js
    if (typeof REVIEWS !== 'undefined' && REVIEWS.length > 0) {
        reviews = REVIEWS;
    }
    
    // Also check localStorage for submitted reviews
    const storedReviews = getStoredReviews();
    if (storedReviews.length > 0) {
        reviews = [...reviews, ...storedReviews];
    }
    
    // If still no reviews, show sample reviews
    if (reviews.length === 0) {
        reviews = getSampleReviews();
    }
    
    renderReviews(reviews);
}

function renderReviews(reviews) {
    const reviewsGrid = document.getElementById('reviews-grid');
    reviewsGrid.innerHTML = '';
    
    reviews.forEach(review => {
        const card = createReviewCard(review);
        reviewsGrid.appendChild(card);
    });
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const initials = getInitials(review.name);
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    card.innerHTML = `
        <div class="review-header">
            <div class="review-avatar">${initials}</div>
            <div class="review-info">
                <h4>${review.name}</h4>
                <p>${review.business}</p>
            </div>
        </div>
        <div class="review-stars">${stars}</div>
        <p class="review-text">${review.message}</p>
    `;
    
    return card;
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

function getSampleReviews() {
    return [
        {
            name: "Rajesh Kumar",
            business: "Kumar Electronics",
            rating: 5,
            message: "Excellent work! They delivered a beautiful website within 5 days. My customers can now easily find my shop and contact me directly. Highly recommended for small businesses."
        },
        {
            name: "Priya Sharma",
            business: "Priya's Beauty Salon",
            rating: 5,
            message: "Very professional team. The website looks modern and works perfectly on mobile. The QR code feature is great - customers just scan it at the counter!"
        },
        {
            name: "Mohammed Ali",
            business: "Ali's Biryani House",
            rating: 4,
            message: "Good service and reasonable price. The menu display feature helps my customers see all items with prices. Would definitely recommend to other restaurant owners."
        }
    ];
}

function getStoredReviews() {
    try {
        const stored = localStorage.getItem('webcraftstudio_reviews');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveReview(review) {
    try {
        const reviews = getStoredReviews();
        reviews.unshift(review);
        localStorage.setItem('webcraftstudio_reviews', JSON.stringify(reviews));
        return true;
    } catch (e) {
        console.error('Error saving review:', e);
        return false;
    }
}

/* ============================================
   Star Rating Input
   ============================================ */
function initStarRating() {
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('rating-value');
    
    if (!starRating || !ratingInput) return;
    
    const stars = starRating.querySelectorAll('i');
    
    // Set initial state (5 stars)
    updateStars(5);
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            ratingInput.value = rating;
            updateStars(rating);
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        updateStars(parseInt(ratingInput.value));
    });
    
    function updateStars(rating) {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }
}

/* ============================================
   Forms
   ============================================ */
function initForms() {
    // Review Form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleReviewSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const review = {
        name: formData.get('name'),
        business: formData.get('business'),
        website: formData.get('website'),
        rating: parseInt(formData.get('rating')),
        message: formData.get('message'),
        date: new Date().toISOString()
    };
    
    // Save to localStorage (for demo purposes)
    // In production, you'd send this to a backend or use a service like Formspree
    if (saveReview(review)) {
        showToast('Thank you for your review! It will appear on the page.', 'success');
        form.reset();
        document.getElementById('rating-value').value = 5;
        initStarRating();
        
        // Re-render reviews
        initReviews();
    } else {
        showToast('There was an error submitting your review. Please try again.', 'error');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Build WhatsApp message
    const name = formData.get('name');
    const phone = formData.get('phone');
    const businessType = formData.get('business-type');
    const plan = formData.get('plan');
    const message = formData.get('message');
    
    const planName = plan === 'essential' ? 'Essential Website (₹3,500)' : 'Full Business Website (₹7,500)';
    
    let whatsappMessage = `Hi! I'm interested in getting a website for my business.\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    if (businessType) whatsappMessage += `*Business Type:* ${businessType}\n`;
    whatsappMessage += `*Plan:* ${planName}\n`;
    if (message) whatsappMessage += `\n*Details:*\n${message}`;
    
    // Get WhatsApp number from config or use default
    const whatsappNumber = typeof CONFIG !== 'undefined' ? CONFIG.whatsappNumber : '919876543210';
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('Opening WhatsApp...', 'success');
}

/* ============================================
   Toast Notifications
   ============================================ */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-card, .review-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// CSS class for animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

/* ============================================
   Utility Functions
   ============================================ */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
