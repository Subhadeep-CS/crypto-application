import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
const CardShimmer: React.FC<{ className: string }> = ({ className }) => {
  return (
    <Card>
      <CardContent className="py-2">
        <Skeleton className={`w-full rounded-xl ${className}`} />
      </CardContent>
    </Card>
  );
};

export default CardShimmer;
