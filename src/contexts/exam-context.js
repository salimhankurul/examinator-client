import { createContext, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";

export const ExamContext = createContext({ undefined });

export const ExamProvider = (props) => {
  const { children } = props;
  const [exam, setExam] = useState({});

  return (
    <ExamContext.Provider
      value={{
        exam,
        setExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

ExamProvider.propTypes = {
  children: PropTypes.node,
};

export const useExamContext = () => useContext(ExamContext);
