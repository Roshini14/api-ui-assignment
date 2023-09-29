import React, { useCallback, useState } from "react";
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { ReactComponent as Upload } from "./../assets/ic_upload.svg";
import { ReactComponent as Remove } from "./../assets/ic_remove.svg";

function UploadImage(props) {
  const [paths, setPaths] = useState([props.coverImage]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setPaths(
        acceptedFiles.map((file) => {
          let url = URL.createObjectURL(file);
          props.handleChange(url);
          return url;
        })
      );
    },
    [setPaths]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop,
  });
  return (
    <section className="card-container">
      {_.isEmpty(paths) ? (
        <section>
          <div className="card-header">{props.header}</div>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Upload />
            <p>Upload Cover Image</p>
            <em>16:9 ratio is recommended. Max image size 1mb</em>
          </div>
        </section>
      ) : (
        <section className="card-image-section">
          {paths.map((path) => (
            <img key={path} src={path} alt="Cover" className="card-image" />
          ))}
          <div
            className="card-footer"
            type="button"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setPaths([])}
          >
            <Remove />
            Delete & re-upload
          </div>
        </section>
      )}
    </section>
  );
}

export default UploadImage;
