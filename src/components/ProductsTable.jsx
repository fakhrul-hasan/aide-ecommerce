"use client";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab, CiExport } from "react-icons/ci";
import ReactPaginate from "react-paginate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useReactToPrint } from 'react-to-print';
import Link from "next/link";

const ProductsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [products, setProducts] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    image: true,
    productName: true,
    variant: true,
    price: true,
    action: true,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
    <div className="shadow dropdown-content p-[23px] z-[1] bg-gray-200 absolute left-[274px] top-14" style={{ display: dropdownOpen ? 'block' : 'none' }}>
      <label className="">
        <input
          type="checkbox"
          id="cb"
          checked={columnVisibility.image}
          onChange={() => handleCheckboxChange('image')}
        />
        Image
      </label><br />
      <label>
        <input
          type="checkbox"
          id="cb"
          checked={columnVisibility.productName}
          onChange={() => handleCheckboxChange('productName')}
        />
        Product Name
      </label><br />
      <label>
        <input
          type="checkbox"
          id="cb"
          checked={columnVisibility.variant}
          onChange={() => handleCheckboxChange('variant')}
        />
        Weight
      </label><br />
      <label>
        <input
          type="checkbox"
          id="cb"
          checked={columnVisibility.price}
          onChange={() => handleCheckboxChange('price')}
        />
        Price
      </label><br />
      <label>
        <input
          type="checkbox"
          id="cb"
          checked={columnVisibility.action}
          onChange={() => handleCheckboxChange('action')}
        />
        Action
      </label>
    </div>
  );
  const tableRef = useRef(null);
  
  const pageCount = Math.ceil(products.length / pageSize);
  const currentProducts = products.slice(
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
      <div className="flex justify-between my-2 relative">
        <div className="flex gap-4">
        <button
          className="flex items-center gap-1 border px-2 py-1"
          onClick={handleExportToPDF}
        >
          <CiExport /> PDF
        </button>
        <button>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <span className="flex items-center gap-1 border px-2 py-3">
            <CiExport /> EXCEL
          </span>
        </DownloadTableExcel>
          </button>
          <button onClick={handlePrint} className="flex items-center gap-1 border px-2 py-1">
            <CiExport /> PRINT
          </button>
          <button className="dropdown-toggle border px-2 py-1" onClick={handleDropdownToggle}>
        SHOW/HIDE COLUMN
      </button>
      {dropdownMenu}
        </div>
        <Link href='dashboard/addEmployee' className="btn bg-violet-600 hover:bg-violet-800 text-white">+add new product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-base-200" ref={tableRef}>
          {/* head */}
          <thead>
            <tr id="tr-head">
            {columnVisibility.image && <th>Image</th>}
            {columnVisibility.productName && <th>Product Name</th>}
            {columnVisibility.variant && <th>Weight</th>}
            {columnVisibility.price && <th>Price</th>}
            {columnVisibility.action && <th id="nonPrint">Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-base-100 border-b las border-slate-900">
                {
                  columnVisibility.image && <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={product.image}
                          alt="Avatar Tailwind CSS Component"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                }
                {columnVisibility.productName && <td>{product.productName}</td>}
                {columnVisibility.variant && <td>{product.variant}</td>}
                {columnVisibility.price && <td>{product.price}</td>}
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

export default ProductsTable;
