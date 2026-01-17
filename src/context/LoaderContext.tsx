import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Loader from "../components/Loader";

interface LoaderContextType {
    showLoader: (text?: string) => void;
    hideLoader: () => void;
    isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Loading...");

    const showLoader = (text = "Loading...") => {
        setLoadingText(text);
        setIsLoading(true);
    };

    const hideLoader = () => {
        setIsLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
            {children}
            {isLoading && <Loader fullScreen text={loadingText} />}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }
    return context;
};
