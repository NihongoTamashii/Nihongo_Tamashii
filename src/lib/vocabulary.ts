export interface VocabularyItem {
  id: number;
  japanese: string;
  reading: string;
  meaning: string;
}

export interface Chapter {
  chapter: number;
  words: VocabularyItem[];
}

const chapter1Words: VocabularyItem[] = [
  { id: 1, reading: 'わたし', japanese: '私', meaning: 'Saya' },
  { id: 2, reading: 'あなた', japanese: 'あなた', meaning: 'Kamu' },
  { id: 3, reading: 'あのひと', japanese: 'あの人', meaning: 'Orang itu (biasa)' },
  { id: 4, reading: 'あのかた', japanese: 'あの方', meaning: 'Orang itu (sopan)' },
  { id: 5, reading: '～さん', japanese: '～さん', meaning: 'Saudara…….' },
  { id: 6, reading: '～ちゃん', japanese: '～ちゃん', meaning: 'Panggilan untuk anak laki/perempuan' },
  { id: 7, reading: '～じん', japanese: '～人', meaning: 'Orang…….' },
  { id: 8, reading: 'せんせい', japanese: '先生', meaning: 'Guru,dosen' },
  { id: 9, reading: 'きょうし', japanese: '教師', meaning: 'Guru,dosen (dipakai untuk kalangan sendiri)' },
  { id: 10, reading: 'がくせい', japanese: '学生', meaning: 'Siswa,murid' },
  { id: 11, reading: 'かいしゃいん', japanese: '会社員', meaning: 'Pegawai perusahaan' },
  { id: 12, reading: 'しゃいん', japanese: '社員', meaning: 'Pegawai perusahaan' },
  { id: 13, reading: 'ぎんこういん', japanese: '銀行員', meaning: 'Pegawai bank' },
  { id: 14, reading: 'いしゃ', japanese: '医者', meaning: 'Dokter' },
  { id: 15, reading: 'けんきゅうしゃ', japanese: '研究者', meaning: 'Peneliti' },
  { id: 16, reading: 'だいがく', japanese: '大学', meaning: 'Universitas' },
  { id: 17, reading: 'びょういん', japanese: '病院', meaning: 'Rumah sakit' },
  { id: 18, reading: 'だれ', japanese: 'だれ', meaning: 'Siapa (biasa)' },
  { id: 19, reading: 'どなた', japanese: 'どなた', meaning: 'Siapa (sopan)' },
  { id: 20, reading: '～さい', japanese: '～歳', meaning: 'Umur…..' },
  { id: 21, reading: 'なんさい', japanese: '何歳', meaning: 'Umur berapa?(biasa)' },
  { id: 22, reading: 'おいくつ', japanese: 'おいくつ', meaning: 'Umur berapa?(sopan)' },
  { id: 23, reading: 'はい', japanese: 'はい', meaning: 'Iya' },
  { id: 24, reading: 'いいえ', japanese: 'いいえ', meaning: 'Tidak' },
  { id: 25, reading: 'はじめまして', japanese: 'はじめまして', meaning: 'Perkenalkan' },
  { id: 26, reading: '～からきました', japanese: '～から来ました', meaning: 'Datang dari…..' },
  { id: 27, reading: 'どうぞよろしくおねがいします', japanese: 'どうぞよろしくお願します', meaning: 'Terimalah perkenalan saya' },
  { id: 28, reading: 'しつれいですが', japanese: '失礼ですが', meaning: 'Permisi' },
  { id: 29, reading: 'おなまえは', japanese: 'お名前は', meaning: 'Nama anda siapa?' },
  { id: 30, reading: 'アメリカ', japanese: 'アメリカ', meaning: 'Amerika' },
  { id: 31, reading: 'イギリス', japanese: 'イギリス', meaning: 'Inggris' },
  { id: 32, reading: 'インド', japanese: 'インド', meaning: 'India' },
  { id: 33, reading: 'インドネシア', japanese: 'インドネシア', meaning: 'Indonesia' },
  { id: 34, reading: 'かんこく', japanese: '韓国', meaning: 'Korea' },
  { id: 35, reading: 'ちゅうごく', japanese: '中国', meaning: 'China' },
  { id: 36, reading: 'ドイツ', japanese: 'ドイツ', meaning: 'Jerman' },
  { id: 37, reading: 'にほん', japanese: '日本', meaning: 'Jepang' },
  { id: 38, reading: 'フランス', japanese: 'フランス', meaning: 'Perancis' },
];

const otherWords: VocabularyItem[] = [
  { id: 39, japanese: '学ぶ', reading: 'まなぶ', meaning: 'Belajar' },
  { id: 40, japanese: '学校', reading: 'がっこう', meaning: 'Sekolah' },
  { id: 41, japanese: 'おはよう', reading: 'おはよう', meaning: 'Selamat pagi' },
  { id: 42, japanese: 'こんにちは', reading: 'こんにちは', meaning: 'Selamat siang' },
  { id: 43, japanese: 'こんばんは', reading: 'こんばんは', meaning: 'Selamat malam' },
  { id: 44, japanese: 'ありがとう', reading: 'ありがとう', meaning: 'Terima kasih' },
  { id: 45, japanese: 'すみません', reading: 'すみません', meaning: 'Maaf / Permisi' },
  { id: 46, japanese: '食べる', reading: 'たべる', meaning: 'Makan' },
  { id: 47, japanese: '飲む', reading: 'のむ', meaning: 'Minum' },
  { id: 48, japanese: '見る', reading: 'みる', meaning: 'Melihat' },
  { id: 49, japanese: '行く', reading: 'いく', meaning: 'Pergi' },
  { id: 50, japanese: '来る', reading: 'くる', meaning: 'Datang' },
  { id: 51, japanese: '友達', reading: 'ともだち', meaning: 'Teman' },
  { id: 52, japanese: '時間', reading: 'じかん', meaning: 'Waktu' },
  { id: 53, japanese: '今日', reading: 'きょう', meaning: 'Hari ini' },
  { id: 54, japanese: '明日', reading: 'あした', meaning: 'Besok' },
];

const allWords: VocabularyItem[] = [...chapter1Words, ...otherWords];

export const chapters: Chapter[] = Array.from({ length: 50 }, (_, i) => {
  const chapterNumber = i + 1;
  let words: VocabularyItem[] = [];
  if (chapterNumber === 1) words = chapter1Words;
  if (chapterNumber === 2) words = otherWords.slice(0, 4);
  if (chapterNumber === 3) words = otherWords.slice(4, 8);
  if (chapterNumber === 4) words = otherWords.slice(8, 12);
  if (chapterNumber === 5) words = otherWords.slice(12, 16);

  return {
    chapter: chapterNumber,
    words: words,
  };
});

// For practice page, we can provide a flat list for simplicity of random selection
export const vocabularyList: VocabularyItem[] = allWords;
