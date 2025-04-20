import ModelPage from "./ModelPage";

const App = ({ params }: { params: { modelId: string } }) => {
  return (
    <>
      <ModelPage modelId={params.modelId} />
    </>
  );
};

export default App;
