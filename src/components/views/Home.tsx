const HomeView = () => {
  return (
    <>
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
    </>
  );
};

export default HomeView;
