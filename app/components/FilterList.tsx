import { PlusIcon } from "@heroicons/react/20/solid";
import type { FilterData } from "./Filter";
import Filter from "./Filter";
import { FunnelIcon } from "@heroicons/react/24/outline";

export type FilterListProps = {
  filters: (FilterData & { id: string })[];
  onFilterChange: (filters: FilterData[]) => void;
};
export default function FilterList({
  filters,
  onFilterChange,
}: FilterListProps) {
  const onChange = (id: string) => (data: FilterData) => {
    onFilterChange(filters.map((filter) => (filter.id === id ? data : filter)));
  };

  return (
    <ul className="flex h-full flex-col gap-y-2">
      {filters.map((filter) => (
        <Filter
          key={filter.id}
          data={filter}
          onDataChange={onChange(filter.id)}
        />
      ))}
      {filters.length === 0 && (
        <div className="mt-16">
          <EmptyState />
        </div>
      )}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="text-center">
      <FunnelIcon
        className="mx-auto h-12 w-12 text-gray-400"
        aria-hidden="true"
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No filters</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by adding your first filter.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Filter
        </button>
      </div>
    </div>
  );
}
