import { Box, Modal, SxProps, Typography } from "@mui/material";
import { memo } from "react";

interface Props {
  open: boolean,
  onClose: (value: boolean) => void,
  wpm: number,
  errors: number
}

const style: SxProps = {
  bgcolor: "slategrey",
  width: 'fit-content',
  p: 4,
  borderRadius: 2
}

const ResultModal = ({open, onClose, wpm, errors } : Props) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={style}>
        <Typography variant="h4">You Finished</Typography>
        <Typography variant="h5" sx={{ mt:2 }}>Speed: {wpm} WPM</Typography>
        <Typography variant="h5">Errors: {errors}</Typography>
      </Box>
    </Modal>
   );
}

export default memo(ResultModal);
