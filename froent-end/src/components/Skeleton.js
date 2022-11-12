import Skeleton from "@mui/material/Skeleton";
import { Fragment } from "react";

const SkeletonCompenent = ({ card }) => {
  return Array(card)
    .fill(0)
    .map((item , i) => (
      <Fragment key={i}>
        <Skeleton
          variant="rounded"
          sx={{ mt: 3, ml: 3 }}
          width={200}
          height={180 }
        />
      </Fragment>
    ));
};

export default SkeletonCompenent;
