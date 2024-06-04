import Image from "next/image";
import Header from "./Component/Header";
import TopCards from "./Component/TopCards";
import BarChart from "./Component/BarChart";
import RecentOrder from "./Component/RecentOrder";

export default function Home() {
  return (
    <section className="ml-20">
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrder />
        </div>
      </div>
    </section>

  );
}
