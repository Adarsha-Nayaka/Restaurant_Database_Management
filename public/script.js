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
    section.innerHTML = `
        <h2>Order Management</h2>
        <h3>Menu</h3>
        <div id="menu-items">
            <form id="order-form">
            <p>
                <label for="customer-name">Customer Name:</label>
                <input type="text" id="customername" name="customername">
            </p>
            <p>
                <label for="phone">Customer Phone No:</label>
                <input type="text" id="phone_no" name="phone_no">
            </p>
            <div class="menu-item">
                

                    <h4>Pizza</h4>
                    <p id="pprice" value=12.99>$12.99</p>
                    <input type="text" id="pizzaInput" name="pizzaInput">
            </div>
            <div class="menu-item">
                <h4>Burger</h4>
                <p id="bprice" value=12.99>$12.99</p>
                <input type="text" id="burgerInput" name="burgerInput">
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
        const pizzaValue = document.getElementById('pizzaInput').value;
        const burgerValue = document.getElementById('burgerInput').value;
        const pprice = 12.99;
        const bprice = 12.99;
        const customername=document.getElementById('customername').value;
        const phone_no=document.getElementById('phone_no').value;

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


// function generateCustomerId() {
//     const prefix = "CUST";
//     const timestamp = Date.now(); // Get the current timestamp
//     const uniqueId = Math.floor(Math.random() * 10000); // Generate a random number
    
//     // Combine the prefix, timestamp, and unique ID
//     const customerId = `${prefix}-${timestamp}-${uniqueId}`;
    
//     return customerId;
// }



const Submit2 = async (newItem, newValue) => {
    try{
      const response = await fetch(`http://localhost:3000/submit2?newItem=${newItem}&newValue=${newValue}`, {cache: 'no-cache'});
      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    }catch(error){
      console.log(error);
    }
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
            <tbody id="inventory-table-body">
                <tr>
                    <td>Tomatoes</td>
                    <td><span id="tomatoes-stock">15</span></td>
                    <td><button class="edit-stock">Edit</button></td>
                </tr>
                <tr>
                    <td>Bananas</td>
                    <td><span id="banana-stock">15</span></td>
                    <td><button class="edit-stock">Edit</button></td>
                </tr>
            </tbody>
        </table>
    `;

    const addNewItemButton = section.querySelector('#add-new-item');
    addNewItemButton.addEventListener('click', function() {
        // Prompt the user to enter the new item name
        const newItemName = prompt('Enter the name of the new item:');
        if (newItemName !== null) {
            // Prompt the user to enter the initial stock quantity
            const initialStock = prompt('Enter the initial stock quantity:');
            if (initialStock !== null) {
                // Create a new row for the new item
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${newItemName}</td>
                    <td><span>${initialStock}</span></td>
                    <td><button class="edit-stock">Edit</button></td>
                `;
                Submit2(newItemName, initialStock);

                // Append the new row to the table body
                const tableBody = section.querySelector('#inventory-table-body');
                tableBody.appendChild(newRow);

                // Attach event listener to the new "Edit" button
                const editButton = newRow.querySelector('.edit-stock');
                editButton.addEventListener('click', function() {
                    // Get the current stock quantity
                    const stockElement = newRow.querySelector('span');
                    const currentStock = parseInt(stockElement.textContent);

                    // Prompt the user to enter the new stock quantity
                    const newStock = prompt('Enter the new stock quantity:');
                    if (newStock !== null) {
                        // Update the stock quantity in the UI
                        stockElement.textContent = newStock;

                        // Call the submit function
                        Submit2(newItemName, newStock);
                    }
                });
            }
        }
    });

    return section;
}

const Submit = async (customerName,date,time,guests,phone) => {
    try{
      const response = await fetch(`http://localhost:3000/submit3?customerName=${customerName}&date=${date}&time=${time}&guests=${guests}&phone=${phone}`, {cache: 'no-cache'});
      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    }catch(error){
      console.log(error);
    }
}

function buildTableReservationsSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2 style="text-align:center;">Table Reservations</h2>
        <form id="reservation-form">
            <p>
                <label for="customer-name">Customer Name:</label>
                <input type="text" id="customer-name" name="customer-name">
            </p>
            <p>
                <label for="date">Date:</label>
                <input type="date" id="date" name="date">
            </p>
            <p>
                <label for="time">Time:</label>
                <input type="time" id="time" name="time">
            </p>
            <p>
                <label for="guests">Number of Guests:</label>
                <input type="number" id="guests" name="guests">
            </p>
            <p>
                <label for="phone">Customer Phone No:</label>
                <input type="text" id="phone" name="phone">
            </p>
            <button type="submit">Make Reservation</button>
        </form>
        <div id="reservation-calendar"></div>
    `;
    
    const reservationForm = section.querySelector('#reservation-form');
    reservationForm.addEventListener('submit', function(event) {
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
        Submit(customerName,date,time,guests,phone);
        
        // Optionally, you can clear the form fields after submission
        // reservationForm.reset();
    });

    return section;
}
