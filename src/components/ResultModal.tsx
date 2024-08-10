import { Box, Modal, SxProps, Typography } from "@mui/material";

interface Props {
  open: boolean,
  onClose: (value: boolean) => void,
  result: string | null
}

const style: SxProps = {
  bgcolor: "slategray",
  width: 'fit-content',
  p: 4,
  borderRadius: 2
}

const ResultModal = ({open, onClose, result} : Props) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={style}>
        <Typography variant="h4">{result}</Typography>
      </Box>
    </Modal>
   );
}

export default ResultModal;
