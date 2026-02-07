// 1. DYNAMIC TERMINAL (Sentient Logic)
const termMessages = [
    "USER_CONNECTION_ESTABLISHED...",
    "ANALYZING_BEHAVIORAL_PATTERNS",
    "DECRYPTING_ARTIFACTS",
    "WARNING: RATE_LIMITING_HUMAN_CURIOSITY",
    "LOCATION_SYNCED: LONDON_STATION",
    "COFFEE_LEVEL_CRITICAL",
    "UPDATING_PEER_NODES..."
];

const terminalBody = document.getElementById('terminal-body');

function updateTerminal() {
    const msg = termMessages[Math.floor(Math.random() * termMessages.length)];
    const p = document.createElement('p');
    p.innerHTML = `>> ${msg}`;
    p.style.opacity = '0';
    terminalBody.prepend(p);
    gsap.to(p, { opacity: 1, duration: 0.5 });
    
    if (terminalBody.children.length > 8) terminalBody.lastElementChild.remove();
}
setInterval(updateTerminal, 4000);

// 2. ESCALATION SYSTEM
let isEscalated = false;
function toggleEscalation() {
    isEscalated = !isEscalated;
    document.body.classList.toggle('theme-escalated');
    const statusText = document.getElementById('status-text');
    
    if (isEscalated) {
        statusText.innerText = "ESCALATED";
        statusText.style.color = "#FF3E3E";
        gsap.to("main", { skewX: 0.5, duration: 0.1, repeat: 5, yoyo: true });
    } else {
        statusText.innerText = "STABLE";
        statusText.style.color = "#D4AF37";
    }
}

// 3. KINETIC TYPOGRAPHY (Parallax Name)
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 40;
    const yPos = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to("#parallax-name", {
        x: xPos,
        y: yPos,
        rotateX: -yPos * 0.5,
        rotateY: xPos * 0.5,
        duration: 0.5
    });

    // Cursor Follow
    gsap.to("#cursor", {
        x: clientX - 7,
        y: clientY - 7,
        duration: 0.1
    });
});

// 4. UPTIME TIMER
let seconds = 0;
setInterval(() => {
    seconds++;
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById('uptime').innerText = `${hrs}:${mins}:${secs}`;
}, 1000);

// 5. STAGGER ENTRANCE
gsap.from(".artifact-card", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power4.out"
});
