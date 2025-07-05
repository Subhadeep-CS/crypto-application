import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinCategoryList } from "../../services/api";
const Categories: React.FC = () => {
  const {
    data: coinCategoryList,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coinCategoryList"],
    queryFn: fetchCoinCategoryList,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes
  });

  const [currentPage, setCuentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  return <div>Categories</div>;
};

export default Categories;
