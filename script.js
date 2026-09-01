// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // We only want the animation to play once per scroll view, 
            // but for a dynamic feel we can let it trigger again when re-entering viewport
            // To animate only once, uncomment the line below:
            // observer.unobserve(entry.target); 
        } else {
            // Remove the class when out of view to replay animation when scrolling back
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

// Wait for DOM content to load before observing
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with hidden class
    document.querySelectorAll('.hidden').forEach((element) => {
        observer.observe(element);
    });
    
    // Trigger the initial animation for elements already in view
    setTimeout(() => {
        document.querySelectorAll('.hidden').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('show');
            }
        });
    }, 100);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive Cursor Sprinkles (Pink Hearts)
let sprinkleCounter = 0;
document.addEventListener('mousemove', (e) => {
    // Only spawn a heart every 5 mousemove events to prevent screen clutter
    sprinkleCounter++;
    if (sprinkleCounter % 5 !== 0) return;

    const sprinkle = document.createElement('i');
    sprinkle.className = 'fas fa-heart cursor-sprinkle';
    sprinkle.style.left = `${e.pageX}px`;
    sprinkle.style.top = `${e.pageY}px`;

    // Randomize initial size
    const randomSize = Math.random() * 8 + 10; // between 10px and 18px
    sprinkle.style.fontSize = `${randomSize}px`;

    document.body.appendChild(sprinkle);

    // Remove element after animation completes (1 second)
    setTimeout(() => {
        sprinkle.remove();
    }, 1000);
});

// Button Ripple Animation
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Calculate click position relative to button
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        // Ensure ripple is perfectly centered on click
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple after animation completes (600ms matches CSS)
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Page Transition Out Animation
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If it's an internal page link and not a hash link or new tab
        if (href && !href.startsWith('#') && !this.hasAttribute('target') && href.endsWith('.html')) {
            e.preventDefault(); // Stop immediate navigation
            
            // Trigger fade out animation
            document.body.classList.add('fade-out');
            
            // Wait for CSS animation to finish before actually navigating
            setTimeout(() => {
                window.location.href = href;
            }, 450); // Slightly less than 500ms to ensure smooth handoff
        }
    });
});
