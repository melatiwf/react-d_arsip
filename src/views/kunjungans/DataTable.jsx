import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const App = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [kunjungans, setKunjungans] = useState([]);


    // Fetch data barangs from API
    const fetchDataKunjungans = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/kunjungans");
            const hasil = await response.json();
            if (hasil.success) {
                setKunjungans(hasil.data);
            } else {
                console.error("Failed to fetch data:", hasil.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchDataKunjungans();
    }, []);


    const handleFilter = () => {
        const filtered = kunjungans.filter((item) => {
            const date = new Date(item.dapat_pada_tanggal);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
        setFilteredData(filtered);
    };


    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Nama Instansi", "Tanggal", "Tujuan", ];
        const tableRows = [];


        const dataToExport = filteredData.length > 0 ? filteredData : kunjungans;


        dataToExport.forEach((item) => {
            const itemData = [item.nama_instansi, item.tanggal, item.tujuan, ];
            tableRows.push(itemData);
        });


        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Rekap Kunjungan", 14, 15);
        doc.save("datarekapkunjungan.pdf");
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Rekap Data Kunjungan</h1>
            <div style={styles.filterContainer}>
                <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    style={styles.dateInput}
                />
                <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    style={styles.dateInput}
                />
                <button onClick={handleFilter} style={styles.button}>
                    Filter
                </button>
                <button onClick={generatePDF} style={styles.button}>
                    Download PDF
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Nama Instansi</th>
                        <th style={styles.tableCell}>Tanggal</th>
                        <th style={styles.tableCell}>Tujuan</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredData.length > 0 ? filteredData : kunjungans).map((kunjungan, index) => (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{kunjungan.nama_instansi}</td>
                            <td style={styles.tableCell}>{kunjungan.tanggal}</td>
                            <td style={styles.tableCell}>{kunjungan.tujuan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const styles = {
    container: {
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
    },
    header: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    filterContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    dateInput: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
    },
    tableHeader: {
        backgroundColor: "#007bff",
        color: "white",
        textAlign: "left",
    },
    tableRow: {
        borderBottom: "1px solid #ddd",
    },
    tableCell: {
        padding: "12px",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
    },
};


export default App;


