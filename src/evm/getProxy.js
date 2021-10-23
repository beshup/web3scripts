import parseArgs from "minimist";
import buildOptions from "minimist-options";
import { getProvider } from "./utils/provider.js";
import { throwFlagMissing } from "./utils/throw.js";

const options = buildOptions({
    chain: {
        type: "string",
        alias: "c",
        default: "ethereum"
    },
    level: {
        type: "string",
        alias: "l",
        default: "homestead"
    },
    proxy: {
        type: "string",
        alias: "p"
    },
    storagePos: {
        type: "string",
        alias: "s",
        // default storage slot for logic contract adddress, as per EIP-1967
        // https://eips.ethereum.org/EIPS/eip-1967
        // NOTE: other proxy implementation may be being used by proxy contract, do not rely on default unless:
        // 1. You are sure the proxy implements 1967
        // 2. The proxy is not using a beacon contract address (if it is, the result of this is 0x0)
        default: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
    }
})

// --chain --level
// --proxy --storagePos
const args = parseArgs(process.argv.slice(2), options);

const getProxy = async (args) => {
    throwFlagMissing(args, ["proxy", "storagePos"]);
    const proxy = args["proxy"].toString();
    const storagePos = args["storagePos"].toString();

    const provider = getProvider(args["chain"], args["level"]);
    return await provider.getStorageAt(proxy, storagePos);
}

getProxy(args)
    .then((res) => {
        console.log(res);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });