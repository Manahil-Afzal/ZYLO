import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { isDashboard } = props;
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
