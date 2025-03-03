"use client";

import { ChangeEventHandler, FC, Fragment, useState } from "react";
import { FileUpload } from "../FileUpload/FileUpload";
import styles from "./ExpenseExtractor.module.scss";

import { getData } from "../../utils/getData";

export const ExpenseExtractor: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string[][]>([]);
  const [config, setConfig] = useState({
    transactionDate: false,
    currencyDate: true,
    transactionNumber: true,
    type: true,
    amount: true,
    total: false,
    details: true,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const data = e.target.files[0] ? await getData(e.target.files[0]) : [];

      setContent(data);
    }
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.id]: e.target.checked });
  };

  return (
    <Fragment>
      <div className={styles.fileUpload}>
        <FileUpload file={file} onChange={handleFileChange} />
      </div>
      {content.length > 0 && (
        <div className={styles.content}>
          <div className={styles.config}>
            {Object.entries(config).map(([conf, checked]) => (
              <span key={conf}>
                <label htmlFor={conf}>{conf}</label>
                <input
                  onChange={onCheckboxChange}
                  type="checkbox"
                  id={conf}
                  checked={checked}
                />
              </span>
            ))}
          </div>
          <table className={styles.table}>
            <tbody>
              <tr>
                {config.transactionDate && <th>Transaction Date</th>}
                {config.currencyDate && <th>Currency Date</th>}
                {config.transactionNumber && <th>Transaction Number</th>}
                {config.type && <th>Type</th>}
                {config.amount && <th>Amount</th>}
                {config.total && <th>Total</th>}
                {config.details && <th>Details</th>}
              </tr>
              {content.map((row, idx) => {
                const [
                  transactionDate,
                  transactionNumber,
                  type,
                  amount,
                  total,
                  currencyDate,
                  ...details
                ] = row;

                return (
                  <tr key={`tr_${idx}`}>
                    {config.transactionDate && <td>{transactionDate}</td>}
                    {config.currencyDate && <td>{currencyDate}</td>}
                    {config.transactionNumber && <td>{transactionNumber}</td>}
                    {config.type && <td>{type}</td>}
                    {config.amount && <td>{amount.replace(" ", "")}</td>}
                    {config.total && <td>{total.replace(" ", "")}</td>}
                    {config.details && <td>{details.join(" ")}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};
