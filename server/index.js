const app = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const server = app();

server.get('/', (req, res) => {
    res.send('Hello World');
    }
);

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    }
);

