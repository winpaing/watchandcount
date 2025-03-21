class MobileOptimizer {
    constructor() {
        this.initializeMobileOptimizations();
    }

    initializeMobileOptimizations() {
        this.handleTouchEvents();
        this.optimizeScrolling();
        this.adjustAnimationsForMobile();
        this.handleOrientationChange();
    }

    handleTouchEvents() {
        document.addEventListener('touchstart', e => {
            if (e.touches.length > 1) {
                e.preventDefault(); // Prevent pinch zoom
            }
        }, { passive: false });

        const touchElements = document.querySelectorAll('.gallery-item, .card, .control-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });

            element.addEventListener('touchend', () => {
                element.classList.remove('touch-active');
            });
        });
    }

    optimizeScrolling() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    adjustAnimationsForMobile() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            const animatedElements = document.querySelectorAll('.animated');
            animatedElements.forEach(element => {
                element.style.animationDuration = '0.5s';
            });

            // Reduce particle effects
            if (window.backgroundAnimations) {
                window.backgroundAnimations.reduceEffects();
            }
        }
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
                this.adjustLayoutForOrientation();
            }, 200);
        });
    }

    adjustLayoutForOrientation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        document.body.classList.toggle('landscape', isLandscape);
    }
}

// Initialize mobile optimizations
const mobileOptimizer = new MobileOptimizer();