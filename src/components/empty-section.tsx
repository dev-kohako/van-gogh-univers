"use client";

import { Palette, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptySectionProps {
  title?: string;
  description?: string;
  onClear?: () => void;
  buttonText?: string;
  icon?: React.ReactNode;
}

export function EmptySection({
  title = "Nenhuma Pintura Encontrada",
  description = "Parece que não há obras que correspondam à sua busca.\nTente ajustar os filtros ou limpar a pesquisa.",
  onClear,
  buttonText = "",
  icon = <Palette aria-hidden="true" className="h-16 w-16" />,
}: EmptySectionProps) {
  return (
    <Empty className="h-full py-20 text-center from-muted/50 to-background pt-10 md:pt-20">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle id="empty-section-title">{title}</EmptyTitle>
        <EmptyDescription className="whitespace-pre-line">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {onClear && (
        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            aria-label={buttonText}
          >
            <RefreshCcw aria-hidden="true" className="mb-1 h-4 w-4" />
            {buttonText}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}