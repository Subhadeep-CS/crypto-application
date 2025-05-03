import CardShimmer from "./CardShimmer";

const HeaderShimmer: React.FC = () => {
  return (
    <div className="container-all gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex gap-2 flex-col">
          <CardShimmer className="h-16" />
          <CardShimmer className="h-16" />
        </div>
        <CardShimmer className="h-32" />
        <CardShimmer className="h-32" />
      </div>
    </div>
  );
};

export default HeaderShimmer;
