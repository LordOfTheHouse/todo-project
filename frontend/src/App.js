
import TaskPage from "./page/TaskPage";
import {Route, Routes} from "react-router-dom";
import {NotFoundPage} from "./page/NotFoundPage";

const App = () => {

    return (
        <Routes>
            <Route index element={<TaskPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;