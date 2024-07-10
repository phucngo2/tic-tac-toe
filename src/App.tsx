import { Board, Container, Controls, Layout, Title } from "@/components";
import { resetBoard } from "@/utils";
import { onMount } from "solid-js";
import "./App.css";

function App() {
  onMount(resetBoard);
  return (
    <Layout>
      <Container>
        <div>
          <Title />
          <Board />
        </div>
        <Controls />
      </Container>
    </Layout>
  );
}

export default App;
