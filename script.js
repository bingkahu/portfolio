document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ACCORDION LOGIC ---
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        // Main Click Interaction
        row.addEventListener('click', () => {
            const detail = row.querySelector('.project-detail');
            const isActive = row.classList.contains('active');

            // Close all other rows first (Accordion behavior)
            projectRows.forEach(otherRow => {
                if (otherRow !== row) {
                    otherRow.classList.remove('active');
                    otherRow.querySelector('.project-detail').style.height = '0';
                }
            });

            // Toggle current row
            if (!isActive) {
                row.classList.add('active');
                // Set height to scrollHeight to animate smoothly
                detail.style.height = detail.scrollHeight + 'px';
            } else {
                row.classList.remove('active');
                detail.style.height = '0';
            }
        });

        // Hover Interactions for Cursor
        row.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        row.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // Handle Window Resize (Reset heights if needed)
    window.addEventListener('resize', () => {
        const activeRow = document.querySelector('.project-row.active');
        if (activeRow) {
            const detail = activeRow.querySelector('.project-detail');
            detail.style.height = 'auto'; // Reset to auto to recalculate
            const newHeight = detail.scrollHeight;
            detail.style.height = newHeight + 'px';
        }
    });


    // --- 2. REAL-TIME CLOCK (London Time) ---
    function updateTime() {
        const timeDisplay = document.getElementById('time-display');
        const now = new Date();
        
        // Format for London (Matteo's location)
        const options = { 
            timeZone: 'Europe/London', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
        timeDisplay.textContent = timeString;
    }

    setInterval(updateTime, 1000);
    updateTime(); // Run immediately


    // --- 3. CUSTOM CURSOR LOGIC ---
    const cursor = document.getElementById('cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop for cursor
    function animateCursor() {
        // Linear interpolation for smooth lag
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15; // Speed of follow (0.1 = slow, 0.5 = fast)
        cursorY += dy * 0.15;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`; // -10 offsets half the width
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

});
