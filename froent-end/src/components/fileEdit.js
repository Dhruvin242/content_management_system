import React, { useState, useRef, Fragment } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";


const Example = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [fileContent, setfileContent] = useState("");

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setfileContent(reader.result);
    };
    reader.onerror = () => {
      console.log("File error", reader.error);
    };
  };
  return (
    <Fragment>
      <Button
        sx={{ m: 5 }}
        variant="contained"
        component="label"
        startIcon={<BackupIcon />}
      >
        Read File
        <input hidden multiple type="file" onChange={handlefilechange} />
      </Button>
      <JoditEditor
        ref={editor}
        value={fileContent}
        tabIndex={1} // tabIndex of textarea
        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => {}}
      />
    </Fragment>
  );
};

export default Example;
