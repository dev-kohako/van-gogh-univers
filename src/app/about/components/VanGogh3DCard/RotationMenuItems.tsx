"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { RotationMenuItemsProps } from "@/types/about.type";
import { Ellipsis } from "lucide-react";
import { memo, useCallback, useId } from "react";

export const RotationMenuItems = memo(function RotationMenuItems({
  autoRotate,
  setAutoRotate,
  velocity,
  setVelocity,
}: RotationMenuItemsProps) {
  const sliderId = useId();

  const handleVelocityChange = useCallback(
    (value: number[]) => {
      setVelocity(Number(value[0].toFixed(2)));
    },
    [setVelocity]
  );

  const handleToggleRotate = useCallback(
    (checked: boolean) => setAutoRotate(checked),
    [setAutoRotate]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Abrir menu de rotação"
        >
          <Ellipsis aria-hidden="true" className="text-zinc-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-background min-w-[220px]"
        align="end"
        aria-label="Opções de rotação"
      >
        <DropdownMenuLabel asChild>
          <h3 className="text-sm font-semibold">Opções de Rotação</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={autoRotate}
          onSelect={(e) => e.preventDefault()}
          onCheckedChange={handleToggleRotate}
          className="hover:cursor-pointer"
          aria-checked={autoRotate}
          role="menuitemcheckbox"
        >
          Rotação Automática
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          onSelect={(e) => e.preventDefault()}
          className="flex flex-col items-start pb-4 focus:bg-accent/20"
        >
          <div className="w-full">
            <label
              htmlFor={sliderId}
              className="text-sm font-medium mb-2 block text-foreground"
            >
              Velocidade da rotação ({velocity.toFixed(1)})
            </label>

            <Slider
              id={sliderId}
              value={[velocity]}
              onValueChange={handleVelocityChange}
              min={-2}
              max={2}
              step={0.1}
              aria-label="Controle de velocidade da rotação"
              aria-valuemin={-2}
              aria-valuemax={2}
              aria-valuenow={velocity}
              className="w-full"
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
