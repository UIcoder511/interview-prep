import { useState } from "react";
import "./App.css";
import { faker } from "@faker-js/faker";

const items = [
  {
    name: faker.person.firstName(),
    img: faker.image.url(),
  },
  {
    name: faker.person.firstName(),
    img: faker.image.url(),
  },
  {
    name: faker.person.firstName(),
    img: faker.image.url(),
  },
  {
    name: faker.person.firstName(),
    img: faker.image.url(),
  },
];

interface UserObType {
  name: string;
  img: string;
}

function App() {
  const [searchItems, setSearchItems] = useState<UserObType[]>([]);
  const [searchResults, setSearchResults] = useState<UserObType[]>(items);

  // const handleChange = (e: React.ChangeEvent) => {
  //   const { value } = e.target as HTMLInputElement;
  //   setSearchInputText(value);
  // };

  return (
    <div id="App">
      <AutoCorrectWithSerach
        data={searchResults}
        values={searchItems}
        setValues={setSearchItems}
      />
    </div>
  );
}

const AutoCorrectWithSerach = ({
  values,
  setValues,
  data,
}: {
  values: UserObType[];
  setValues: React.Dispatch<React.SetStateAction<UserObType[]>>;
  data: UserObType[];
}) => {
  const [searchInputText, setSearchInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchInputText(value);
  };

  const removeItem = (item: UserObType) => {
    setValues(values.filter((v) => v.name !== item.name));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          // gap: "5px",
          width: "100%",
          height: "40px",
          border: "2px solid #aaa",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "100%",
            // padding: "5px",
            display: "flex",
            gap: "2px",
          }}
        >
          {values.map((item, i) => (
            <ItemChip key={i} item={item} removeItem={() => removeItem(item)} />
          ))}
        </div>
        <input
          type="text"
          value={searchInputText}
          onChange={handleInputChange}
          style={{ height: "100%", width: "auto", flex: 1, border: "none" }}
        />
      </div>

      <div style={{ border: "2px solid #aaa", borderRadius: "5px" }}>
        <ResultItems
          items={data.filter(
            (v) =>
              !values.some((val) => val.name === v.name) &&
              v.name.toLowerCase().includes(searchInputText.toLowerCase())
          )}
          setResultItem={(userob: UserObType) => setValues([...values, userob])}
        />
      </div>
    </div>
  );
};

const ResultItems = ({
  items,
  setResultItem,
}: {
  items: UserObType[];
  setResultItem: (userob: UserObType) => void;
}) => {
  return (
    <div
      style={{
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
      }}
    >
      {items.length !== 0 ? (
        items.map((item, i) => (
          <ResultItem key={i} item={item} setItem={() => setResultItem(item)} />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

const ResultItem = ({
  item,
  setItem,
}: {
  item: UserObType;
  setItem: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      style={{ height: "50px", display: "flex", border: "1px solid #aaa" }}
      onClick={setItem}
    >
      <img
        src={item.img}
        alt={item.name}
        style={{ height: "100%", width: "auto" }}
      />
      <p style={{ fontSize: "1rem" }}>{item.name}</p>
    </div>
  );
};

const ItemChip = ({
  item,
  removeItem,
}: {
  item: UserObType;
  removeItem: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        border: "1px solid #aaa",
        padding: "2px",
        borderRadius: "100px",
        gap: "2px",
        margin: "0px 2px",
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        style={{
          height: "100%",
          width: "auto",
          aspectRatio: 1,
          borderRadius: "50%",
        }}
      />
      <p style={{ fontSize: "0.8rem" }}>{item.name}</p>
      <button
        style={{
          border: "none",
          background: "red",
          borderRadius: "50%",
          padding: "0 5px",
        }}
        onClick={removeItem}
      >
        x
      </button>
    </div>
  );
};

export default App;
