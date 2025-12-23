/* ============================================
   NewWeb050 - Main JavaScript
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
    
    // Fetch repos from both GitHub accounts
    const repos = await fetchGitHubProjects();
    
    // Clear loading state
    portfolioGrid.innerHTML = '';
    
    if (repos.length > 0) {
        // Render each repo as a portfolio card
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            
            const repoName = repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const description = repo.description || 'Professional business website';
            
            // Screenshot URL using a screenshot service
            const screenshotUrl = `https://image.thum.io/get/width/600/crop/400/${repo.hostedUrl}`;
            
            card.innerHTML = `
                <div class="portfolio-image">
                    <img src="${screenshotUrl}" alt="${repoName}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="placeholder" style="display:none;"><i class="fas fa-globe"></i></div>
                    <div class="portfolio-overlay">
                        <a href="${repo.hostedUrl}" target="_blank" title="Visit Website"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
                <div class="portfolio-content">
                    <h3>${repoName}</h3>
                    <p>${description}</p>
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
        // Fetch from newweb050 GitHub account
        const response = await fetch('https://api.github.com/users/newweb050/repos?sort=pushed&per_page=30');
        
        const repos = response.ok ? await response.json() : [];
        
        // Filter and process repos from newweb050
        const filteredRepos = repos
            .filter(repo => 
                repo.name !== 'newweb050.github.io' && 
                !repo.fork && 
                !repo.name.startsWith('.')
            )
            .map(repo => ({
                ...repo,
                hostedUrl: `https://newweb050.github.io/${repo.name}/`,
                owner: 'newweb050'
            }));
        
        // Add the buggymaytricks.github.io project manually
        const buggyMayTricksProject = {
            name: 'BuggyMayTricks',
            description: 'Professional portfolio and showcase website',
            hostedUrl: 'https://buggymaytricks.github.io/',
            pushed_at: new Date().toISOString(),
            owner: 'buggymaytricks'
        };
        
        // Combine and sort by updated date
        const allRepos = [buggyMayTricksProject, ...filteredRepos]
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 9); // Show up to 9 projects
        
        return allRepos;
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
    
    // Load reviews from Firebase if available
    if (window.firebaseDB) {
        loadFirebaseReviews();
    } else {
        // Firebase not ready yet, set up callback
        window.loadFirebaseReviews = loadFirebaseReviews;
        // Show loading state
        reviewsGrid.innerHTML = '<div class="loading-skeleton"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div>';
    }
}

async function loadFirebaseReviews() {
    try {
        const { collection, getDocs, query, orderBy, limit, where } = window.firestoreFunctions;
        const db = window.firebaseDB;
        
        if (!db) {
            console.error('Firebase DB not initialized');
            const reviewsGrid = document.getElementById('reviews-grid');
            reviewsGrid.innerHTML = '<div class="no-reviews"><p>Loading reviews...</p></div>';
            return;
        }
        
        console.log('Fetching reviews from Firebase...');
        
        // Query only APPROVED reviews, ordered by date, limit to 20
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('approved', '==', true), orderBy('date', 'desc'), limit(20));
        const querySnapshot = await getDocs(q);
        
        const reviews = [];
        querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`Loaded ${reviews.length} approved reviews from Firebase`);
        
        // Show message if no approved reviews yet
        if (reviews.length === 0) {
            const reviewsGrid = document.getElementById('reviews-grid');
            reviewsGrid.innerHTML = '<div class="no-reviews"><p>No reviews yet. Be the first to share your experience!</p></div>';
            return;
        }
        
        renderReviews(reviews);
    } catch (error) {
        console.error('Error loading reviews from Firebase:', error);
        console.error('Error details:', error.message, error.code);
        const reviewsGrid = document.getElementById('reviews-grid');
        reviewsGrid.innerHTML = '<div class="no-reviews"><p>Unable to load reviews. Please refresh the page.</p></div>';
    }
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
    
    // Build business info with optional website link
    let businessInfo = review.business;
    if (review.website && review.website.trim() !== '') {
        businessInfo = `<a href="${review.website}" target="_blank" rel="noopener noreferrer" class="review-website">${review.business} <i class="fas fa-external-link-alt"></i></a>`;
    }
    
    card.innerHTML = `
        <div class="review-header">
            <div class="review-avatar">${initials}</div>
            <div class="review-info">
                <h4>${review.name}</h4>
                <p>${businessInfo}</p>
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
}

async function handleReviewSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable button during submission
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    const review = {
        name: formData.get('name'),
        business: formData.get('business'),
        website: formData.get('website') || '',
        rating: parseInt(formData.get('rating')),
        message: formData.get('message')
    };
    
    try {
        // Save to Firebase Firestore
        const { collection, addDoc, serverTimestamp } = window.firestoreFunctions;
        const db = window.firebaseDB;
        
        await addDoc(collection(db, 'reviews'), {
            ...review,
            date: serverTimestamp(),
            approved: false // Requires manual approval in Firebase Console
        });
        
        showToast('Thank you for your review! It will appear after approval.', 'success');
        form.reset();
        document.getElementById('rating-value').value = 5;
        initStarRating();
        
        // Reload reviews
        setTimeout(() => loadFirebaseReviews(), 1000);
        
    } catch (error) {
        console.error('Error submitting review:', error);
        showToast('There was an error submitting your review. Please try again.', 'error');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Review';
    }
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
