import React from "react";
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

// 1. Metric Cards Component
export const MetricCard = ({ title, value, icon, bgColor = "bg-blue-500" }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor} text-white flex items-center`}>
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

// 2. Table Component
export const DataTable = ({
  columns,
  data,
  rowsPerPage = 5,
  onEdit,
  onDelete,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPageState, page * rowsPerPageState + rowsPerPageState)
            .map((row, idx) => (
              <TableRow key={idx}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPageState}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

// 3. Chart Component
export const Chart = ({ type, data, options }) => {
  switch (type) {
    case "bar":
      return <Bar data={data} options={options} />;
    case "line":
      return <Line data={data} options={options} />;
    case "pie":
      return <Pie data={data} options={options} />;
    default:
      return <p>Invalid chart type</p>;
  }
};

// Example Usage
export const Dashboard = () => {
  const metricData = [
    { title: "Total Sales", value: "$12,000", icon: "💰" },
    { title: "Total Products", value: "250", icon: "📦" },
  ];

  const tableColumns = ["Name", "Price", "Stock", "Rating"];
  const tableData = [
    { Name: "Product A", Price: "$10", Stock: "50", Rating: "4.5" },
    { Name: "Product B", Price: "$20", Stock: "30", Rating: "4.0" },
  ];

  const chartData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Sales",
        data: [300, 400, 500],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 grid grid-cols-1 gap-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4">
        {metricData.map((metric, idx) => (
          <MetricCard
            key={idx}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Product Table</h2>
        <DataTable columns={tableColumns} data={tableData} />
      </div>

      {/* Chart */}
      <div className="h-96">
        <h2 className="text-xl font-bold mb-4">Sales Chart</h2>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
