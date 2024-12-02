const FullPageError = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <p className="text-2xl font-medium tracking-wide 	"> {title} </p>
    </div>
  );
};

export default FullPageError;
