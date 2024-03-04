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
        case 'staff-details':
            contentArea.appendChild(buildStaffDetailsSection());
            break;
        default: 
            contentArea.innerText = 'Section not found';
    }
}
//Getting data from server
fetch('http://localhost:3000/retrieve')
    .then(response => response.json())
    .then(data => {
console.log('Retrieved Data:', data);
})
    .catch(error => console.error('Error:', error));



const Submit1 = async (orders, customername, phone_no) => {
    try{
        const order = Object.entries(orders).map(([key, value]) => `${key}:${value}`).join(',');
        console.log(order);
        const response = await fetch(`http://localhost:3000/submit1?order=${order}&customername=${customername},&phone_no=${phone_no}`,{cache: 'no-cache'});
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    }catch(error){
      console.log(error);
    }
}

function buildOrderManagementSection() {
    const section = document.createElement('section');
    section.classList.add('order-management-section');

    section.innerHTML = `
        <h2>Order Management</h2>
        <h3>Menu</h3>
        <div id="menu-items">
            <form id="order-form">
                <div class="form-group">
                    <label for="customer-name">Customer Name:</label>
                    <input type="text" id="customername" name="customername">
                </div>
                <div class="form-group">
                    <label for="phone">Customer Phone No:</label>
                    <input type="text" id="phone_no" name="phone_no">
                </div>
                <div class="menu-item">
                    <h4>Pizza</h4>
                    <p id="pprice" value=12.99>$12.99</p>
                    <input type="text" id="pizzaInput" name="pizzaInput" placeholder="Quantity">
                </div>
                <div class="menu-item">
                    <h4>Burger</h4>
                    <p id="bprice" value=12.99>$12.99</p>
                    <input type="text" id="burgerInput" name="burgerInput" placeholder="Quantity">
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div id="current-order">
            <h3>Current Order</h3>
        </div>
    `;

    const orderForm = section.querySelector('#order-form');
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const pizzaValue = parseFloat(document.getElementById('pizzaInput').value);
        const burgerValue = parseFloat(document.getElementById('burgerInput').value);
        const pprice = parseFloat(document.getElementById('pprice').getAttribute('value'));
        const bprice = parseFloat(document.getElementById('bprice').getAttribute('value'));
        const customername = document.getElementById('customername').value;
        const phone_no = document.getElementById('phone_no').value;

        // Now you have the input values in JavaScript variables (pizzaValue, burgerValue)
        console.log('Pizza:', pizzaValue);
        console.log('Burger:', burgerValue);
        console.log(pprice * pizzaValue);
        console.log(bprice * burgerValue);
        console.log(customername);
        console.log(phone_no);

                // dictionary to store orders and their quantity
        let orders = {
            "pizza" : 0,
            "burger" : 0,
        };
        orders["pizza"] = pizzaValue;
        orders["burger"]= burgerValue;
        console.log(orders);

        Submit1(orders, customername, phone_no);

    });
    // const customerId = generateCustomerId();
    // console.log(customerId);


    return section;
}

// Apply custom CSS styles
const style2 = document.createElement('style');
style2.textContent = `
    .order-management-section {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .order-management-section h2,
    .order-management-section h3 {
        text-align: center;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .form-group label {
        display: block;
        margin-bottom: 5px;
    }
    .form-group input[type="text"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .menu-item {
        margin-bottom: 20px;
    }
    .menu-item h4 {
        margin-bottom: 10px;
    }
    .menu-item p {
        margin: 0;
    }
    .menu-item input[type="text"] {
        width: calc(100% - 40px);
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 5px;
    }
    .menu-item input[type="text"]::placeholder {
        color: #999;
    }
    .menu-item button[type="submit"] {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #008CBA;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .menu-item button[type="submit"]:hover {
        background-color: #005f7e;
    }
`;
document.head.appendChild(style2);


// function generateCustomerId() {
//     const prefix = "CUST";
//     const timestamp = Date.now(); // Get the current timestamp
//     const uniqueId = Math.floor(Math.random() * 10000); // Generate a random number
    
//     // Combine the prefix, timestamp, and unique ID
//     const customerId = `${prefix}-${timestamp}-${uniqueId}`;
    
//     return customerId;
// }



