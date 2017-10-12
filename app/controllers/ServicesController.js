import request from 'request-promise';
import { API_CATASTRO, API_PROCESSOR, API_SCRAPPER } from "../constants/index";

const API_CATASTRO_STATUS_URL = `${API_CATASTRO}/status`;
const API_PROCESSOR_STATUS_URL = `${API_PROCESSOR}/status`;
const API_SCRAPPER_STATUS_URL = `${API_SCRAPPER}/status`;

const getStatus = (url) => {
    return new Promise(async (resolve) => {
        try {
            await request.get(url, { timeout: 1500 });
            resolve("OK");
        } catch (e) {
            if (
                e.cause.code === 'ESOCKETTIMEDOUT' ||
                    e.cause.code === 'ETIMEDOUT'
            ) {
                resolve("slow");
            } else {
                resolve("error");
            }
        }
    });
};

export const getServicesStatus = (req, res) => {
    Promise.all(
        [
            getStatus(API_CATASTRO_STATUS_URL),
            getStatus(API_SCRAPPER_STATUS_URL),
            getStatus(API_PROCESSOR_STATUS_URL)
        ]
    ).then(([catastro, scrapper, processor]) => {
        res({
            data: {catastro,scrapper,processor}
        }).code(200)
    });
};