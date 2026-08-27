export type Risk = "Low" | "Medium" | "High" | "Critical";
export type ProductRisk = { product:string; sku:string; store:string; stock:number; demand:number; hours:number; risk:Risk; reorder:number };
export type DemandPoint = { label:string; actual:number|null; forecast:number|null };
export type DashboardData = { updatedAt:string; kpis:{ label:string; value:string; delta:string; tone:string }[]; demand:DemandPoint[]; risks:ProductRisk[]; insights:string[]; stores:{name:string;orders:number;health:number;risk:Risk}[]; alerts:{title:string;detail:string;severity:Risk;time:string}[] };
