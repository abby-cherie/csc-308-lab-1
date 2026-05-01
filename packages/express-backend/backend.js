import express from "express";
import cors from "cors";

//  import your service layer
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/* Routes... */

// Get all users (same endpoint)
app.get("/users", async (req, res) => {
  try {
    const result = await userServices.getUsers();
    res.json({ users_list: result }); // 👈 SAME format as before
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});


// GET user by ID (same endpoint)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await userServices.findUserById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid ID");
  }
});


// POST create user (same behavior)
app.post("/users", async (req, res) => {
  if (!req.body.name || !req.body.job) {
    return res.status(400).send("Missing name or job");
  }

  try {
    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});


// DELETE user (same endpoint)
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await userServices.deleteUser(req.params.id);

    if (!deleted) {
      return res.status(404).send("User not found");
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Delete failed");
  }
});

app.get("/", (req, res) => {
  res.send("API is running... ");
});

/* Server... */

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

