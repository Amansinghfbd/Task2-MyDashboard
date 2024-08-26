import { useState, useEffect, ChangeEvent } from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button"

interface FiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [options, setOptions] = useState({
    endYears: [] as string[],
    topics: [] as string[],
    sectors: [] as string[],
    regions: [] as string[],
    pestles: [] as string[],
    sources: [] as string[],
    countries: [] as string[],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch("/api/filterOptions");
      const result = await response.json();
      if (result.success) {
        setOptions(result.filters);
      }
    };

    fetchOptions();
  }, []);

  const handleFilterChange = (key: string, event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
        <FilterIcon className="mr-2" />
        Filters
      </h2>
      <div className="space-y-4">
        {Object.entries(options).map(([key, values]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 text-white">
              {key}
            </label>
            <select
              value={filters[key] || "all"}
              onChange={(e) => handleFilterChange(key, e)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white bg-opacity-90"
            >
              <option value="all">All</option>
              {values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
        <Button
          onClick={handleApplyFilters}
          className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
