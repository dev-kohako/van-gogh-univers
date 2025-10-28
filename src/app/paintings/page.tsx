"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Palette,
} from "lucide-react";

import type { Painting } from "@/types/types";
import { data_painting } from "../../../public/data/data.json";
import { usePaintings } from "./usePantings";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaintingCard } from "./components/PaintingCard";
import { EmptySection } from "@/components/empty-section";

const paintings: Painting[] = (data_painting || [])
  .filter((p) => p.width && p.height && p.imagePainting)
  .map((p) => ({
    ...p,
    imagePainting: `/assets/paintings/${p.imagePainting}`,
    alt: `Obra "${p.namePainting}" (${p.datePainting}) por Van Gogh.`,
  }));

export default function PaintingsPage() {
  const { currentItems, pagination, filter, sort, ui } = usePaintings({
    paintings: paintings,
    initialItemsPerPage: 6,
  });
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-[7.5%] min-[1350px]:!px-0 my-20 md:my-14 w-full max-w-7xl mx-auto"
    >
      <header className="mb-10 md:pl-10 2xl:pl-5 text-center">
        <motion.h1
          id="gallery-title"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl font-bold md:text-7xl tracking-tight"
        >
          Galeria de Pinturas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mt-3 text-lg text-muted-foreground"
        >
          Explore as obras-primas de Van Gogh, contemplando cada traço e
          detalhe.
        </motion.p>
      </header>

      <div className="sr-only" aria-live="polite" role="status">
        {filter.searchTerm
          ? `${currentItems.length} resultados encontrados para "${filter.searchTerm}"`
          : "Galeria de pinturas carregada."}
      </div>

      <motion.section
        aria-label="Filtros de pesquisa"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-5 md:pl-10 2xl:pl-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-1 w-full sm:max-w-xs">
          <Label htmlFor="search">Buscar pintura</Label>
          <Input
            id="search"
            type="search"
            placeholder="Digite o nome da pintura..."
            value={filter.searchTerm}
            onChange={(e) => filter.setSearchTerm(e.target.value)}
            className="pt-2"
          />
        </div>

        <div className="flex flex-row gap-3 sm:gap-6 sm:items-end">
          <div className="flex flex-col gap-1 w-full sm:w-24">
            <Label htmlFor="sortBy">Ordenar por</Label>
            <Select
              value={sort.sortBy}
              onValueChange={(value) =>
                sort.setSortBy(value as "name" | "date")
              }
            >
              <SelectTrigger id="sortBy" className="w-full pb-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name" className="font-josefin pb-1">Nome</SelectItem>
                <SelectItem value="date" className="font-josefin pb-1">Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-34">
            <Label htmlFor="order">Ordem</Label>
            <Select
              value={sort.order}
              onValueChange={(value) => sort.setOrder(value as "asc" | "desc")}
            >
              <SelectTrigger id="order" className="w-full pb-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc" className="font-josefin pb-1">Ascendente</SelectItem>
                <SelectItem value="desc" className="font-josefin pb-1">Descendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.section>

      {currentItems.length > 0 ? (
        <motion.section
          aria-labelledby="gallery-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto md:pl-10 2xl:pl-5"
        >
          <ul
            ref={ui.containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
          >
            {currentItems.map((photo, i) => (
              <li key={photo.id}>
                <PaintingCard
                  photo={photo}
                  isActive={ui.activeId === photo.id}
                  onCardClick={ui.handleItemClick}
                  index={i}
                />
              </li>
            ))}
          </ul>

          <footer className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row w-full">
            <div className="hidden sm:flex items-center gap-2">
              <Label htmlFor="rows-per-page">Itens por página</Label>
              <Select
                value={String(pagination.itemsPerPage)}
                onValueChange={(value) =>
                  pagination.setItemsPerPage(Number(value))
                }
              >
                <SelectTrigger id="rows-per-page" className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[6, 12, 18, 24].map((n) => (
                    <SelectItem key={n} value={`${n}`}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <nav
              aria-label="Paginação de pinturas"
              className="flex items-center gap-2"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => pagination.setCurrentPage(1)}
                disabled={pagination.currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4 mb-0.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => pagination.setCurrentPage((p) => p - 1)}
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mb-0.5" />
              </Button>
              <span className="pt-1.5">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => pagination.setCurrentPage((p) => p + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4 mb-0.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => pagination.setCurrentPage(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronsRight className="h-4 w-4 mb-0.5" />
              </Button>
            </nav>
          </footer>
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          role="region"
          aria-labelledby="empty-gallery-title"
        >
          <EmptySection
            icon={<Palette aria-hidden="true" className="w-16 h-16" />}
            title="Nenhuma Pintura Encontrada"
            description={`Parece que não há obras que correspondam à sua busca.\nTente ajustar os filtros ou limpar a pesquisa`}
            buttonText="Limpar Busca"
            onClear={() => filter.setSearchTerm("")}
          />
        </motion.div>
      )}
    </motion.main>
  );
}
