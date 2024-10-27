/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import axios from "axios";


export const getClanInfo = async () => {

    let playersData = "";


    const clanTag = '%23292rgory0';
    const apiUrl = `https://api.clashofclans.com/v1/clans/${clanTag}`;
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNmOGRkZWNjLTQzN2MtNGE2Ni05MTYxLWQ2ZjQxNDc2MmQ3YiIsImlhdCI6MTczMDAzODU3OSwic3ViIjoiZGV2ZWxvcGVyLzIyN2NjMzMxLTI4NjgtOTcwYi1kOWQ4LWUyODQ2M2M4MzUyNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIwMC4xNDYuMTUuMjEwIl0sInR5cGUiOiJjbGllbnQifV19.xdRPYK8aM0x4i5o2hTf9NE7HB7jLT23pppdpDZuPP2akYoGUP9tRkqTMIFlxBPIZ5XsKMXKgTG4OAc0VxMZCqA"

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        playersData = response.data
    } catch (error) {
        console.error(error);
    }



    return playersData;
}