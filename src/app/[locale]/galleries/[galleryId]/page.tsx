import GalleryPage from "./GalleryPage";

const App = ({ params }: { params: { galleryId: string } }) => {
  return (
    <>
      <GalleryPage galleryId={params.galleryId} />
    </>
  );
};

export default App;
