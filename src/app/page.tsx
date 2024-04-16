import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="px-5 bg-slate-100">
      <header className="bg-blue-500 py-4 px-5 md:px-10">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-white text-2xl font-semibold mb-2 md:mb-0">Lomba Renang</h1>
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a href="#home" className="text-white hover:text-gray-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-200">
                  About
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex">
            <Link href="/auth/login" className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-blue-200 mr-4">
              Login
            </Link>
            <Link href="/auth/register" className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-blue-200">
              Register
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto my-8" id="home">
        <h2 className="text-3xl font-semibold mb-4">Acara Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Kompetisi Renang 1</h3>
            <p className="text-gray-700 mb-2">Tanggal: [Masukkan tanggal]</p>
            <p className="text-gray-700">Deskripsi: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis tristique diam, nec pulvinar turpis gravida at.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Kompetisi Renang 2</h3>
            <p className="text-gray-700 mb-2">Tanggal: [Masukkan tanggal]</p>
            <p className="text-gray-700">Deskripsi: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis tristique diam, nec pulvinar turpis gravida at.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto my-8" id="about">
        <h2 className="text-3xl font-semibold mb-4">Tentang Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Visi Kami</h3>
            <p className="text-gray-700">
              Kami berkomitmen untuk menjadi penyelenggara kompetisi renang terdepan yang mempromosikan gaya hidup sehat, semangat kompetitif, dan kesempatan bagi setiap individu untuk berkembang dalam olahraga renang.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Misi Kami</h3>
            <ul className="list-disc pl-6">
              <li className="mb-2">Memberikan platform untuk mengembangkan bakat renang.</li>
              <li className="mb-2">Mendorong partisipasi masyarakat dalam aktivitas renang.</li>
              <li className="mb-2">Memastikan penyelenggaraan kompetisi yang adil dan berkualitas.</li>
              <li className="mb-2">Menyebarkan kesadaran akan pentingnya olahraga renang untuk kesehatan dan kebugaran.</li>
            </ul>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-6">
        <div className="mx-auto text-center">
          <p className="mb-2">&copy; 2024 Lomba Renang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
