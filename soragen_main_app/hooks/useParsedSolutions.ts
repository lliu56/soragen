// parsing the string outside of the ProblemItem component

import { useEffect, useState } from "react"

const useParsedSolutions = (solutions:string) => {
    const [parsedSolutions, setParsedSolutions] = useState<string[]>([]);

    useEffect(()=> {
        try {
            const solutionArray = JSON.parse(solutions);
            if (Array.isArray(solutionArray)) {
                setParsedSolutions(solutionArray);
            }else {
                throw new Error("solutions is not an array");
            }
        } catch (error) {
            console.error('Error parsing solutions:', error);
            setParsedSolutions([]);
        }
    }, [solutions])
       ;
    return parsedSolutions;
};

export default useParsedSolutions;