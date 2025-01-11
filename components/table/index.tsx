import { ReactNode } from "react";

interface TableProps {
  tableHead: string[];
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ tableHead, children }) => {
  return (
    <table className="h-full w-full overflow-x-auto lg:overflow-x-hidden">
      <thead className="bg-N2.2 sticky top-0 z-20 bg-brand-10 dark:bg-brand-90 bg-opacity-15">
        <tr>
          {tableHead.map((label, index) => (
            <th
              key={index}
              className="px-4 py-4 text-center text-N5 text-basic-black dark:text-basic-white"
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
