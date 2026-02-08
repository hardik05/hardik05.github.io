const testimonials = [
    {
        quote: "Practical Fuzzing offers an excellent hands-on experience. Hardik explains complex concepts clearly, and the labs make applying techniques on Linux and Windows easy. It significantly improved my security analysis skills. Highly recommended for building real-world fuzzing expertise.",
        author: "Alhanouf Alqahtani",
        color: "text-emerald-500"
    },
    {
        quote: "The 'Mastering Fuzzing' training was a game-changer for my career. The hands-on labs with AFL++ and custom mutators helped me find my first CVE within weeks.",
        author: "Security Engineer",
        color: "text-blue-500"
    },
    {
        quote: "Hardik's deep knowledge of Windows internals made the binary fuzzing workshop incredibly valuable. Highly recommended for anyone looking to move beyond basic web app sec.",
        author: "Vulnerability Researcher",
        color: "text-blue-500"
    },
    {
        quote: "Excellent content delivery and pacing. The section on crash triaging saved our team countless hours. A must-attend for product security teams.",
        author: "AppSec Lead",
        color: "text-amber-500"
    },
    {
        quote: "The practical exercises on fuzzing network protocols were exactly what I needed. Great balance of theory and practice.",
        author: "Network Security Engineer",
        color: "text-purple-500"
    },
    {
        quote: "One of the best security trainings I've attended. The instructor explains complex concepts clearly.",
        author: "Security Consultant",
        color: "text-pink-500"
    },
    {
        quote: "Learned so much about AFL and libFuzzer. The custom mutator section was brilliant.",
        author: "Software Engineer",
        color: "text-indigo-500"
    }
];

function renderTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear and setup container
    container.innerHTML = '';
    container.className = 'relative group w-full px-4 md:px-12';

    // Create the scrollable viewport
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'overflow-x-auto no-scrollbar scroll-smooth flex gap-6 py-4 items-stretch';
    
    // Function to create a testimonial card
    const createCard = (t) => {
        return `
            <div class="w-72 md:w-80 shrink-0 flex flex-col">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative flex flex-col flex-grow transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <i class="fas fa-quote-left text-2xl text-blue-500/10 dark:text-gray-400/10 absolute top-4 left-4"></i>
                    <div class="flex-grow">
                        <p class="text-gray-600 dark:text-gray-300 italic text-sm md:text-base leading-relaxed">"${t.quote}"</p>
                    </div>
                    <div class="mt-4 flex justify-between items-center border-t border-gray-50 dark:border-gray-700 pt-4">
                        <i class="fas fa-quote-right text-2xl text-blue-500/10 dark:text-gray-400/10"></i>
                        <p class="text-right text-xs ${t.color} font-bold">- ${t.author}</p>
                    </div>
                </div>
            </div>
        `;
    };

    // Render original list + duplicate for pseudo-infinite scroll
    let cardsHtml = testimonials.map(createCard).join('');
    cardsHtml += testimonials.map(createCard).join('');

    scrollContainer.innerHTML = cardsHtml;
    container.appendChild(scrollContainer);

    // Add navigation buttons
    const btnClass = "absolute top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 md:p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 z-30 flex items-center justify-center cursor-pointer";
    
    const prevBtn = document.createElement('button');
    prevBtn.className = `${btnClass} left-2 md:left-4`;
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.onclick = (e) => {
        e.preventDefault();
        scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const nextBtn = document.createElement('button');
    nextBtn.className = `${btnClass} right-2 md:right-4`;
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.onclick = (e) => {
        e.preventDefault();
        scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
    };

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    // Auto-scroll logic
    let isPaused = false;
    container.onmouseenter = () => isPaused = true;
    container.onmouseleave = () => isPaused = false;
    container.ontouchstart = () => isPaused = true;
    container.ontouchend = () => {
        setTimeout(() => { isPaused = false; }, 2000);
    };
    
    function step() {
        if (!isPaused) {
            scrollContainer.scrollLeft += 0.5;
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
                scrollContainer.scrollLeft = 1;
            }
        }
        requestAnimationFrame(step);
    }
    
    setTimeout(() => requestAnimationFrame(step), 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTestimonials('testimonials-container');
});
