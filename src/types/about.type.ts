export type InfoObject = Record<string, string | string[]>;

export interface InfoGridProps {
  data: InfoObject;
}

export interface RotationMenuItemsProps {
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  velocity: number;
  setVelocity: React.Dispatch<React.SetStateAction<number>>;
}