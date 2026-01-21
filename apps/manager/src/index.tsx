import ReactDOM from "react-dom/client";
import Entry from "./Entry";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(<Entry />);
}
