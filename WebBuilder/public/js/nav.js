document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });

    // Optional: Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });

    // Optional: Close sidebar on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });
});