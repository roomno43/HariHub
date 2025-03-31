document.getElementById('searchBtn').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const videos = document.querySelectorAll('.video');

    videos.forEach(video => {
        const title = video.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchQuery)) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
});
