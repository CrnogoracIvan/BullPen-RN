export async function getTokenListService() {
    try {
        const response = await fetch("https://public-api.birdeye.so/defi/tokenlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "c43153adf35242ae9b4546c3eff40aca", // Replace with your actual API key
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching token list:", error);
        return null;
    }
}
