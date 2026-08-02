let selectedRoomName = "";
let selectedRoomPrice = 0;


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
    selectedRoomName = roomname;
    selectedRoomPrice = Number(price);
    const checkIn = document.getElementById('check-in').value
    const checkOut = document.getElementById('check-out').value
    const oneDay = 1000 * 60 * 60 * 24;
    const nights =
        (new Date(checkOut) - new Date(checkIn)) / oneDay;
    const totalPrice = nights * selectedRoomPrice;

    document.getElementById("booking-summary").innerHTML = `
        <p>ห้อง: ${selectedRoomName}</p>
        <p>เช็กอิน: ${checkIn}</p>
        <p>เช็กเอาต์: ${checkOut}</p>
        <p>จำนวนคืน: ${nights} คืน</p>
        <p>ราคา: ${selectedRoomPrice.toLocaleString()} บาท/คืน</p>
        <p>ราคารวม: ${totalPrice.toLocaleString()} บาท</p>
    `;
    document.getElementById('modal-overlay').classList.add('open');
}

function CloseModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}




function Confirm() {

    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    if (!name || !email) {
        alert('กรุณากรอกข้อมูลให้ครบ');
        return;
    }


    const checkIn = document.getElementById('check-in').value
    const checkOut = document.getElementById('check-out').value

    const oneDay = 1000 * 60 * 60 * 24;
    const nights =
        (new Date(checkOut) - new Date(checkIn)) / oneDay;
    const totalPrice = nights * selectedRoomPrice;

    const booking = {
        id: Date.now(),
        customerName: name,
        customerEmail: email,
        roomName: selectedRoomName,
        roomPrice: selectedRoomPrice,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        totalPrice: totalPrice,
        guest: Number(document.getElementById('guests').value),
    }


    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    bookings.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    console.log(booking)


    document.getElementById('modal-body').classList.add('hide');
    document.getElementById('modal-success').classList.add('show');
    setTimeout(() => CloseModal(), 2000);
}




const searchbutton = document.getElementById('search-btn')


searchbutton.addEventListener("click", function () {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guest = Number(document.getElementById('guests').value)


    let availableRoomcount = 0;
    if (!checkIn || !checkOut) {
        alert('กรุณาเลือกวันเข้าพัก')
        return;
    }

    if (new Date(checkOut) < new Date(checkIn)) {
        alert('เลือกวันดีๆเพื่อน');
        return;
    }

    document.querySelectorAll('.grid-item').forEach(function (room) {
        const status = room.dataset.status;
        const capacity = Number(room.dataset.cap)


        const canbook = status === "available" && capacity >= guest;

        room.classList.toggle("hidden", !canbook);

        if (canbook) {
            availableRoomcount++;
        }
    })

    const searchResult = document.getElementById('search-result');
    if (availableRoomcount == 0) {
        searchResult.textContent = 'ไม่พบห้องว่าง'
    } else {
        searchResult.textContent = `พบห้องว่าง ${availableRoomcount} ห้อง`
    }

})


function showBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const bookingsList = document.getElementById('booking-list');

    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>ยังไม่มีรายการจอง</p>'
        return;
    }

    bookingsList.innerHTML = bookings.map(function (booking) {
        return `
                    <div class="booking-card">
                <h3>${booking.roomName}</h3>

                <p>ชื่อผู้จอง: ${booking.customerName}</p>
                <p>อีเมล: ${booking.customerEmail}</p>
                <p>เช็กอิน: ${booking.checkIn}</p>
                <p>เช็กเอาต์: ${booking.checkOut}</p>
                <p>จำนวนผู้เข้าพัก: ${booking.guest} คน</p>
                <p>จำนวนคืน: ${booking.nights} คืน</p>
                <p>ราคารวม: ${booking.totalPrice?.toLocaleString()} บาท</p>
                <button
                class="cancel-booking-btn"
                onclick="cancelBooking(${booking.id})">
                ยกเลิกการจอง
            </button>
            </div>
        `;

    }).join("");


}
showBookings();


function cancelBooking(id) {
    const ConfirmCancel = confirm('ต้องการยกเลิกการจองห้องพักหรือไม่');

    if (!ConfirmCancel) {
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const remainingBooking = bookings.filter(function (booking) {
        return booking.id !== id;
    });

    localStorage.setItem(

        "bookings",JSON.stringify(remainingBooking)
    );

    showBookings()

}






