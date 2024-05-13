import { Button } from "@mui/material";

type InfoBarButtonProps = {
  label?: string;
  startIconUrl?: string;
  endIconUrl?: string;
  onClick?: () => void
}

function InfoBarButton({ label, startIconUrl, endIconUrl, onClick }: InfoBarButtonProps) {


  if (label && (startIconUrl || endIconUrl)) {
    return (
      <Button>
        {label}
      </Button>
    );
  }
}