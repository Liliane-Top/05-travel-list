import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: true },
// ];

export default function App() {
  //this state is lifted from Form component to be able to share with PackingList component
  const [items, setItems] = useState([]);
  //the setter function belonging to the state which has been lifted
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    //we iterate over the entire array
    // per item check if id is same as pm-id
    //for this item change the value of packed field to opposite value
    //otherwise the item as is.
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      {/* to give access from the Form prop to access the handleAddItem method */}
      <Form onAddItems={handleAddItem} />
      {/* to give Packinglist access to the array of items to display */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away 🧳 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, id: Date.now(), packed: false };
    // to be able to setItems in parent component
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    // html form is either clicking on button or on enter
    // if you only want with clicking on button the use onClick within button tag
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  // const [packed, setPacked] = useState(false);

  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        // onChange={() => setPacked(!packed)}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
