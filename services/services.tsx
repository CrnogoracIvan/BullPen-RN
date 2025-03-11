import {getUnixValues} from "@/utils/utils";

export async function getTokenListService() {
    try {
        const response = await fetch("https://public-api.birdeye.so/defi/tokenlist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "c43153adf35242ae9b4546c3eff40aca",
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


export async function getTokenHistoryPriceService(address: string) {
    try {
       const {todayUnix, sixMonthsAgoUnix} = getUnixValues()
        console.log(todayUnix, sixMonthsAgoUnix)
        const response = await fetch(`https://public-api.birdeye.so/defi/history_price?address=So11111111111111111111111111111111111111112&address_type=token&type=1M&time_from=${sixMonthsAgoUnix}&time_to=${todayUnix}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "c43153adf35242ae9b4546c3eff40aca",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching price history:", error);
        return null;
    }
}
