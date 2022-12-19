import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dialog, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { resFileStatus } from "../redux/Slice/shareSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function NotificationSharedFiles(props) {
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
      data: state.shareFiles.userFiles,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.setNotificationOpen(false);
  };

  const handleApprove = (name) => {
    const newFile = data.filter((file) => {
      return file.name === name;
    });

    const body = {
      shareFileName: newFile[0].name,
      fileResponse: "Approve",
      type: newFile[0].type,
      shareUser: newFile[0].sharedUserName,
      url: newFile[0].url,
      tags: newFile[0].tags,
      permission: newFile[0].permission,
    };
    const token = user.token;
    dispatch(resFileStatus({ body, token }));
    setOpen(false);
    props.setNotificationOpen(false);
  };

  const handleDenine = (name) => {
    const newFile = data.filter((file) => {
      return file.name === name;
    });
    const body = {
      shareFileName: newFile[0].name,
      fileResponse: "Denine",
    };
    const token = user.token;
    dispatch(resFileStatus({ body, token }));
    setOpen(false);
    props.setNotificationOpen(false);
  };

  const { data } = useSelector(
    (state) => ({
      data: state.shareFiles.userFiles,
    }),
    shallowEqual
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Table
        sx={{ width: 300, borderRadius: 1 }}
        size="small"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>File Name</StyledTableCell>
            <StyledTableCell align="right">SharedUser</StyledTableCell>
            <StyledTableCell align="right">Approve</StyledTableCell>
            <StyledTableCell align="right">Denine</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.sharedUserName}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="success"
                  onClick={() => handleApprove(row.name)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => handleDenine(row.name)}
                >
                  <DoDisturbOnIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}
