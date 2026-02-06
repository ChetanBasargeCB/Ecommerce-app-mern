import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline } from "react-icons/io5";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 m-10 font-sans">
      {/* 1. Top Contact Bar */}
      <div className="flex flex-col md:flex-row border-b border-gray-100 text-center md:text-left">
        {[
          { icon: <IoLocationOutline />, title: "Visit us", desc: "Hyderabad, India" },
          { icon: <IoCallOutline />, title: "Call us", desc: "+91 7499919135" },
          { icon: <IoTimeOutline />, title: "Working Hours", desc: "Mon - Sat: 10am - 7pm" },
          { icon: <IoMailOutline />, title: "Email us", desc: "Ecart@gmail.com" },
        ].map((item, i) => (
          <div key={i} className={`flex-1 flex items-center justify-center gap-4 py-8 px-6 ${i !== 3 ? "md:border-r border-gray-200" : ""}`}>
            <span className="text-blue-600 text-2xl">{item.icon}</span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-black italic text-blue-600">ShopCart</h1>
          <p className="text-sm text-gray-500 max-w-xs">Premium products delivered to your doorstep.</p>
          
          <div className="flex gap-4 text-gray-400">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-bold mb-6">Quick Links</h3>
          <ul className="text-sm text-gray-500 space-y-3 font-medium">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/deals">Best Sellers</Link></li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="font-bold mb-6">Support</h3>
          <ul className="text-sm text-gray-500 space-y-3 font-medium">
            <li><Link to="#">Track Order</Link></li>
            <li><Link to="#">FAQs</Link></li>
          </ul>
        </div>

        <div className="flex-[1.5]">
          <h3 className="font-bold mb-6">Stay Updated</h3>
          <div className="flex h-11">
            <input type="email" placeholder="Your email" className="bg-gray-50 border border-gray-200 border-r-0 rounded-l-lg px-4 w-full outline-none text-sm" />
            <button className="bg-blue-600 text-white px-8 rounded-r-lg font-bold text-sm">Join</button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright */}
      <div className="border-t border-gray-100 py-6 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 SHOPCART INDIA. MADE BY CHETAN BASARGE  ❤️</p>
          <div className="flex gap-8">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service  @ecart 2026</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}