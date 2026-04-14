import { useState, useRef, useEffect } from "react";

export default function MobileWeddingInvitation() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const touchStartX = useRef(null);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox((i) => (i - 1 + wedding.gallery.length) % wedding.gallery.length);
  const nextPhoto = () => setLightbox((i) => (i + 1) % wedding.gallery.length);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextPhoto();
    else if (diff < -50) prevPhoto();
    touchStartX.current = null;
  };

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
    audio.volume = 0.45;
  }, []);

  const wedding = {
    groom: "한덕길",
    bride: "문지원",
    date: "2027년 10월 1일 금요일 오후 12시 30분",
    venue: "웨딩시그니처",
    address: "서울 마포구 양화로 87",
    message:
      "저희 두 사람이 사랑과 믿음으로\n한 길을 걸어가려 합니다.\n\n소중한 분들을 모시고 기쁨의 순간을\n함께 나누고 싶습니다.\n\n바쁘시더라도 오셔서 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.",
    groomParents: "한길길의 아들 덕길",
    brideParents: "문길길의 딸 지원",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    ],
    account: {
      groomBank: "신한은행",
      groomNumber: "110-222-333344",
      groomName: "한덕길",
      brideBank: "신한은행",
      brideNumber: "110-222-333344",
      brideName: "문지원",
    },
    contacts: {
      groom: "010-3205-1111",
      bride: "010-4561-7897"
    },
    kakaoMapLink: "https://map.kakao.com/link/search/%EC%9B%A8%EB%94%A9%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98",
    naverMapLink: "https://map.naver.com/v5/search/%EC%9B%A8%EB%94%A9%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B2%98"
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] text-neutral-800" style={{ fontFamily: "'Noto Serif KR', serif" }}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 음악 버튼 */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md border border-rose-100 transition-transform active:scale-95"
        aria-label="음악 재생/정지"
      >
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4.804A1 1 0 0 0 7.382 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h.382A1 1 0 0 0 9 19.196l9.443-7a1 1 0 0 0 0-1.392L9 4.804z" />
          </svg>
        )}
      </button>

      {/* 시작 오버레이 */}
      {!started && (
        <div
          onClick={toggleMusic}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
        >
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-white px-12 py-10 shadow-2xl mx-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7l6-1.5V3L12 3z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-neutral-800">터치하여 청첩장 열기</p>
              <p className="mt-1 text-xs text-neutral-400">배경음악이 함께 재생됩니다</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[420px]">

        {/* Hero */}
        <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
          <img
            src={wedding.gallery[0]}
            alt="wedding main"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-white text-center px-8">
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-70" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Wedding Invitation
            </p>
            <h1 className="mt-4 text-5xl font-light tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {wedding.groom}
            </h1>
            <p className="mt-2 text-rose-300 text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>&#38;</p>
            <h1 className="mt-2 text-5xl font-light tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {wedding.bride}
            </h1>
            <div className="mt-8 h-px w-12 bg-white/40" />
            <p className="mt-6 text-[13px] leading-7 opacity-85 font-light">
              2027년 10월 1일 금요일
            </p>
            <p className="text-[13px] opacity-85 font-light">오후 12시 30분 · {wedding.venue}</p>
          </div>
        </section>

        {/* 초대 메시지 */}
        <section className="px-8 py-14 text-center bg-white">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-8">Invitation</p>
          <p className="text-[15px] leading-8 text-neutral-600 whitespace-pre-line font-light">
            {wedding.message}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-rose-300 text-lg">✦</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>
          <div className="mt-8 space-y-4 text-sm text-neutral-500 font-light">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-1">Groom</p>
              <p className="text-neutral-700">{wedding.groomParents}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-1">Bride</p>
              <p className="text-neutral-700">{wedding.brideParents}</p>
            </div>
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-2 bg-[#faf8f6]" />

        {/* 일정 */}
        <section className="px-8 py-12 bg-white text-center">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-8">Schedule</p>
          <p className="text-[42px] font-light text-neutral-800 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            2027
          </p>
          <p className="mt-1 text-[13px] tracking-[0.2em] text-neutral-400 uppercase">October · 01</p>
          <p className="mt-4 text-sm text-neutral-500 font-light">금요일 오후 12시 30분</p>
          <div className="mt-8 rounded-2xl bg-rose-50 px-6 py-5">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-2">Venue</p>
            <p className="text-base font-medium text-neutral-800">{wedding.venue}</p>
            <p className="mt-1 text-sm text-neutral-500 font-light">{wedding.address}</p>
          </div>
        </section>

        <div className="h-2 bg-[#faf8f6]" />

        {/* 갤러리 */}
        <section className="px-6 py-12 bg-white">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-6 text-center">Gallery</p>
          <div className="grid grid-cols-2 gap-2">
            {wedding.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`gallery-${index}`}
                onClick={() => openLightbox(index)}
                className={`${index === 0 ? "col-span-2 h-60" : "h-40"} w-full rounded-xl object-cover cursor-pointer active:opacity-80 transition-opacity`}
              />
            ))}
          </div>
        </section>

        {/* 라이트박스 */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="absolute top-6 left-0 right-0 text-center text-xs text-white/40">
              {lightbox + 1} / {wedding.gallery.length}
            </p>
            <button onClick={prevPhoto} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img
              src={wedding.gallery[lightbox]}
              alt={`gallery-${lightbox}`}
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            />
            <button onClick={nextPhoto} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-8 flex gap-2">
              {wedding.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === lightbox ? "w-6 bg-white" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="h-2 bg-[#faf8f6]" />

        {/* 오시는 길 */}
        <section className="px-8 py-12 bg-white">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-8 text-center">Location</p>
          <div className="text-center mb-6">
            <p className="text-base font-medium text-neutral-800">{wedding.venue}</p>
            <p className="mt-1 text-sm text-neutral-500 font-light">{wedding.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={wedding.kakaoMapLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#FEE500] py-3.5 text-sm font-medium text-neutral-900"
            >
              카카오맵
            </a>
            <a
              href={wedding.naverMapLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#03C75A] py-3.5 text-sm font-medium text-white"
            >
              네이버지도
            </a>
          </div>
          <div className="mt-6 space-y-3 text-sm font-light text-neutral-500 leading-7 border-t border-neutral-100 pt-6">
            <p>
              <span className="text-neutral-800 font-medium">주소</span>&ensp;서울 마포구 양화로 87
            </p>
            <p>
              <span className="text-neutral-800 font-medium">안내</span>&ensp;웨딩시그니처로 방문해 주세요
            </p>
          </div>
        </section>

        <div className="h-2 bg-[#faf8f6]" />

        {/* 연락처 */}
        <section className="px-8 py-12 bg-white">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-8 text-center">Contact</p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${wedding.contacts.groom}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-100 bg-neutral-50 py-5 text-center active:bg-neutral-100 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-wider text-neutral-400 uppercase">신랑</p>
                <p className="mt-0.5 text-sm font-medium text-neutral-700">{wedding.contacts.groom}</p>
              </div>
            </a>
            <a
              href={`tel:${wedding.contacts.bride}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-100 bg-neutral-50 py-5 text-center active:bg-neutral-100 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-wider text-neutral-400 uppercase">신부</p>
                <p className="mt-0.5 text-sm font-medium text-neutral-700">{wedding.contacts.bride}</p>
              </div>
            </a>
          </div>
        </section>

        <div className="h-2 bg-[#faf8f6]" />

        {/* 마음 전하기 */}
        <section className="px-8 py-12 bg-white">
          <p className="text-[10px] tracking-[0.4em] text-rose-400 uppercase mb-8 text-center">마음 전하기</p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-neutral-100 p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-wider text-neutral-400 uppercase">신랑측</p>
                <p className="text-xs text-neutral-500">{wedding.account.groomName}</p>
              </div>
              <p className="mt-3 text-base font-medium text-neutral-800">{wedding.account.groomNumber}</p>
              <p className="mt-0.5 text-xs text-neutral-400">{wedding.account.groomBank}</p>
            </div>
            <div className="rounded-2xl border border-neutral-100 p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-wider text-neutral-400 uppercase">신부측</p>
                <p className="text-xs text-neutral-500">{wedding.account.brideName}</p>
              </div>
              <p className="mt-3 text-base font-medium text-neutral-800">{wedding.account.brideNumber}</p>
              <p className="mt-0.5 text-xs text-neutral-400">{wedding.account.brideBank}</p>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="bg-white py-14 text-center">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-neutral-200" />
            <span className="text-rose-300 text-sm">✦</span>
            <div className="h-px w-10 bg-neutral-200" />
          </div>
          <p className="text-xs text-neutral-400 font-light tracking-wide">함께해 주시는 마음에 감사드립니다.</p>
          <p className="mt-2 text-xs text-neutral-300 font-light">
            {wedding.groom} · {wedding.bride}
          </p>
        </footer>

      </div>
    </div>
  );
}
