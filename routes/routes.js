const fs = require("fs");

const routes = (req, res) => {

    const { url, method } = req;

    if (url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        fs.readFile('./public/index.html', 'utf8', (err, data) => {
            res.end(data)
        });
    };
}


module.exports = routes;