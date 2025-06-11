import { TooltipProps } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export function ChartTooltip(props: TooltipProps<number, string>) {
  const { active, payload, label } = props;

  if (active && payload?.length) {
    return (
      <Card className="shadow-lg border py-1">
        <CardContent className="p-2">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm font-semibold text-primary">
            ${payload[0].value?.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
}
