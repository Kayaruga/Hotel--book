function filterRooms(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
    });

    btn.classList.add('active');

    document.querySelectorAll('.grid-item').forEach(card => {
        const status = card.dataset.status;
        const roomtype = card.dataset.type;

        if (type === 'all') {
            card.classList.remove('hidden')
        } else if (type === 'available') {
            card.classList.toggle('hidden', status !== 'available');
        } else {
            card.classList.toggle('hidden', roomtype !== type)
        }
    })
}


