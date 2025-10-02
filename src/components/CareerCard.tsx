import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CareerCardProps {
  id: string;
  name: string;
  description: string;
  minScore: number;
  campus: string;
  area: string;
}

const CareerCard = ({ id, name, description, minScore, campus, area }: CareerCardProps) => {
  return (
    <Card className="hover:shadow-usm-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-accent text-accent-foreground">{area}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{minScore} pts</span>
          </div>
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">{description}</CardDescription>
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{campus}</span>
        </div>
        <Link to={`/carreras/${id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Ver más detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CareerCard;
