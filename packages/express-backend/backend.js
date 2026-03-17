import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/* Data... */

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "David", job: "Bouncer" },
    { id: "ppp222", name: "Cassie", job: "Professor" },
    { id: "yat999", name: "Doe", job: "Aspiring actress" },
    { id: "zap555", name: "Ophelia", job: "Bartender" }
  ]
};

/* Helpers... */

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function findUserById(id) {
  return users.users_list.find(user => user.id === id);
}

/* Routes... */

// Get all users...

app.get("/users", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

// Post create user...

app.post("/users", (req, res) => {

  if (!req.body.name || !req.body.job) {
    return res.status(400).send("Missing name or job");
  }

  const newUser = {
    id: generateId(),
    ...req.body
  };

  users.users_list.push(newUser);

  res.status(201).json(newUser);
});

// Delete user...

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const index = users.users_list.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).send("User not found");
  }

  users.users_list.splice(index, 1);

  res.status(204).send();
});

/* Server... */

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
