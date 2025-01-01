import Logo from "../assets/image/crypto_icon.webp";
const Footer: React.FC = () => {
  return (
    <div className="w-full border border-b mt-6">
      <div className="container-all grid grid-cols-5">
        <div className="col-span-2">
          <img src={Logo} className="w-42 h-12" alt="website-logo" />
          <p className="text-sm text-muted-foreground">
            CoinFecko provides a fundamental analysis of the crypto market. In
            addition to tracking price, volume and market capitalisation,
            CoinFecko tracks community growth, open-source code development,
            major events and on-chain metrics.
          </p>
        </div>
        <div className="">
          <p>Resource</p>
        </div>
        <div className="">
          <p>Support</p>
        </div>
        <div className="">
          <p>About Coin Fecko</p>
        </div>
        <div className="">
          <p>Community</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
