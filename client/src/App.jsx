import { useState, useEffect } from "react";
import "./app.css";
import Table from "./Table";
import UserForm from "./UserForm";
import Dashboard from "./pages/Dashboard";
import ProfileMenu from "./ProfileMenu";
function App() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("all");
  const [age, setAge] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const search = (data) => {
    return data.filter(item => {
      const queryMatch =
        searchField === "name"
          ? item.first_name.toLowerCase().includes(query)
          : searchField === "email"
          ? item.email.toLowerCase().includes(query)
          : false;

      const genderMatch = gender === "all" || item.gender.toLowerCase() === gender;
      const ageMatch = age === "" || item.age.toString() === age;

      return queryMatch && genderMatch && ageMatch;
    });
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleRemove = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSave = (user) => {
    if (isEditing) {
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <Dashboard/>
      <div className="main-content">
        <div className="header">
          <h1>Search Page</h1>
          <ProfileMenu />
        </div>
      <select className="search" onChange={(e) => setGender(e.target.value.toLowerCase())}>
        <option value="all">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <input
        type="text"
        className="search"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <select className="search" onChange={(e) => setSearchField(e.target.value.toLowerCase())}>
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>
      <input
        type="text"
        className="search"
        placeholder={`Search by ${searchField}`}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <Table data={search(users)} onEdit={handleEdit} onRemove={handleRemove} />
      <UserForm
        isEditing={isEditing}
        currentUser={currentUser}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false);
          setCurrentUser(null);
        }}
      />
    </div>
    </div>
  );
}

export default App;