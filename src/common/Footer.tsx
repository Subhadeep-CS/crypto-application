import Logo from "../assets/image/crypto_icon.webp";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
        {/* Logo & Description */}
        <div className="md:col-span-2 space-y-4">
          <img src={Logo} className="w-42 h-12" alt="CoinFecko Logo" />
          <p className="text-sm">
            CoinFecko provides a fundamental analysis of the crypto market. In
            addition to tracking price, volume, and market capitalization,
            CoinFecko tracks community growth, open-source code development,
            major events, and on-chain metrics.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold mb-2">About CoinFecko</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600 transition">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} CoinFecko. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
