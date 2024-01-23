export default function Item({ item, onDeleteItem, onToggleItem }) {
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
