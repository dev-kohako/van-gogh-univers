"use client";

import { Palette, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptySection({
  filter,
}: {
  filter: { setSearchTerm: (term: string) => void };
}) {
  return (
    <>
      <Empty className="from-muted/50 to-background h-full text-center pt-10 md:pt-20 pb-20">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Palette aria-hidden="true" className="w-16 h-16" />
          </EmptyMedia>

          <EmptyTitle id="empty-gallery-title">
            Nenhuma Pintura Encontrada
          </EmptyTitle>

          <EmptyDescription>
            Parece que não há obras que correspondam à sua busca.
            <br />
            Tente ajustar os filtros ou limpar a pesquisa.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            onClick={() => filter.setSearchTerm("")}
            aria-label="Limpar filtros de busca"
          >
            <RefreshCcwIcon aria-hidden="true" className="mb-1 h-4 w-4" />
            Limpar Busca
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
}
