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

function openModal(roomname, price) {
    document.getElementById('modal-title').textContent = roomname;
    document.getElementById('modal-info').textContent =  `${roomname} วิวดีสะอาดเหมาะกับการเที่ยว`
    document.getElementById('modal-price').textContent = price + 'บาท';
    document.getElementById('modal-body').classList.remove('hide');
    document.getElementById('modal-success').classList.remove('show');
    document.getElementById('modal-overlay').classList.add('open');
}

function CloseModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}


function Confirm() {
    document.getElementById('modal-body').classList.add('hide');
    document.getElementById('modal-success').classList.add('show');
    setTimeout(() => CloseModal(), 2000);
}


