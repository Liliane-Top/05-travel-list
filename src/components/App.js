import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
