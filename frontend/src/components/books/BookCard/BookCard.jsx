function BookCard({ title, author, category }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDF9] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-64 items-center justify-center bg-[#EFE7DC]">
        <div className="flex h-44 w-32 items-center justify-center rounded-md border border-[#D8CDBF] bg-[#F8F5F0] text-[#8B6F47]">
          Book Cover
        </div>
      </div>

      <div className="p-5">
        <span className="rounded-full bg-[#F3ECE2] px-3 py-1 text-xs text-[#6B4F3A]">
          {category}
        </span>

        <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-[#3E2F26]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-[#7A6A5A]">
          {author}
        </p>

        <button className="mt-5 w-full rounded-full border border-[#6B4F3A] py-2 text-sm font-medium text-[#6B4F3A] transition hover:bg-[#6B4F3A] hover:text-white">
          View Details
        </button>
      </div>
    </div>
  );
}

export default BookCard;