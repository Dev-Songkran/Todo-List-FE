import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/src/Components/Dashboard"));

export default function Home() {
  return <Dashboard />;
}
