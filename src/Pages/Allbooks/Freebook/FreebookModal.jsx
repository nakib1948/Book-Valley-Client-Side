const FreebookModal = ({ book }) => {
  return (
    <div className="p-4 text-white">
      <div className="h-full rounded-lg overflow-hidden">
        <img
          className="h-56 w-full"
          src={book.bookCoverPhoto}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium  mb-1">
            {book.category}
          </h2>
          <h1 className="title-font text-lg font-medium  mb-3">
            {book.name} <br/>by {book.writerName}
          </h1>
          <p className="leading-relaxed mb-3">
           {book.description}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default FreebookModal;
