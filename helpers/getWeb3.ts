import Container, { Service } from 'typedi';
import Web3 from 'web3';

@Service()
export class Web3Instance {
	private instance: Web3 | null = null;

	async getWeb3(): Promise<Web3> {
		if (this.instance === null && window.ethereum) {
			try {
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				this.instance = new Web3(Web3.givenProvider || 'http://localhost:8545');
			} catch (error: any) {
				throw new Error(error);
			}
		}
		return this.instance as Web3;
	}
}

export async function getWeb3(): Promise<Web3> {
	return Container.get(Web3Instance).getWeb3();
}

export async function getAccounts(): Promise<string[]> {
	const web3 = await getWeb3();
	return web3.eth.getAccounts();
}

export async function getBalance(address: string): Promise<string> {
	const web3 = await getWeb3();
	return web3.utils.fromWei(await web3.eth.getBalance(address));
}
