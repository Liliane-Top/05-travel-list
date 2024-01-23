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

  function handleClearList() {
    const confirmed = window.confirm(
      "are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    //first take a copy of the original array other it gets changed too
    sortedItems = items
      .slice()
      .sort((x, y) => x.description.localeCompare(y.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      // .sort((x, y) => (x.packed === y.packed ? 0 : x.packed ? 1 : -1));
      .sort((x, y) => Number(x.packed) - Number(y.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
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

function Stats({ items }) {
  //conditional rendering if no items have been added so items.length is falsy as it is 0
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  //iterate over all items in array and add every item to new array which has item.pack === true and get length of this new array
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / items.length) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `🧳 You have ${numItems} items on your list, and you already packed
            ${numPacked} (${percentage} %)`
          : "You are completely set and ready to go!"}
      </em>
    </footer>
  );
}
