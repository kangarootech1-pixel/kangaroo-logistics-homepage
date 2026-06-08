import {
  ArrowLeftRight,
  Building2,
  Globe,
  Lightbulb,
  Settings2,
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
  "cross-border": Globe,
  "customized-logistics": Settings2,
  projects: Building2,
};
