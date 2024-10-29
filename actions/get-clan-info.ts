/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import axios from "axios";


export const getClanInfo = async () => {

    let playersData = "";

    const clanTag = '%23292rgory0';
    const apiUrl = `https://api.clashofclans.com/v1/clans/${clanTag}`;
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZiNWIzNmQ2LWI4ZTctNDUxMS04ZTQ0LTkzMThmZTEwMzJiZiIsImlhdCI6MTczMDIxODczNywic3ViIjoiZGV2ZWxvcGVyLzIyN2NjMzMxLTI4NjgtOTcwYi1kOWQ4LWUyODQ2M2M4MzUyNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4OS4yNi40Mi4xNTIiXSwidHlwZSI6ImNsaWVudCJ9XX0.M8LQ6Q6b0s8GiNsx9_A4jokIkwEUuP_CdbwIBPphS2jdoYDWY4UrJrpcP0nj_95RzDG9ib_GnBB_f7t9-PG9kg"

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