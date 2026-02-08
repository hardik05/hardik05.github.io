// Load layout first
const script = document.createElement('script');
// Check if we are in a subdirectory to load layout.js correctly
const pathDepth = window.location.pathname.split('/').length - 2;
const prefix = pathDepth > 0 ? '../'.repeat(pathDepth) : '';
script.src = prefix + 'js/layout.js';
document.head.appendChild(script);

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

function initMobileMenu() {
    const header = document.querySelector('header');
    const mobileBtn = header.querySelector('button.md\\:hidden');
    const desktopNav = header.querySelector('nav');

    if (mobileBtn && desktopNav) {
        if (header.querySelector('.mobile-menu-container')) return;

        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-container md:hidden hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute top-full left-0 w-full shadow-xl z-50 overflow-y-auto max-h-[80vh]';
        
        const mobileLinksContainer = document.createElement('div');
        mobileLinksContainer.className = 'flex flex-col p-4 space-y-2';

        // Iterate over immediate children of desktop nav
        Array.from(desktopNav.children).forEach(child => {
            // Ignore theme toggle button and script tags
            if (child.id === 'theme-toggle' || child.tagName === 'SCRIPT') return;

            // Handle standard links
            if (child.tagName === 'A') {
                const mobileLink = child.cloneNode(true);
                
                // Base styling for mobile links
                let baseClasses = 'block text-gray-600 dark:text-gray-300 hover:text-blue-400 transition font-medium py-2 px-4 rounded-lg';
                
                // Highlight active
                if (child.classList.contains('text-blue-400') && child.classList.contains('font-bold')) {
                    baseClasses = 'block text-blue-400 font-bold transition py-2 px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg';
                }
                
                // CTA button
                if (child.classList.contains('bg-emerald-600')) {
                    baseClasses = 'block text-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition shadow-md font-bold mt-4';
                }

                mobileLink.className = baseClasses;
                mobileLinksContainer.appendChild(mobileLink);
            }
            // Handle Dropdowns (Groups)
            else if (child.classList.contains('group')) {
                const btnText = child.querySelector('button').textContent.trim();
                const dropdownLinks = child.querySelectorAll('div a');
                
                // Create Accordion Container
                const accordionContainer = document.createElement('div');
                accordionContainer.className = 'border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden';

                // Accordion Button
                const accordionBtn = document.createElement('button');
                accordionBtn.className = 'w-full flex justify-between items-center text-left text-gray-600 dark:text-gray-300 hover:text-blue-400 transition font-medium py-2 px-4 bg-gray-50 dark:bg-gray-800/50';
                accordionBtn.innerHTML = `${btnText} <i class="fas fa-chevron-down text-xs transition-transform duration-300"></i>`;
                
                // Accordion Content
                const accordionContent = document.createElement('div');
                accordionContent.className = 'hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800';

                // Toggle Logic
                accordionBtn.onclick = () => {
                    const isExpanded = !accordionContent.classList.contains('hidden');
                    accordionContent.classList.toggle('hidden');
                    const icon = accordionBtn.querySelector('i');
                    if (isExpanded) {
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        icon.style.transform = 'rotate(180deg)';
                    }
                };

                // Add Links to Content
                dropdownLinks.forEach(link => {
                    const subLink = link.cloneNode(true);
                    subLink.className = 'block pl-8 pr-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-400 border-l-2 border-transparent hover:border-blue-400 transition';
                    accordionContent.appendChild(subLink);
                });

                accordionContainer.appendChild(accordionBtn);
                accordionContainer.appendChild(accordionContent);
                mobileLinksContainer.appendChild(accordionContainer);
            }
        });

        // Add Theme Toggle
        const mobileThemeBtn = document.createElement('button');
        mobileThemeBtn.onclick = toggleTheme;
        mobileThemeBtn.className = 'flex items-center w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-400 transition font-medium py-2 px-4 mt-2 border-t border-gray-100 dark:border-gray-800 pt-4';
        mobileThemeBtn.innerHTML = '<i class="fas fa-moon theme-toggle-icon mr-3"></i> Toggle Mode';
        mobileLinksContainer.appendChild(mobileThemeBtn);

        mobileMenu.appendChild(mobileLinksContainer);
        header.appendChild(mobileMenu);

        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initMobileMenu();
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
        updateThemeIcons();
        const lastUpdatedSpan = document.getElementById('last-updated');
        if (lastUpdatedSpan) {
            const date = new Date(document.lastModified);
            lastUpdatedSpan.textContent = 'Last Updated: ' + date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    }, 150);

    // Back to Top Button
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

    // Copy Code
    document.querySelectorAll('.prose pre').forEach(pre => {
        if (pre.parentNode.classList.contains('code-block-wrapper')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper relative group my-6';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        pre.classList.add('!my-0');
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none backdrop-blur-sm';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            const text = code ? code.innerText : pre.innerText;
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check text-emerald-400"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        wrapper.appendChild(button);
    });
});