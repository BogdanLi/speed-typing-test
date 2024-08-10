import { Box, Modal, SxProps, Typography } from "@mui/material";
import { RootState } from "../lib/state/Store";
import { useSelector } from "react-redux";
import { memo, useEffect } from "react";

interface Props {
  open: boolean,
  onClose: () => void
}

const style: SxProps = {
  bgcolor: "slategrey",
  width: 'fit-content',
  p: 4,
  borderRadius: 2
}

const StatsModal = ({open, onClose} : Props) => {
  const history = useSelector((state:RootState) => state.history)

  useEffect(() => {
    console.log(history);
  }, [history])

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={style}>
        { history.map((el) => (
          <Box key={el.wpm} sx={{ my:1 }}>
            <Typography>WPM: {el.wpm}</Typography>
            <Typography>Errors: {el.errors}</Typography>
          </Box>
        )) }
      </Box>
    </Modal>
   );
}

export default memo(StatsModal);
