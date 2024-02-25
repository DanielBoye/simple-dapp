

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
const MoodContractAddress = "0x8c5394748A661AE79aa10876C44C2859a87c0D23";
const MoodContractABI = [{
        "inputs": [],
        "name": "getMood",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_mood",
            "type": "string"
        }],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

let MoodContract = undefined;
let signer = undefined;

console.log(type(MoodContractAddress))

async function getMood() {
    try {
        const mood = await MoodContract.getMood();
        document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    } catch (error) {
        console.error("Failed to get mood:", error);
    }
}
async function setMood() {
  try {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
  } catch (error) {
    console.error("Failed to set mood:", error);
  }
}
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
            );
        });
});