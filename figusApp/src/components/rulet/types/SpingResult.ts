import type { PrizeComboData } from './PrizeComboData'; 

export interface SpinResult {
  success: boolean;
  prize: PrizeComboData;    
  index_wheel: number;      
  spins_remaining: number;   
}