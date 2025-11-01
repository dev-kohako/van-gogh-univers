import { useMemo, useState, useEffect, useRef } from "react";
import { SortBy, SortOrder, UsePaintingsProps } from "@/types/paiting.type";

export function usePaintings({
  paintings,
  initialItemsPerPage = 6,
}: UsePaintingsProps) {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const filteredAndSortedPaintings = useMemo(() => {
    const filtered = paintings.filter((painting) =>
      painting.namePainting.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison =
          new Date(a.datePainting).getTime() -
          new Date(b.datePainting).getTime();
      } else {
        comparison = a.namePainting.localeCompare(b.namePainting);
      }
      return order === "asc" ? comparison : -comparison;
    });
  }, [paintings, searchTerm, order, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedPaintings.length / itemsPerPage
  );
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedPaintings.slice(start, end);
  }, [filteredAndSortedPaintings, currentPage, itemsPerPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (id: string) => {
    if (window.matchMedia("(hover: none)").matches) {
      setActiveId(activeId === id ? null : id);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, order, itemsPerPage]);

  return {
    currentItems,
    pagination: {
      currentPage,
      setCurrentPage,
      totalPages,
      itemsPerPage,
      setItemsPerPage,
    },
    filter: {
      searchTerm,
      setSearchTerm,
    },
    sort: {
      order,
      setOrder,
      sortBy,
      setSortBy,
    },
    ui: {
      activeId,
      handleItemClick,
      containerRef,
    },
  };
}
