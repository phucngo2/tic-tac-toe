import { Board, Container, Layout } from "@/components";
import "./App.css";
import { Controls } from "./components/Controls";

function App() {
  return (
    <Layout>
      <Container>
        <Board />
        <Controls />
      </Container>
    </Layout>
  );
}

export default App;
