const campo1 = document.getElementById("campo1");
const campo2 = document.getElementById("campo2");
const campo3 = document.getElementById("campo3");
const campo4 = document.getElementById("campo4");
const status = document.getElementById("status");

//LOCAL
const API_URL = "https://input-backend-1.onrender.com";

async function salvar() {
    if (!campo1.value || !campo2.value || !campo4.value) {
        status.innerText = "Preencha os campos obrigatórios!!";
        status.style.color = "red";
        return;
    }

    status.innerText = "Salvando...";
    status.style.color = "#555";

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

    campo1.value = "";
    campo2.value = "";
    campo3.value = "";
    campo4.value = "";

    status.innerText = "Salvo ✅";
    status.style.color = "#1cc88a";
}

//Enter

campo4.addEventListener("keydown", e => {
    if (e.key === "Enter") salvar();
});

document.getElementById("btn-exportar").addEventListener("click", () => {
    const confirmar = confirm("Deseja realmente exportar o relátório Excel?")

    if (confirmar) {
        window.open(`${API_URL}/exportar-excel`, "_blank");
    }
})