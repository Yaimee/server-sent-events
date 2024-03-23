import express from "express";
const app = express();

app.use(express.static("."));
// streamer stock data
app.get("/stocks", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    const sendStockUpdate = () => {
        const stockData = {
            symbol: "AAPL",
            price: (Math.random() * 100).toFixed(2) 
        };
        res.write(`data: ${JSON.stringify(stockData)}\n\n`);
    };

    // send stock data every 2 seconds
    const intervalId = setInterval(sendStockUpdate, 2000);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
