import Filter from "./Filter";

export default function FilterList() {
  return (
    <ul className="flex flex-col gap-y-2">
      <Filter
        data={{ filter: "Test", filterBy: "SUBJECT" }}
        onDataChange={() => {}}
        onDelete={() => {}}
      />
      <Filter
        data={{ filter: "Test", filterBy: "SUBJECT" }}
        onDataChange={() => {}}
        onDelete={() => {}}
      />
      <Filter
        data={{ filter: "Test", filterBy: "SUBJECT" }}
        onDataChange={() => {}}
        onDelete={() => {}}
      />
      <Filter
        data={{ filter: "Test", filterBy: "SUBJECT" }}
        onDataChange={() => {}}
        onDelete={() => {}}
      />
    </ul>
  );
}
