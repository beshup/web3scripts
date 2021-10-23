import ethers from "ethers"

const chainId = {
    "ethereum": {
        "mainnet": 1,
        "homestead": 1,
        "ropsten": 3,
        "rinkeby": 4,
        "goerli": 5
    },
    "polygon": {
        "mainnet": 137,
        "homestead": 137,
        "mumbai": 80001,
        "testnet": 80001
    }
}

const getProvider = (chain, level) => {
    if (!chain) {
        chain = "ethereum";
    }
    if (!level) {
        level = "homestead";
    }
    if (!chainId[chain]) {
        throw new Error(`chain ${chain} not found`);
    } 
    if (!chainId[chain][level]) {
        throw new Error(`chain ${chain} with level ${level} not found`);
    }
    let network = "http://localhost:8545";
    if (level != "local") {
        network = ethers.providers.getNetwork(chainId[chain][level]);
    }
    return ethers.getDefaultProvider(network);
}

export {
    getProvider,
}