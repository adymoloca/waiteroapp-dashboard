import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

function createData(name, email, role, actions) {
    return { name, email, role, actions };
}

const editIcon = (
    <IconButton >
      <Edit style={{ color: "#00B4D8" }} />
    </IconButton>
);
  
var deleteIcon = (
    <IconButton >
        <Delete style={{ color: "#F50057" }} />
    </IconButton>
);

export const rows = [
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
    createData(
      "Table Cell",
      "Table Cell",
      "20/09/2021",
      <>
        {editIcon}
        {deleteIcon}
      </>
    ),
  ];