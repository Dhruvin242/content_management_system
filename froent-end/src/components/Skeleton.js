import Skeleton from "@mui/material/Skeleton";
import { Fragment } from "react";

const SkeletonCompenent = ({ card }) => {
  return (
    <Fragment>
      {console.log(card)}
      <Skeleton
        variant="rounded"
        sx={{ mt: 3, ml: 3 }}
        width={200}
        height={135}
      />
    </Fragment>
  );
};

export default SkeletonCompenent;
