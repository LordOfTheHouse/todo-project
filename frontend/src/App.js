import TaskPage from "./page/TaskPage";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "./page/NotFoundPage";
import {SecretPage} from "./page/SecretPage";
const App = () => {
    return (
        <Routes>
            <Route index element={<TaskPage />} />
            <Route path="/angelina" element={<SecretPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
export default App;