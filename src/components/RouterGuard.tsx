import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate} from "react-router-dom";

export default function RouterGuard({ children }: { children: React.ReactNode }) {
    const isAuthenticated = localStorage.getItem("access_token");
    const navigate = useNavigate();

    // ATENÇÃO ALUNOS: UTILIZE APENAS UMA DAS OPÇÕES ABAIXO, NÃOÉ NECESSÁRIO AS DUAS

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

     return <>{children}</>;
}