const Submit2 = async (newItem, newValue) => {
    try {
        const response = await fetch(`http://localhost:3000/submit2?newItem=${newItem}&newValue=${newValue}`, { cache: 'no-cache' });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch (error) {
        console.log(error);
    }
}

function buildInventoryManagementSection() {
    const section = document.createElement('section');
    section.classList.add('inventory-management-section'); // Add a class for styling

    const sectionHeader = document.createElement('h2');
    sectionHeader.textContent = 'Inventory Management';
    section.appendChild(sectionHeader);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add New Item';
    addButton.classList.add('add-new-item-button'); // Add a class for styling
    section.appendChild(addButton);

    const table = document.createElement('table');
    table.classList.add('inventory-table'); // Add a class for styling
    const tableHead = document.createElement('thead');
    tableHead.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    tableBody.id = 'inventory-table-body';
    table.appendChild(tableBody);

    section.appendChild(table);

    addButton.addEventListener('click', function () {
        const newItemName = prompt('Enter the name of the new item:');
        if (newItemName !== null) {
            const initialStock = prompt('Enter the initial stock quantity:');
            if (initialStock !== null) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${newItemName}</td>
                    <td><span>${initialStock}</span></td>
                    <td><button class="edit-stock">Edit</button></td>
                `;
                Submit2(newItemName, initialStock);
                tableBody.appendChild(newRow);

                const editButton = newRow.querySelector('.edit-stock');
                editButton.addEventListener('click', function () {
                    const stockElement = newRow.querySelector('span');
                    const currentStock = parseInt(stockElement.textContent);
                    const newStock = prompt('Enter the new stock quantity:');
                    if (newStock !== null) {
                        stockElement.textContent = newStock;
                        Submit2(newItemName, newStock);
                    }
                });
            }
        }
    });

    return section;
}

// Apply custom CSS styles
const style = document.createElement('style');
style.textContent = `
    .inventory-management-section {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .inventory-management-section h2 {
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }
    .add-new-item-button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #008CBA;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .add-new-item-button:hover {
        background-color: #005f7e;
    }
    .inventory-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .inventory-table th, .inventory-table td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }
    .inventory-table th {
        background-color: #008CBA;
        color: #fff;
    }
    .edit-stock {
        padding: 5px 10px;
        font-size: 14px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .edit-stock:hover {
        background-color: #347033;
    }
`;
document.head.appendChild(style);

//////////////////////////////////////////////

const Submit = async (customerName, date, time, guests, phone) => {
    try {
        const response = await fetch(`http://localhost:3000/submit3?customerName=${customerName}&date=${date}&time=${time}&guests=${guests}&phone=${phone}`, { cache: 'no-cache' });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch (error) {
        console.log(error);
    }
}

function buildTableReservationsSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2 style="text-align:center;">Table Reservations</h2>
        <form id="reservation-form" style="max-width: 400px; margin: 0 auto;">
            <div style="margin-bottom: 15px;">
                <label for="customer-name" style="display: block; margin-bottom: 5px;">Customer Name:</label>
                <input type="text" id="customer-name" name="customer-name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label for="date" style="display: block; margin-bottom: 5px;">Date:</label>
                <input type="date" id="date" name="date" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label for="time" style="display: block; margin-bottom: 5px;">Time:</label>
                <input type="time" id="time" name="time" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label for="guests" style="display: block; margin-bottom: 5px;">Number of Guests:</label>
                <input type="number" id="guests" name="guests" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label for="phone" style="display: block; margin-bottom: 5px;">Customer Phone No:</label>
                <input type="text" id="phone" name="phone" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <button type="submit" style="background-color: #008CBA; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">Make Reservation</button>
        </form>
        <div id="reservation-calendar" style="margin-top: 20px;"></div>
    `;

    const reservationForm = section.querySelector('#reservation-form');
    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form input values
        const customerName = document.getElementById('customer-name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const phone = document.getElementById('phone').value;

        // Log form input values (you can perform further actions here)
        console.log('Customer Name:', customerName);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Number of Guests:', guests);
        console.log('Phone:', phone);
        Submit(customerName, date, time, guests, phone);

        // Optionally, you can clear the form fields after submission
        // reservationForm.reset();
    });

    return section;
}


////////////////////////////////////////////////


const SubmitStaff = async (staffName, designation, contact) => {
    try {
        const response = await fetch(`http://localhost:3000/submit4?staffName=${staffName}&designation=${designation}&contact=${contact}`, { cache: 'no-cache' });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch (error) {
        console.log(error);
    }
}

function buildStaffDetailsSection() {
    const section = document.createElement('section');
    section.classList.add('staff-details-section'); // Add a class for styling
    section.innerHTML = `
        <h2>Staff Details</h2>
        <form id="staff-form">
            <div class="form-group">
                <label for="staff-name">Staff Name:</label>
                <input type="text" id="staff-name" name="staff-name">
            </div>
            <div class="form-group">
                <label for="designation">Designation:</label>
                <input type="text" id="designation" name="designation">
            </div>
            <div class="form-group">
                <label for="contact">Contact:</label>
                <input type="text" id="contact" name="contact">
            </div>
            <button type="submit">Submit</button>
        </form>
    `;

    const staffForm = section.querySelector('#staff-form');
    staffForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get form input values
        const staffName = document.getElementById('staff-name').value;
        const designation = document.getElementById('designation').value;
        const contact = document.getElementById('contact').value;
        
        // Log form input values (you can perform further actions here)
        console.log('Staff Name:', staffName);
        console.log('Designation:', designation);
        console.log('Contact:', contact);
        SubmitStaff(staffName, designation, contact);
        
        // Optionally, you can clear the form fields after submission
        // staffForm.reset();
    });

    return section;
}

// Apply custom CSS styles
const style1 = document.createElement('style');
style1.textContent = `
    .staff-details-section {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .staff-details-section h2 {
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }
    #staff-form {
        display: flex;
        flex-direction: column;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .form-group label {
        font-weight: bold;
    }
    .form-group input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
    button[type="submit"] {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #008CBA;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button[type="submit"]:hover {
        background-color: #005f7e;
    }
`;
document.head.appendChild(style1);

