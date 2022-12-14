const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.post('/sign-up', async (req, res) => {
	console.log(req.body);

	res.json({
		name: 'mock',
		email: 'mock@test.com',
		id: 2,
	});
});

app.post('/login', async (req, res) => {
	console.log(req.body);

	res.json({
		name: 'test',
		email: 'test@mock.com',
		id: 1,
	});
});

app.get('/users/:userId/todos', (req, res) => {
	res.json([{
		title: 'Make frontend',
		is_complete: true,
		id: 1,
	}, {
		title: 'Make mock backend',
		is_complete: false,
		id: 2,
	}]);
});

app.post('/users/:userId/todos', (req, res) => {
	res.json({
		...req.body,
		is_complete: false,
		id: 11,
	});
});

app.delete('/todos/:todoId', (req, res) => {
	res.status(204).end();
});

app.put('/todos/:todoId', (req, res) => {
	res.json({ ...req.body, id: req.params.todoId });
});

app.get('/users/:userId/settings', (req, res) => {
	res.json({
		id: 1,
		background: req.query.background,
	});
});

app.listen(4000, () => {
	console.log('http://localhost:4000');
});
