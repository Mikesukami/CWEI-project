import { Link } from "react-router-dom";

export default function CctvItem(props) {
    const { ipc_address, ipc_name, ipc_status_name, index } = props;
    // Define styles based on status
    let statusStyle;
    switch (ipc_status_name) {
        case "Online":
            statusStyle = {
                backgroundColor: "green",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
            break;
        case "Offline":
            statusStyle = {
                backgroundColor: "red",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
            break;
        case "In Progress":
            statusStyle = {
                backgroundColor: "yellow",
                borderRadius: "5px",
                color: "black",
                padding: "5px", // Adjust the padding as needed
            };
            break;
        default:
            statusStyle = {
                backgroundColor: "gray",
                borderRadius: "5px",
                color: "white",
                padding: "5px", // Adjust the padding as needed
            };
    }
    return (
        <>
            <tr style={{ textAlign: 'center' }}>
                <td>{ipc_address}</td>
                <td>{ipc_name}</td>
                <td>
                    <span style={statusStyle}>{ipc_status_name}</span>
                </td>
                <td><Link className="btn btn-primary btn-sm">Edit</Link></td>
            </tr>
        </>
    );
}