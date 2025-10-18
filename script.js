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
    "PLDT",
    "Smart"
];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("status");
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        if (status) {
            headerTitle.textContent = titles[status] || button.textContent;
            if (status === "telecom") {
                renderCompanies();
            } else if (status === "all") {
                renderTickets("all");
            } else {
                renderTickets(status);
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
        name.className = "companyName";
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

    thankYouPopup.classList.remove("hidden");
});

closeThankYou.addEventListener("click", () => {
    thankYouPopup.classList.add("hidden");
});

function renderTickets(status = "all") {
    headerTitle.textContent = titles[status] || "Tickets";
    displayContent.innerHTML = "";

    const toShow = status === "all"
        ? allTickets
        : allTickets.filter(t => (t.status || "").toLowerCase() === status.toLowerCase());

    if (toShow.length === 0) {
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

    toShow.forEach((ticket, index) => {
        const row = document.createElement("div");
        row.className = "ticketRowStyled";

        const statusBtn = document.createElement("button");
        const currentStatus = (ticket.status || "open").toLowerCase();
        statusBtn.className = `statusBadge ${currentStatus}`;
        statusBtn.textContent = currentStatus.toUpperCase();

        statusBtn.addEventListener("click", () => {
            const statuses = ["open", "pending", "solved", "closed"];
            let currentIndex = statuses.indexOf((ticket.status || "open").toLowerCase());
            if (currentIndex === -1) currentIndex = 0;
            const nextIndex = (currentIndex + 1) % statuses.length;
            ticket.status = statuses[nextIndex];
            statusBtn.textContent = ticket.status.toUpperCase();
            statusBtn.className = `statusBadge ${ticket.status.toLowerCase()}`;
            if (status !== "all") renderTickets(status);
        });

        const companyCol = document.createElement("div");
        companyCol.className = "ticketCol company";
        const spanTo = document.createElement("span");
        spanTo.className = "toLabel";
        spanTo.textContent = `To: ${ticket.company}`;
        companyCol.appendChild(spanTo);

        const subjectCol = document.createElement("div");
        subjectCol.className = "ticketCol subject";
        subjectCol.textContent = ticket.subject;

        const dateCol = document.createElement("div");
        dateCol.className = "ticketCol date";
        const d = ticket.createdAt instanceof Date ? ticket.createdAt : new Date(ticket.createdAt);
        dateCol.textContent = isNaN(d.getTime()) ? "" : d.toLocaleDateString();

        row.appendChild(companyCol);
        row.appendChild(subjectCol);

        const statusCol = document.createElement("div");
        statusCol.className = "ticketCol status";
        statusCol.appendChild(statusBtn);
        row.appendChild(statusCol);

        row.appendChild(dateCol);

        displayContent.appendChild(row);
    });
}

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function () {
  const query = searchBar.value.toLowerCase().trim();

  const ticketRows = document.querySelectorAll(".ticketRowStyled");
  const companyItems = document.querySelectorAll(".companyItem");

  ticketRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });

  companyItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "" : "none";
  });
});
