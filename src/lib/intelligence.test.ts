import { describe,expect,it } from "vitest"; import { reorderQuantity,riskLevel } from "./intelligence";
describe("inventory intelligence",()=>{it("never recommends negative stock",()=>expect(reorderQuantity(10,2,30)).toBe(0));it("calculates reorder needs",()=>expect(reorderQuantity(110,25,42)).toBe(93));it("classifies shortages",()=>expect(riskLevel(20,100)).toBe("Critical"));});
