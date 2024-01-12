import { API_POST } from "../api";

export const CctvProvider = {
    createCctv: async (ipcAddress, ipcName, ipcStatus) => {
        let json = await API_POST("cctv/create", {
            ipc_address: ipcAddress,
            ipc_name: ipcName,
            ipc_status: ipcStatus
        });

        return json;
    },

    updateCctv: async (pool, ipcId, ipcAddress, ipcName, ipcStatus) => {
        var json = await API_POST("cctv/update",{
            ipcId: ipcId,
            ipcAddress: ipcAddress,
            ipcName: ipcName,
            ipcStatus: ipcStatus
        });
        
        return json;
    }
}