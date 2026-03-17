import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

  const [characters, setCharacters] = useState([]);

  /* API calls... */

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  /* Loads data... */
  
  useEffect(() => {
    console.log("Fetching users...");
  
    fetch("http://localhost:8000/users")
      .then(res => {
        console.log("Response:", res);
        return res.json();
      })
      .then(data => {
        console.log("DATA:", data);
        setCharacters(data.users_list);
      })
      .catch(err => console.log("ERROR:", err));
  }, []);

  /* Adding user... */

  function updateList(person) {
    postUser(person)
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then(newUser => {
        setCharacters([...characters, newUser]);
      })
      .catch(err => console.log(err));
  }

  /* Delete user... */

  function removeOneCharacter(index) {
    const user = characters[index];

    deleteUser(user.id)
      .then(res => {
        if (res.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container">

      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />

      <Form handleSubmit={updateList} />

    </div>
  );
}

export default MyApp;