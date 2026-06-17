import Navbar from "../../../components/layout/Navbar/Navbar";
import { useBorrow } from "../../../context/BorrowContext";

function Profile() {
  const { borrowedBooks } = useBorrow();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0]">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="mb-10">
            <h1
              className="text-5xl text-[#3E2F26]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Profile
            </h1>

            <p className="mt-2 text-[#6B5B4D]">
              Manage your account and view your library activity.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E7DDD0] bg-[#FFFDF9] p-8 shadow-sm">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EFE7DC] text-3xl font-semibold text-[#6B4F3A]">
                JD
              </div>

              <div className="flex-1">
                <h2
                  className="text-3xl text-[#3E2F26]"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  John Doe
                </h2>

                <p className="mt-1 text-[#6B5B4D]">
                  john@example.com
                </p>

                <span className="mt-4 inline-block rounded-full bg-[#F3ECE2] px-4 py-1 text-sm text-[#6B4F3A]">
                  Member
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-[#F8F5F0] p-6">
                <p className="text-sm uppercase tracking-wider text-[#8B6F47]">
                  Borrowed Books
                </p>

                <h3 className="mt-2 text-4xl font-semibold text-[#3E2F26]">
                  {borrowedBooks.length}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#F8F5F0] p-6">
                <p className="text-sm uppercase tracking-wider text-[#8B6F47]">
                  Account Status
                </p>

                <h3 className="mt-2 text-2xl text-[#3E2F26]">
                  Active Member
                </h3>
              </div>
            </div>

            <div className="mt-10">
              <button
                className="rounded-full bg-[#6B4F3A] px-6 py-3 text-white transition hover:bg-[#5A4230]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;