import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Task from "./components/Task";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState({});
  const [deleteRender, setDeleteRender] = useState(0);
  const [postRender, setPostRender] = useState("");
  const liftHandler = (renderData) => {
    setRerender(renderData);
  };
  const deleteRenderHandler = (data) => {
    setDeleteRender(data);
  };
  const postHandler = (data) => {
    setPostRender(data);
  };
  const fetchData = useCallback(async () => {
    await fetch("http://localhost:4500/api/tasks")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  useEffect(() => {
    const fetchTime = setTimeout(async () => {
      fetchData();
    }, 0);
    return () => {
      return fetchTime;
    };
  }, [
    fetchData,
    rerender.itemTask,
    rerender.itemTime,
    rerender.taskCompleted,
    deleteRender,
    postRender,
  ]);
  return (
    <div className="App">
      <h1>Task Manager</h1>
      {/* <NavLink to="/" className="px-2">
        Home
      </NavLink>
      <NavLink to="about">About</NavLink> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              deleteRender={deleteRenderHandler}
              postRender={postHandler}
            />
          }
        />
        <Route path="/about" element={<About />} />

        <Route
          path="/task/:taskId"
          element={<Task liftState={liftHandler} />}
        />
      </Routes>
    </div>
  );
}

export default App;
