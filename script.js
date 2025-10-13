const headerTitle = document.getElementById("headerTitle");
const buttons = document.querySelectorAll("#drawer .navBtn");
const displayContent = document.getElementById("displayContent");

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
