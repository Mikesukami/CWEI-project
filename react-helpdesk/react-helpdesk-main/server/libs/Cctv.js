const mysql = require('mysql');

module.exports = {
    createCctv: async (pool, ipcAddress, ipcName, ipcStatus) => {
        var sql = "INSERT INTO tbl_ipc (ipc_address, ipc_name, ipc_status) " 
                + "VALUES (?,?,?)";
        sql = mysql.format(sql, [ipcAddress, ipcName, ipcStatus]);

        return await pool.query(sql);
    }
}