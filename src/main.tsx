import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import "./index.css";
import EditorPage from "./modules/animations/pages/Editor";
import MainPage from "./modules/animations/pages/Main";
import Workspace from "./modules/animations/pages/Workspace";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", {
      scope: "/",
      type: "module",
    })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    });
}

const routeVariants = {
  initial: {
    x: "-100vh",
  },
  final: {
    x: "0vh",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <motion.div
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit="initial"
          >
            <MainPage />
          </motion.div>
        ),
      },
      {
        path: "/workspace",
        element: (
          <motion.div
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit="initial"
          >
            <Workspace />
          </motion.div>
        ),
      },
      {
        path: "/workspace/edit/:id",
        element: (
          <motion.div
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit="initial"
          >
            <EditorPage />
          </motion.div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AnimatePresence>
    <RouterProvider router={router} />
  </AnimatePresence>
);
