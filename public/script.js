const navLinks = document.querySelectorAll('nav a');
const contentArea = document.getElementById('content');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const sectionId = link.id;
        loadSection(sectionId);
    });
});

function loadSection(sectionId) {
    contentArea.innerHTML = ''; // Clear any previous content

    switch (sectionId) {
        case 'order-management':
            contentArea.appendChild(buildOrderManagementSection());
            break;
        case 'inventory-management':
            contentArea.appendChild(buildInventoryManagementSection());
            break;
        case 'table-reservations':
            contentArea.appendChild(buildTableReservationsSection());
            break;
        default: 
            contentArea.innerText = 'Section not found';
    }
}

function buildOrderManagementSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2>Order Management</h2>
        <h3>Menu</h3>
        <div id="menu-items">
            <div class="menu-item">
                <h4>Pizza</h4>
                <p>$12.99</p>
                <button class="add-to-order">Add to Order</button>
            </div>
            <div class="menu-item">
                <h4>Burger</h4>
                <p>$10.5</p>
                <button class="add-to-order">Add to Order</button>
            </div>
        </div>
        <div id="current-order">
            <h3>Current Order</h3>
        </div>
    `;
    return section;
}

function buildInventoryManagementSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2>Inventory Management</h2>
        <button id="add-new-item">Add New Item</button> 
        <table> 
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Stock Quantity</th>
                    <th>Actions</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tomatoes</td>
                    <td>15</td>
                    <td><button class="edit-stock">Edit</button></td>
                </tr>
                </tbody>
        </table>
    `;
    return section;
}

function buildTableReservationsSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2>Table Reservations</h2>
        <form id="reservation-form">
            <label for="date">Date:</label>
            <input type="date" id="date" name="date">

            <label for="time">Time:</label>
            <input type="time" id="time" name="time">

            <label for="guests">Number of Guests:</label>
            <input type="number" id="guests" name="guests">

            <button type="submit">Make Reservation</button>
        </form>
        <div id="reservation-calendar">
            </div>
    `;
    return section;
}
