const PageNotFound = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl font-extrabold"> Error 404, Page not Found</h1>
        <p className="text-xl">It seems you want to access resource that not exists, try again.</p>
      </div>
    </>
  );
};

export default PageNotFound;
