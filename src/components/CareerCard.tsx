import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CareerCardProps {
  id: string;
  name: string;
  description: string;
  minScore: number | null;
  campus: string;
  area: string;
}

const CareerCard = ({ id, name, description, minScore, campus, area }: CareerCardProps) => {
  return (
    <Card className="hover:shadow-usm-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border-primary/20">{area}</Badge>
          {minScore && (
            <div className="flex items-center gap-1 text-sm font-semibold text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>{minScore} pts</span>
            </div>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-0">
        <CardDescription className="mb-4 line-clamp-3 text-sm flex-1">{description}</CardDescription>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{campus}</span>
          </div>
          <Link to={`/carreras/${id}`} className="block">
            <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerCard;
