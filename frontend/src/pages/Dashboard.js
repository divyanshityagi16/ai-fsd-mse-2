import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [items,setItems]=useState([]);
  const [name,setName]=useState("");
  const [search,setSearch]=useState("");

  const token = localStorage.getItem("token");

  // GET ITEMS
  const getItems = async () => {
    const res = await axios.get("https://ai-fsd-mse-2.onrender.com/api/items");
    setItems(res.data);
  };

  // ADD ITEM
  const addItem = async () => {
    await axios.post(
      "https://ai-fsd-mse-2.onrender.com/api/items",
      { itemName:name, type:"Lost" },
      { headers:{ Authorization: token } }
    );
    setName("");
    getItems();
  };

  // DELETE
  const deleteItem = async (id) => {
    await axios.delete(`https://ai-fsd-mse-2.onrender.com/api/items/${id}`, {
      headers:{ Authorization: token }
    });
    getItems();
  };

  // SEARCH
  const searchItems = async () => {
    const res = await axios.get(
      `https://ai-fsd-mse-2.onrender.com/api/items/search?name=${search}`
    );
    setItems(res.data);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location="/";
  };

  useEffect(()=>{ getItems(); }, []);

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Item</h3>
      <input value={name} placeholder="Item name" onChange={e=>setName(e.target.value)} />
      <button onClick={addItem}>Add</button>

      <h3>Search</h3>
      <input placeholder="Search item" onChange={e=>setSearch(e.target.value)} />
      <button onClick={searchItems}>Search</button>

      <h3>Items</h3>

      {items.map(i=>(
        <div className="item" key={i._id}>
          {i.itemName}
          <button onClick={()=>deleteItem(i._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}