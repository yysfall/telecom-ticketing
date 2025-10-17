const headerTitle = document.getElementById("headerTitle");
const buttons = document.querySelectorAll("#drawer .navBtn");
const displayContent = document.getElementById("displayContent");
const subjectInput = document.getElementById("subjectInput");


const titles = {
    all: "ALL TICKETS",
    open: "OPEN TICKETS",
    pending: "PENDING TICKETS",
    solved: "SOLVED TICKETS",
    closed: "CLOSED TICKETS",
    telecom: "TELECOM COMPANIES"
};

const companies = [
    "Converge", 
    "DITO", 
    "Globe",
    "PLDC",
    "Smart"
]

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("status");

        if (status) {
            headerTitle.textContent = titles[status] || "Tickets";
            if (status === "telecom") {
                renderCompanies();
            } else {
                displayContent.innerHTML = "";
            }
        } else {
            headerTitle.textContent = button.textContent;
            displayContent.innerHTML = "";
        }
    });
});

function renderCompanies(){
    displayContent.innerHTML = "";

    const list = document.createElement("div");
    list.className = "companyList";

    companies.forEach(company => {
        const item = document.createElement("div");
        item.className = "companyItem";
        
        const name = document.createElement("span");
        name.className = "companyName"
        name.textContent = company;

        const callButton = document.createElement("button");
        callButton.className = "callBtn";
        callButton.textContent = "Call";

        const emailButton = document.createElement("button");
        emailButton.className = "emailBtn";
        emailButton.textContent = "Email";

        item.appendChild(name);
        item.appendChild(callButton);
        item.appendChild(emailButton);

        list.appendChild(item);
    });
    displayContent.appendChild(list);
}

const modal = document.getElementById("ticketModal");
const newTicketBtn = document.getElementById("newTicket");
const cancelBtn = document.getElementById("cancelTicket");
const submitBtn = document.getElementById("submitTicket");
const companySelect = document.getElementById("companySelect");
const messageInput = document.getElementById("messageInput");

let allTickets = [];


companies.forEach(company => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;
    companySelect.appendChild(option);
});


newTicketBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});


cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    resetModal();
});

function resetModal() {
    companySelect.selectedIndex = 0;
    subjectInput.value = "";
    messageInput.value = "";
}


function renderAllTickets() {
    headerTitle.textContent = titles.all;
    displayContent.innerHTML = "";

    if (allTickets.length === 0) {
        displayContent.textContent = "No tickets found.";
        return;
    }


    const headerRow = document.createElement("div");
    headerRow.className = "ticketHeaderRow";
    headerRow.innerHTML = `
        <div class="ticketCol company">Telecom Companies</div>
        <div class="ticketCol subject">Subject</div>
        <div class="ticketCol status">Status</div>
        <div class="ticketCol date">Date</div>
    `;
    displayContent.appendChild(headerRow);

    allTickets.forEach(ticket => {
        const row = document.createElement("div");
        row.className = "ticketRowStyled";

        row.innerHTML = `
            <div class="ticketCol company">
                <span class="toLabel">To: ${ticket.company}</span>
            </div>
            <div class="ticketCol subject">${ticket.subject}</div>
            <div class="ticketCol status">
                <span class="statusBadge ${ticket.status.toLowerCase()}">${ticket.status}</span>
            </div>
            <div class="ticketCol date">${new Date(ticket.createdAt).toLocaleDateString()}</div>
        `;

        displayContent.appendChild(row);
    });
}

const thankYouPopup = document.getElementById("thankYouPopup");
const closeThankYou = document.getElementById("closeThankYou");

submitBtn.addEventListener("click", () => {
    const company = companySelect.value;
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!company || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    allTickets.push({
        company,
        subject,
        message,
        status: "open",
        createdAt: new Date()
    });

    modal.classList.add("hidden");
    resetModal();

    document.querySelector('[status="all"]').click();
    renderAllTickets();

    thankYouPopup.classList.remove("hidden");
});

closeThankYou.addEventListener("click", () => {
    thankYouPopup.classList.add("hidden");
});


