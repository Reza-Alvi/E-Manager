import { useState, useEffect } from "react";

const UserForm = ({ isEditing, currentUser, onSave, onCancel }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (isEditing && currentUser) {
      setUser(currentUser);
    }
  }, [isEditing, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      age: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={user.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={user.last_name}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={user.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={user.age}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditing ? "Update" : "Add"}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserForm;
