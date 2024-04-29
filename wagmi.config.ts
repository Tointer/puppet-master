import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { contracts } from './lib/wagmiConfig';

const excludedContracts: string[] = [];

const contractsFormatted = Object.entries(contracts)
.map(
  ([name, contract]) => ({
    name,
    abi: contract.abi,
    address: contract?.address,
  })
).filter(x => !excludedContracts.includes(x.name));


export default defineConfig({
  out: 'src/generated.ts',
  contracts: contractsFormatted,
  plugins: [react()],
});
