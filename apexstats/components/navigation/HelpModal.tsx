import { Box, IconButton, Modal, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

function HelpModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton edge="end" color="primary" onClick={handleOpen}>
        <HelpIcon color="primary" fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            ApexStats QnA
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <b>Q.</b> API는 공식적으로 EA에서 제공하는 건가요? <br />
            <b>A.</b> 본 사이트에서 제공하는 모든 데이터는 비공식 API를 사용하고
            있습니다.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <b>Q.</b> 실제 값과 차이가 나요. <br />
            <b>A.</b> API 업데이트가 실시간으로 되지 않을 때도 있습니다. 잠시
            기다려주세요.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <b>Q.</b> 사이트가 이상하게 보여요. <br />
            <b>A.</b> admin@apexstats.info 로 사진과 이슈 내용을 보내주시길
            바랍니다.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default HelpModal;
