let participants =
    JSON.parse(localStorage.getItem("participants")) || [];

let editIndex = -1;


function showDate() {

    const today = new Date();

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    document.getElementById("currentDate")
        .textContent = today.toLocaleDateString(
            "en-IN",
            options
        );
}



function saveData() {

    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );
}



function openModal() {

    editIndex = -1;

    document.getElementById("modalTitle")
        .textContent = "Add Participant";

    document.querySelector(".save-btn")
        .textContent = "Add Participant";

    document.getElementById("name").value = "";
    document.getElementById("participantId").value = "";

    document.getElementById("modal")
        .classList.add("show");
}


function closeModal() {

    document.getElementById("modal")
        .classList.remove("show");
}



function saveParticipant() {

    const nameInput =
        document.getElementById("name");

    const idInput =
        document.getElementById("participantId");

    const name =
        nameInput.value.trim();

    const id =
        idInput.value.trim();


    // Validation

    if (name === "" || id === "") {

        showToast(
            "Please enter Name and Participant ID",
            "!"
        );

        return;
    }


    // EDIT

    if (editIndex !== -1) {

        const duplicate =
            participants.some(
                (p, index) =>
                    p.id.toLowerCase() === id.toLowerCase()
                    && index !== editIndex
            );

        if (duplicate) {

            showToast(
                "Participant ID already exists",
                "!"
            );

            return;
        }


        participants[editIndex].name = name;
        participants[editIndex].id = id;

        saveData();

        displayParticipants();

        updateSummary();

        closeModal();

        showToast(
            "Participant updated successfully",
            "✓"
        );

        return;
    }


    // ADD

    const exists =
        participants.some(
            participant =>
                participant.id.toLowerCase()
                === id.toLowerCase()
        );


    if (exists) {

        showToast(
            "Participant ID already exists",
            "!"
        );

        return;
    }


    const participant = {

        id: id,

        name: name,

        status: "Not Marked"

    };


    participants.push(participant);

    saveData();

    displayParticipants();

    updateSummary();

    closeModal();

    showToast(
        "Participant added successfully",
        "✓"
    );
}

function markPresent(index) {

    participants[index].status =
        "Present";

    saveData();

    displayParticipants();

    updateSummary();

    showToast(
        participants[index].name +
        " marked Present",
        "✓"
    );
}



function markAbsent(index) {

    participants[index].status =
        "Absent";

    saveData();

    displayParticipants();

    updateSummary();

    showToast(
        participants[index].name +
        " marked Absent",
        "✓"
    );
}



function editParticipant(index) {

    editIndex = index;

    document.getElementById("modalTitle")
        .textContent = "Edit Participant";

    document.querySelector(".save-btn")
        .textContent = "Save Changes";


    document.getElementById("name").value =
        participants[index].name;

    document.getElementById("participantId").value =
        participants[index].id;


    document.getElementById("modal")
        .classList.add("show");
}



function deleteParticipant(index) {

    const name =
        participants[index].name;


    const confirmDelete =
        confirm(
            `Delete participant "${name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    participants.splice(index, 1);

    saveData();

    displayParticipants();

    updateSummary();

    showToast(
        "Participant deleted",
        "✓"
    );
}



function displayParticipants() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    const filter =
        document.getElementById(
            "filter"
        ).value;


    table.innerHTML = "";


    const filtered =
        participants.filter(
            participant => {

                const matchesSearch =
                    participant.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    participant.id
                        .toLowerCase()
                        .includes(search);


                const matchesFilter =
                    filter === "All"
                    ||
                    participant.status === filter;


                return (
                    matchesSearch
                    &&
                    matchesFilter
                );
            }
        );


    // EMPTY STATE

    if (filtered.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="4">

                    <div class="empty">

                        <div class="empty-icon">
                            👥
                        </div>

                        <h3>
                            No participants found
                        </h3>

                        <p>
                            Add a participant to
                            start tracking attendance.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // TABLE ROWS

    filtered.forEach(
        participant => {

            const originalIndex =
                participants.indexOf(
                    participant
                );


            let statusClass =
                "not-marked";


            if (
                participant.status === "Present"
            ) {

                statusClass =
                    "present-status";

            }
            else if (
                participant.status === "Absent"
            ) {

                statusClass =
                    "absent-status";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${participant.id}
                    </strong>
                </td>

                <td>
                    ${participant.name}
                </td>

                <td>

                    <span
                        class="status ${statusClass}"
                    >
                        ${participant.status}
                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="present-btn"
                            onclick="markPresent(${originalIndex})"
                            title="Mark Present"
                        >
                            ✓ Present
                        </button>

                        <button
                            class="absent-btn"
                            onclick="markAbsent(${originalIndex})"
                            title="Mark Absent"
                        >
                            ✕ Absent
                        </button>

                        <button
                            class="edit-btn"
                            onclick="editParticipant(${originalIndex})"
                            title="Edit"
                        >
                            ✎
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteParticipant(${originalIndex})"
                            title="Delete"
                        >
                            🗑
                        </button>

                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );
}



function updateSummary() {

    const total =
        participants.length;


    const present =
        participants.filter(
            p => p.status === "Present"
        ).length;


    const absent =
        participants.filter(
            p => p.status === "Absent"
        ).length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (present / total) * 100
            );

    }


    document.getElementById("total")
        .textContent = total;


    document.getElementById("present")
        .textContent = present;


    document.getElementById("absent")
        .textContent = absent;


    document.getElementById("percentage")
        .textContent = percentage + "%";
}



function showToast(message, icon) {

    const toast =
        document.getElementById("toast");

    document.getElementById("toastMessage")
        .textContent = message;

    document.getElementById("toastIcon")
        .textContent = icon;


    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove("show");

        },
        2500
    );
}




document.getElementById("modal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeModal();

            }

        }
    );



showDate();

displayParticipants();

updateSummary();