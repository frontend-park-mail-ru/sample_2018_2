const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const filename = req.url === '/' ? './index.html' : `.${req.url}.html`;

  fs.readFile(filename, (err, file) => {
    if (err) {
      res.statusCode = 404;
      res.write('404');
      res.end();
      return;
    }

    res.write(file);
    res.end();
  });
});

server.listen(3000);
