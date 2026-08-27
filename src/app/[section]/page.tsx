import { notFound } from "next/navigation";
import ModulePage from "@/components/module-page";
const sections=["demand","inventory","stores","products","orders","forecasts","recommendations","alerts","analytics","team","settings","usage"];
export function generateStaticParams(){return sections.map(section=>({section}))}
export default async function SectionPage({params,searchParams}:{params:Promise<{section:string}>;searchParams:Promise<{q?:string}>}){const [{section},{q}]=await Promise.all([params,searchParams]);if(!sections.includes(section))notFound();return <ModulePage section={section} initialQuery={q??""}/>}
