// Theme Initialization
if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
        icon.className = isDark ? 'fas fa-sun theme-toggle-icon' : 'fas fa-moon theme-toggle-icon';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    // Select the hamburger button inside the header
    const mobileBtn = header.querySelector('button.md\\:hidden');
    // Select the desktop nav to clone links from
    const desktopNav = header.querySelector('nav');

    if (mobileBtn && desktopNav) {
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute top-full left-0 w-full shadow-xl z-50';
        
        // Clone links from desktop nav
        const links = desktopNav.querySelectorAll('a');
        const mobileLinksContainer = document.createElement('div');
        mobileLinksContainer.className = 'flex flex-col p-4 space-y-4';

        links.forEach(link => {
            const mobileLink = link.cloneNode(true);
            
            // Base styling for mobile links
            let baseClasses = 'block text-gray-600 dark:text-gray-300 hover:text-blue-400 transition font-medium py-2';
            
            // Preserve active state styling if present on desktop link
            if (link.classList.contains('text-blue-400') && link.classList.contains('font-bold')) {
                baseClasses = 'block text-blue-400 font-bold transition py-2';
            }
            
            // Preserve CTA button styling
            if (link.classList.contains('bg-emerald-600')) {
                baseClasses = 'block text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition shadow-md font-bold';
            }

            mobileLink.className = baseClasses;
            mobileLinksContainer.appendChild(mobileLink);
        });

        // Add Theme Toggle to Mobile Menu
        const mobileThemeBtn = document.createElement('button');
        mobileThemeBtn.onclick = toggleTheme;
        mobileThemeBtn.className = 'block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-400 transition font-medium py-2';
        mobileThemeBtn.innerHTML = '<i class="fas fa-moon theme-toggle-icon mr-2"></i> Toggle Theme';
        mobileLinksContainer.appendChild(mobileThemeBtn);

        mobileMenu.appendChild(mobileLinksContainer);
        header.appendChild(mobileMenu);

        // Toggle functionality
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
            }
        });
    }

    // Bind Theme Toggle to Desktop Nav Button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Initial icon update
    updateThemeIcons();

    // Back to Top Button Logic
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 w-12 h-12 rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 opacity-0 invisible z-50 flex items-center justify-center';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Last Updated
    const lastUpdatedSpan = document.getElementById('last-updated');
    if (lastUpdatedSpan) {
        const date = new Date(document.lastModified);
        lastUpdatedSpan.textContent = 'Last Updated: ' + date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Copy Code Button Logic for Blog Posts
    document.querySelectorAll('.prose pre').forEach(pre => {
        // Check if already wrapped
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper relative group my-6';

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        // Remove default margins from pre to avoid double spacing with wrapper
        pre.classList.add('!my-0');

        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none backdrop-blur-sm';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = "Copy Code";

        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            const text = code ? code.innerText : pre.innerText;
            
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check text-emerald-400"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => console.error('Failed to copy:', err));
        });

        wrapper.appendChild(button);
    });
});