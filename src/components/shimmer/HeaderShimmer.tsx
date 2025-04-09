import "./shimmer.css";
const HeaderShimmer: React.FC = () => {
  return (
    <div className="crypto-loader">
      <div className="coin-wrapper">
        <div className="coin3D"></div>
        <div className="ring"></div>
      </div>
      <h3 className="crypto-text">Loading crypto magic...</h3>
    </div>
  );
};

export default HeaderShimmer;
