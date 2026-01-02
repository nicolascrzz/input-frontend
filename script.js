let adminAutenticado = false;

const campo1 = document.getElementById("campo1");
const campo2 = document.getElementById("campo2");
const campo3 = document.getElementById("campo3");
const campo4 = document.getElementById("campo4");
const status = document.getElementById("status");
const status1 = document.getElementById("status-1")
const btnSalvar = document.getElementById("btn-salvar");
const btnAdmin = document.getElementById("btn-admin");
const modalAdmin = document.getElementById("modal-admin");
const closeAdmin = document.querySelector(".close-admin");
const modalData = document.getElementById("modal");
const abrirModalData = document.getElementById("abriModalData");
const fecharModalData = document.getElementById("btn-cancelar");
const input = document.getElementById("console-input");
const output = document.getElementById("console-output");

//LOCAL
const API_URL = "https://input-backend-1.onrender.com";

async function salvar() {

    status.style.opacity = 1;
    status.style.transition = "";

    if (!campo1.value || !campo2.value || !campo4.value) {
        status.innerText = "Preencha os campos obrigatórios!!";
        status.style.color = "red";
        return;
    }

    status.innerText = "";

    btnSalvar.classList.add("loading");

    await fetch(`${API_URL}/salvar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            valor: campo1.value,
            tipo: campo2.value,
            observacao: campo3.value,
            data: campo4.value
        })
    });

    btnSalvar.classList.remove("loading");

    campo1.value = "";
    campo2.value = "";
    campo3.value = "";
    campo4.value = "";

    status.innerText = "Salvo ✅";
    status.style.color = "#4edaa6ff";

    setTimeout(() => {
        status.style.transition = "opacity 0.8s";
        status.style.opacity = 0;
    }, 2500);

    setTimeout(() => {
       status.innerText = "";
       status.style.transition = ""; 
    }, 3300);
}

//Enter

campo4.addEventListener("keydown", e => {
    if (e.key === "Enter") salvar();
});

abrirModalData.onclick = () => {
    modalData.style.display = "flex"
}

fecharModalData.onclick = () => {
    modalData.style.display = "none"
}

btnAdmin.onclick = () => {
    modalAdmin.style.display = "flex";
}

closeAdmin.onclick = () => {
    modalAdmin.style.display = "none";
}

window.addEventListener("click", (event) => {
    if (event.target === modalAdmin) {
       modalAdmin.style.display = "none";
    }
});

window.addEventListener("click", (event) => {
    if (event.target === modalData) {
       modalData.style.display = "none";
    }
});


function exportarExcel() {
    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    if (!inicio || !fim) {
        alert("Selecione as duas datas");
        return;
    }

    const confirmar = confirm("Deseja realmente exportar o relátório Excel?");

    if (confirmar) {
        window.open(`${API_URL}/exportar-excel`, "_blank");
    };
}

async function confirmarAdmin() {
    
    const senha = document.getElementById("admin-password").value;

    const resposta = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha })
    });

    const data = await resposta.json();

    if (data.ok) {
        adminAutenticado = true;

        abrirConsole();

        status1.innerText = "Administrador Autorizado ⚙️";
        status1.style.color = "#5a5a5aff";

        setTimeout(() => {
            status1.style.transition = "opacity 0.8s";
            status1.style.opacity = 0;
        }, 2500);

        setTimeout(() => {
            status1.innerText = "";
            status1.style.transition = ""; 
        }, 3300);

    } else {
        status1.innerText = "Senha incorreta ❌";
        status1.style.color = "#d63636ff";
    }


function abrirConsole() {
    document.getElementById("console-login").classList.add("hidden");
    document.getElementById("console-terminal").classList.remove("hidden");
}

async function enviarComando() {

    const comando = input.value.trim();
    if (!comando) return;

    output.innerHTML += `> ${comando}<br>`;

    const res = await fetch(`${API_URL}/admin/comando`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comando })
    });

    const data = await res.json();

    output.innerHTML += `${data.resposta}<br><br>`;
    output.scrollTop = output.scrollHeight;

    input.value = "";
}

input.addEventListener("keydown", e => {
    if (e.key === "Enter") enviarComando();
});
}

fetch("https://input-backend-1.onrender.com/admin/limpar-registros", {
    method: "POST",
    headers: {
        "x-admin-password": "740500"
    }
})
.then(res => res.json())
.then(data => alert(data.mensagem));