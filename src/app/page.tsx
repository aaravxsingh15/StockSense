import { dashboardData } from "@/lib/intelligence";
import InteractiveDashboard from "@/components/dashboard-interactive";
export default function Home(){ return <InteractiveDashboard initialData={dashboardData()} />; }
