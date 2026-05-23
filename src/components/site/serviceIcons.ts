import {
  ArrowLeftRight,
  Lightbulb,
  Ship,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "local-delivery": Truck,
  "fulfillment-storage": Warehouse,
  "jordan-palestine": ArrowLeftRight,
  "freight-clearance": Ship,
  consulting: Lightbulb,
};
