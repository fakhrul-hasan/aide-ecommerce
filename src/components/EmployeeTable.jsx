"use client";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab, CiExport } from "react-icons/ci";
import ReactPaginate from "react-paginate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useReactToPrint } from 'react-to-print';

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    employeeName: true,
    email: true,
    role: true,
    plan: true,
    status: true,
    action: true,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (column) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleCheckboxDropdownChange = (column, checked) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [column]: checked,
    }));
  };

  const dropdownMenu = (
    <div className="dropdown-menu" style={{ display: dropdownOpen ? 'block' : 'none' }}>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.employeeName}
          onChange={() => handleCheckboxChange('employeeName')}
        />
        Employee Name
      </label>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.email}
          onChange={() => handleCheckboxChange('email')}
        />
        Email
      </label>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.role}
          onChange={() => handleCheckboxChange('role')}
        />
        Role
      </label>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.plan}
          onChange={() => handleCheckboxChange('plan')}
        />
        Role
      </label>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.status}
          onChange={() => handleCheckboxChange('status')}
        />
        Role
      </label>
      <label>
        <input
          type="checkbox"
          checked={columnVisibility.action}
          onChange={() => handleCheckboxChange('action')}
        />
        Role
      </label>
    </div>
  );
  const tableRef = useRef(null);
  useEffect(() => {
    fetch("employee.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);
  const pageCount = Math.ceil(employees.length / pageSize);
  const currentEmployees = employees.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setCurrentPage(0);
  };
  const handleExportToPDF = () => {
    const input = tableRef.current;
    const iconElements = input.querySelectorAll("#nonPrint");
    iconElements.forEach((iconElement) => {
      iconElement.style.display = "none";
    });

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "pt");
      const imgData = canvas.toDataURL("image/png");

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      // Add image to PDF excluding specific part
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      // Save PDF
      pdf.save("employee_table.pdf");
      iconElements.forEach((iconElement) => {
        iconElement.style.display = "";
      });
    });
  };
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  })
  return (
    <>
      <div className="flex gap-4 my-2">
        <button
          className="flex items-center gap-1 border px-2 py-1"
          onClick={handleExportToPDF}
        >
          <CiExport /> PDF
        </button>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="flex items-center gap-1 border px-2 py-1">
            <CiExport /> EXCEL
          </button>
        </DownloadTableExcel>
          <button onClick={handlePrint} className="flex items-center gap-1 border px-2 py-1">
            <CiExport /> PRINT
          </button>
          <button className="dropdown-toggle border px-2 py-1" onClick={handleDropdownToggle}>
        SHOW/HIDE COLUMN
      </button>
      {dropdownMenu}
      </div>
      <div className="overflow-x-auto">
        <table className="table" ref={tableRef}>
          {/* head */}
          <thead>
            <tr>
            {columnVisibility.employeeName && <th>Employee Name</th>}
            {columnVisibility.email && <th>Email</th>}
            {columnVisibility.role && <th>Role</th>}
            {columnVisibility.plan && <th>Plan</th>}
            {columnVisibility.status && <th>Status</th>}
            {columnVisibility.action && <th id="nonPrint">Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={index}>
                {
                  columnVisibility.employeeName && <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={employee.image}
                          alt="Avatar Tailwind CSS Component"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{employee.name}</div>
                      <div className="text-sm opacity-50">
                        {employee.mobile}
                      </div>
                    </div>
                  </div>
                </td>
                }
                {columnVisibility.email && <td>{employee.email}</td>}
                {columnVisibility.role && <td>{employee.role}</td>}
                {columnVisibility.plan && <td>{employee.plan}</td>}
                {columnVisibility.status && <td>
                  <span
                    className={`py-1 px-2 text-xs rounded-full ${
                      employee.status === "Pending" &&
                      "bg-yellow-100 text-yellow-500"
                    } ${
                      employee.status === "Active" &&
                      "bg-green-100 text-green-500"
                    } ${
                      employee.status === "Inactive" &&
                      "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>}
                {columnVisibility.action && <th id="nonPrint">
                  <button className="btn btn-ghost btn-xs">
                    <CiMenuKebab />
                  </button>
                </th>}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center">
          <label htmlFor="pageSize">Rows per page: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            className="flex justify-end gap-8 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
