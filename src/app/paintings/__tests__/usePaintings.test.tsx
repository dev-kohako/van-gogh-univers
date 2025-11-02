import { renderHook, act } from "@testing-library/react";
import { usePaintings } from "../usePantings";
import { Painting } from "@/types/types";

const mockPaintings = [
  { id: "1", namePainting: "A", datePainting: "1888" },
  { id: "2", namePainting: "B", datePainting: "1889" },
  { id: "3", namePainting: "C", datePainting: "1890" },
] as Painting[];

describe("usePaintings", () => {
  it("initializes with default pagination and filters", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings })
    );

    expect(result.current.pagination.currentPage).toBe(1);
    expect(result.current.pagination.itemsPerPage).toBe(6);
    expect(result.current.filter.searchTerm).toBe("");
    expect(result.current.sort.order).toBe("asc");
    expect(result.current.sort.sortBy).toBe("name");
    expect(result.current.currentItems).toHaveLength(3);
  });

  it("filters paintings by search term", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings })
    );

    act(() => {
      result.current.filter.setSearchTerm("B");
    });

    expect(result.current.currentItems).toEqual(
      expect.arrayContaining([
        { id: "2", namePainting: "B", datePainting: "1889" },
      ])
    );
  });

  it("sorts paintings by date descending", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings })
    );

    act(() => {
      result.current.sort.setSortBy("date");
      result.current.sort.setOrder("desc");
    });

    const items = result.current.currentItems;
    expect(items[0].datePainting).toBe("1890");
    expect(items[2].datePainting).toBe("1888");
  });

  it("paginates paintings correctly", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings, initialItemsPerPage: 2 })
    );

    expect(result.current.pagination.totalPages).toBe(2);

    act(() => {
      result.current.pagination.setCurrentPage(2);
    });

    expect(result.current.currentItems).toHaveLength(1);
  });

  it("resets current page when filters or sorting change", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings, initialItemsPerPage: 1 })
    );

    act(() => {
      result.current.pagination.setCurrentPage(2);
      result.current.filter.setSearchTerm("A");
    });

    expect(result.current.pagination.currentPage).toBe(1);
  });

  it("clears activeId when clicking outside container", () => {
    const { result } = renderHook(() =>
      usePaintings({ paintings: mockPaintings })
    );

    const container = document.createElement("ul");
    result.current.ui.containerRef.current = container;
    document.body.appendChild(container);

    const outside = document.createElement("div");
    document.body.appendChild(outside);

    act(() => {
      result.current.ui.handleItemClick("1");

      const event = new MouseEvent("mousedown", {
        bubbles: true,
      }) as MouseEvent & {
        target: Element;
      };
      Object.defineProperty(event, "target", {
        value: outside,
        enumerable: true,
      });

      document.dispatchEvent(event);
    });

    expect(result.current.ui.activeId).toBeNull();
  });
});
