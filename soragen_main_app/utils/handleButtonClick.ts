import { useState } from "react";

const [showProblems, setShowProblems] = useState(false);

const handleButtonClick = () => {
  setShowProblems(false);
};

export default handleButtonClick;