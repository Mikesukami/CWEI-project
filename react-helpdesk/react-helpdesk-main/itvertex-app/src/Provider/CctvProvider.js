import { API_POST } from "../api";

export const CctvProvider = {
    createCctv: async (ipcAddress, ipcName, ipcStatus) => {
        let json = await API_POST("cctv/create", {
            ipc_address: ipcAddress,
            ipc_name: ipcName,
            ipc_status: ipcStatus
        });

        return json;
    }
}