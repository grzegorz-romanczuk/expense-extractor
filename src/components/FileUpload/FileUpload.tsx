import { FC, Fragment, useRef } from "react";
import styles from "./FileUpload.module.scss";
import icon from "./x-symbol-svgrepo-com.svg";

type FileUploadType = {
  file: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileUpload: FC<FileUploadType> = ({ file, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (ref?.current) {
      ref.current.value = "";
      ref.current.dispatchEvent(new InputEvent("change", { bubbles: true }));
    }
  };

  return (
    <div className={styles.container}>
      <Fragment>
        <label htmlFor="upload" className={styles.input}>
          <p>Choose a file to upload</p>
        </label>
        <input
          ref={ref}
          type="file"
          id="upload"
          name="upload"
          onChange={onChange}
        />
        {file && (
          <Fragment>
            <hr className={styles.divider} />
            <span
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p title={file.name} className={styles.fileName}>
                {file.name}{" "}
              </p>
              <button className={styles.remove} onClick={onClick}>
                <svg
                  fill="currentColor"
                  height="10px"
                  width="10px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 460.775 460.775"
                  xmlSpace="preserve"
                >
                  <path
                    d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                  />
                </svg>
              </button>
            </span>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};
