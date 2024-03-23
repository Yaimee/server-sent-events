const serverSentStatusDiv = document.getElementById("server-sent_status");
const serverSentTimeDiv = document.getElementById("server-sent_stocks");

const eventSource = new EventSource("/stocks");

eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    serverSentTimeDiv.innerHTML = `symbol: ${data.symbol}<br><br> price: ${data.price} DKK`;
    console.log(event.data)
});

eventSource.addEventListener("open", (event) => {
    serverSentStatusDiv.textContent = "Connected";
});

eventSource.addEventListener("error", (event) => {
    if (event.target.readyState === EventSource.CLOSED) {
        serverSentStatusDiv.textContent = 'Connection was closed';
    } else if (event.target.readyState === EventSource.CONNECTING) {
        serverSentStatusDiv.textContent = 'Connecting...';
    } else {
        serverSentStatusDiv.textContent = 'Error';
    }
});