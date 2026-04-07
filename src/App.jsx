import { useState, useRef, useEffect } from "react";

export default function MobileWeddingInvitation() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
  }, []);

  const wedding = {
    groom: "한덕길",
    bride: "문지원",
    date: "2027년 10월 1일 금요일 오후 12시 30분",
    venue: "웨딩시그니처",
    address: "서울 마포구 양화로 87",
    message:
      "저희 두 사람이 사랑과 믿음으로 한 길을 걸어가려 합니다. 소중한 분들을 모시고 기쁨의 순간을 함께 나누고 싶습니다. 바쁘시더라도 오셔서 축복해 주시면 더없는 기쁨으로 간직하겠습니다. 감사합니다.",
    groomParents: "한길길의 아들 덕길",
    brideParents: "문길길의 딸 지원",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    account: {
      groom: "신랑측 계좌 110222333344 신한은행 한덕길",
      bride: "신부측 계좌 110222333344 신한은행 문지원"
    },
    contacts: {
      groom: "010-3205-1111",
      bride: "010-4561-7897"
    },
    kakaoMapLink: "https://map.kakao.com/link/search/%EC%9B%A8%EB%94%A9%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98",
    naverMapLink: "https://map.naver.com/v5/search/%EC%9B%A8%EB%94%A9%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98"
  };

  const sectionTitle = "text-[11px] tracking-[0.35em] uppercase text-neutral-500 mb-3";
  const card = "bg-white/90 backdrop-blur rounded-[28px] shadow-sm border border-neutral-100";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-stone-50 text-neutral-800">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 음악 재생/정지 버튼 */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-lg border border-rose-100 transition-transform active:scale-95"
        aria-label="음악 재생/정지"
      >
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4.804A1 1 0 0 0 7.382 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h.382A1 1 0 0 0 9 19.196l9.443-7a1 1 0 0 0 0-1.392L9 4.804z" />
          </svg>
        )}
      </button>

      {/* 시작 안내 오버레이 */}
      {!started && (
        <div
          onClick={toggleMusic}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
        >
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white/90 px-10 py-8 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM9 6l12-3" stroke="currentColor" strokeWidth="0" />
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7l6-1.5V3L12 3z" />
            </svg>
            <p className="text-base font-medium text-neutral-700">터치하여 청첩장 열기</p>
            <p className="text-xs text-neutral-400">배경음악이 함께 재생됩니다</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-md px-4 py-6">
        <section className={`${card} overflow-hidden`}>
          <div className="relative h-[520px]">
            <img
              src={wedding.gallery[0]}
              alt="wedding main"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="text-xs tracking-[0.35em] uppercase opacity-90">Wedding Invitation</p>
              <h1 className="mt-3 text-4xl font-serif tracking-wide">{wedding.groom} & {wedding.bride}</h1>
              <p className="mt-4 text-sm leading-6 opacity-95">{wedding.date}</p>
              <p className="text-sm leading-6 opacity-95">{wedding.venue}</p>
            </div>
          </div>
        </section>

        <section className={`${card} mt-4 p-7 text-center`}>
          <p className={sectionTitle}>Invitation</p>
          <p className="text-sm leading-7 text-neutral-700 whitespace-pre-line">{wedding.message}</p>
          <div className="mt-6 space-y-2 text-sm text-neutral-700">
            <p>{wedding.groomParents}</p>
            <p>{wedding.brideParents}</p>
          </div>
        </section>

        <section className={`${card} mt-4 p-7`}>
          <p className={sectionTitle}>Schedule</p>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-semibold">2027.10.01</p>
              <p className="mt-1 text-sm text-neutral-600">금요일 오후 12시 30분</p>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4">
              <p className="text-sm font-medium">예식장</p>
              <p className="mt-1 text-sm text-neutral-700">{wedding.venue}</p>
              <p className="mt-1 text-sm text-neutral-500">{wedding.address}</p>
            </div>
          </div>
        </section>

        <section className={`${card} mt-4 p-7`}>
          <p className={sectionTitle}>Gallery</p>
          <div className="grid grid-cols-2 gap-3">
            {wedding.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`gallery-${index}`}
                className={`${index === 0 ? "col-span-2 h-56" : "h-40"} w-full rounded-2xl object-cover`}
              />
            ))}
          </div>
        </section>

        <section className={`${card} mt-4 p-7`}>
          <p className={sectionTitle}>Location</p>
          <div className="rounded-2xl bg-neutral-100 p-5 text-center">
            <p className="text-sm font-medium">{wedding.venue}</p>
            <p className="mt-1 text-sm text-neutral-600">{wedding.address}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <a href={wedding.kakaoMapLink} className="rounded-xl bg-yellow-300 px-3 py-3 text-neutral-900" target="_blank" rel="noreferrer">카카오맵</a>
              <a href={wedding.naverMapLink} className="rounded-xl bg-green-500 px-3 py-3 text-white" target="_blank" rel="noreferrer">네이버지도</a>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-neutral-600 leading-6">
            <p><span className="font-medium text-neutral-800">주소</span><br />서울 마포구 양화로 87</p>
            <p><span className="font-medium text-neutral-800">안내</span><br />웨딩시그니처로 방문해 주세요</p>
          </div>
        </section>

        <section className={`${card} mt-4 p-7`}>
          <p className={sectionTitle}>Contact</p>
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${wedding.contacts.groom}`} className="rounded-2xl border border-neutral-200 px-4 py-4 text-center">
              <p className="text-xs text-neutral-500">신랑에게 연락</p>
              <p className="mt-1 text-sm font-medium">{wedding.contacts.groom}</p>
            </a>
            <a href={`tel:${wedding.contacts.bride}`} className="rounded-2xl border border-neutral-200 px-4 py-4 text-center">
              <p className="text-xs text-neutral-500">신부에게 연락</p>
              <p className="mt-1 text-sm font-medium">{wedding.contacts.bride}</p>
            </a>
          </div>
        </section>

        <section className={`${card} mt-4 p-7`}>
          <p className={sectionTitle}>Account</p>
          <div className="space-y-3 text-sm text-neutral-700">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="font-medium">신랑측 마음 전하실 곳</p>
              <p className="mt-1">{wedding.account.groom}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="font-medium">신부측 마음 전하실 곳</p>
              <p className="mt-1">{wedding.account.bride}</p>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-neutral-400">
          <p>함께해 주시는 마음에 감사드립니다.</p>
        </footer>
      </div>
    </div>
  );
}
