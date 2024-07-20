export const LeftSideComponent = () => {
	return (
		<div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
			<h1 className="text-3xl xl:text-5xl font-bold mb-6">
				Tanyakan. Pelajari.
				Belajar Bersama.
			</h1>
			<div className="space-y-6">
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🧠</div>
					<div>
						<h3 className="text-xl font-semibold">
							Kembangkan Rasa Ingin Tahu
						</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							Bergabunglah dengan komunitas yang menghargai pertanyaan
							berkualitas. Jelajahi topik secara mendalam dan ciptakan diskusi
							bermakna yang menghasilkan wawasan nyata.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🌱</div>
					<div>
						<h3 className="text-xl font-semibold">Nurture Knowledge</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							Di <span className="text-secondary">Diskusi</span>, pengetahuan
							mengalir bebas. Jadilah sumber inspirasi sekaligus penikmat
							kebijaksanaan kolektif komunitas kami.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🤝</div>
					<div>
						<h3 className="text-xl font-semibold">Buat Hubungan</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							Temukan teman diskusi yang sepaham, mentor yang menginspirasi,
							bahkan mitra bisnis masa depan. Bersama, kita lebih dari sekadar
							komunitas - kita adalah katalis perubahan.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h2 className="text-3xl font-bold">Diskusi</h2>
			</div>
		</div>
	);
};
