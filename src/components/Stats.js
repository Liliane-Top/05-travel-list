export default function Stats({ items }) {
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
