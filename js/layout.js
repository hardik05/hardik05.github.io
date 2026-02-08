const HeaderHTML = `
<div class="container mx-auto flex justify-between items-center p-4 md:p-6 gap-6">
    <a href="{{PREFIX}}index.html" class="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-blue-500 tracking-widest shrink-0">
        <img src="{{PREFIX}}images/logo.jpg" alt="Fuzzing.in Logo" class="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-blue-500">
        FUZZING.IN
    </a>
    <nav class="hidden md:flex space-x-3 lg:space-x-6 text-xs lg:text-sm font-medium items-center">
        <a href="{{PREFIX}}index.html" class="hover:text-blue-400 transition" data-link="index.html">Home</a>
        <a href="{{PREFIX}}trainings.html" class="hover:text-blue-400 transition" data-link="trainings.html">Trainings</a>
        <a href="{{PREFIX}}blog.html" class="hover:text-blue-400 transition" data-link="blog.html">Blog</a>
        <a href="{{PREFIX}}advisories.html" class="hover:text-blue-400 transition" data-link="advisories.html">Advisories</a>
        <a href="{{PREFIX}}about.html" class="hover:text-blue-400 transition" data-link="about.html">About</a>
        <a href="{{PREFIX}}verify.html" class="hover:text-blue-400 transition" data-link="verify.html">Verify Certificate</a>
        
        <!-- Resources Dropdown -->
        <div class="relative group py-2">
            <button class="flex items-center gap-1 hover:text-blue-400 transition tracking-wider dropdown-btn">
                Resources <i class="fas fa-chevron-down text-[8px] transition-transform group-hover:rotate-180"></i>
            </button>
            <div class="absolute right-0 mt-0 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 dropdown-content">
                <a href="{{PREFIX}}patents.html" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 transition" data-link="patents.html">Patents</a>
                <a href="{{PREFIX}}publications.html" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 transition" data-link="publications.html">Publications</a>
                <a href="{{PREFIX}}media.html" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-500 transition" data-link="media.html">Media Coverage</a>
            </div>
        </div>

        <a href="{{PREFIX}}contact.html" class="hover:text-blue-400 transition" data-link="contact.html">Contact</a>
        <a href="{{PREFIX}}contact.html" class="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition shadow-md whitespace-nowrap" data-link="contact.html">Private Training</a>
        
        <button id="theme-toggle" aria-label="Toggle Dark Mode" class="text-gray-500 dark:text-gray-300 hover:text-blue-400 transition ml-1 lg:ml-2">
            <i class="fas fa-moon theme-toggle-icon"></i>
        </button>
    </nav>
    <button class="md:hidden text-2xl text-gray-900 dark:text-white" aria-label="Open Menu"><i class="fas fa-bars"></i></button>
</div>
`;

const FooterHTML = `
<div class="mt-4 flex justify-center space-x-6 text-2xl">
    <a href="https://twitter.com/hardik05" target="_blank" class="text-gray-500 hover:text-blue-400 transition"><i class="fab fa-twitter"></i></a>
    <a href="https://www.linkedin.com/in/hardik05" target="_blank" class="text-gray-500 hover:text-blue-400 transition"><i class="fab fa-linkedin-in"></i></a>
    <a href="https://www.youtube.com/channel/UCDX-6Auq06Fmwbh7zj5j8_A" target="_blank" class="text-gray-500 hover:text-blue-400 transition"><i class="fab fa-youtube"></i></a>
    <a href="https://github.com/hardik05" target="_blank" class="text-gray-500 hover:text-blue-400 transition"><i class="fab fa-github"></i></a>
</div>
<div class="mt-6 text-gray-600 text-xs space-x-4">
    <span>&copy; <span id="current-year"></span> Fuzzing.in</span>
    <span id="last-updated"></span>
    <a href="{{PREFIX}}verify.html" class="hover:text-gray-400">Verify Certificate</a>
    <a href="#" class="hover:text-gray-400">Terms</a>
    <a href="#" class="hover:text-gray-400">Privacy</a>
</div>
<div class="mt-4 text-gray-500 dark:text-gray-400 text-xs max-w-2xl mx-auto">
    Disclaimer: The views and opinions expressed on this website are Hardik's own and do not necessarily reflect the official policy or position of his current or previous employers.
</div>
`;

function injectLayout() {
    // Determine path prefix for subdirectories (e.g. /blog/)
    const pathDepth = window.location.pathname.split('/').length - 2; // -2 because of empty first element and file name
    const prefix = pathDepth > 0 ? '../'.repeat(pathDepth) : '';

    // Inject Header
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = HeaderHTML.replace(/{{PREFIX}}/g, prefix);
    }

    // Inject Footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = FooterHTML.replace(/{{PREFIX}}/g, prefix);
    }

    // Highlight Active Link
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.dataset.link === currentFile) {
            link.classList.add('text-blue-400', 'font-bold');
            
            // If it's inside a dropdown, highlight the parent too
            const dropdown = link.closest('.group');
            if (dropdown) {
                const btn = dropdown.querySelector('.dropdown-btn');
                if (btn) btn.classList.add('text-blue-400', 'font-bold');
            }
        }
    });

    // Set Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Run immediately to avoid flash of unstyled content if possible, or on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLayout);
} else {
    injectLayout();
}