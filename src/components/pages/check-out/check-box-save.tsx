import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useTranslations } from "next-intl";
import { memo } from "react";

interface ControlledCheckboxProps {
  isSaveFormToLocal: boolean;
  setIsSaveFormToLocal: (status: boolean) => void;
}

export const ControlledCheckbox = memo(({ isSaveFormToLocal, setIsSaveFormToLocal }: ControlledCheckboxProps) => {
  const t = useTranslations();

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isSaveFormToLocal} size="small" onChange={(e) => setIsSaveFormToLocal(e.target.checked)} />
      }
      label={t("checkout.saveInfo")}
    />
  );
});
