const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.post('/login', async (req, res) => {
	console.log(req.body);

	res.json({
		name: 'test',
		email: 'test@mock.com',
		id: 1,
	});
});


app.listen(4000, () => {
	console.log('http://localhost:4000');
});
