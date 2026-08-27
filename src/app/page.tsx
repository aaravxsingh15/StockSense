import { dashboardData } from "@/lib/intelligence";
import Dashboard from "@/components/dashboard";
export default function Home(){ return <Dashboard initialData={dashboardData()} />; }
