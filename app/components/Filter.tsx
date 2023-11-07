import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/20/solid";

const options = [
  ["Name", "SUBJECT"],
  ["Location", "LOCATION"],
];

export type FilterData = {
  filter: string;
  filterBy: string;
};
export type FilterProps = {
  data: FilterData;
  onDataChange: (data: FilterData) => void;
  onDelete?: () => void;
};
export default function Filter({ data, onDataChange, onDelete }: FilterProps) {
  return (
    <div className="flex items-stretch gap-2">
      <Select
        selected={data.filterBy}
        setSelected={(value) => onDataChange({ ...data, filterBy: value })}
        selectedName={options.find((o) => o[1] === data.filterBy)?.[0]}
        label="Filter by"
        labelSrOnly
      >
        {options.map(([name, value]) => (
          <Select.Option key={value} value={value}>
            {name}
          </Select.Option>
        ))}
      </Select>
      <div className="flex items-center">
        <p className="text-sm text-gray-500">contains</p>
      </div>
      <Input
        name="filter"
        placeholder="Filter"
        className="h-full flex-grow"
        value={data.filter}
        onChange={(e) => onDataChange({ ...data, filter: e.target.value })}
      />
      <Button
        className="h-full"
        color="destructive"
        size="lg"
        onClick={onDelete}
      >
        <TrashIcon className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
