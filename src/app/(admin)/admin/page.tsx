import { FaCreditCard } from "react-icons/fa";

function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
