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

const chapter2Words: VocabularyItem[] = [
  { id: 39, reading: "これ", japanese: "これ", meaning: "Ini" },
  { id: 40, reading: "それ", japanese: "それ", meaning: "Itu (dekat)" },
  { id: 41, reading: "あれ", japanese: "あれ", meaning: "Itu (jauh)" },
  { id: 42, reading: "この～", japanese: "この～", meaning: "～ini" },
  { id: 43, reading: "その～", japanese: "その～", meaning: "～itu (dekat)" },
  { id: 44, reading: "あの～", japanese: "あの～", meaning: "～itu (jauh)" },
  { id: 45, reading: "ほん", japanese: "本", meaning: "Buku" },
  { id: 46, reading: "じしょ", japanese: "辞書", meaning: "Kamus" },
  { id: 47, reading: "ざっし", japanese: "雑誌", meaning: "Majalah" },
  { id: 48, reading: "しんぶん", japanese: "新聞", meaning: "Koran" },
  { id: 49, reading: "ノート", japanese: "ノート", meaning: "Buku catatan" },
  { id: 50, reading: "てちょう", japanese: "手帳", meaning: "Buku agenda" },
  { id: 51, reading: "めいし", japanese: "名刺", meaning: "Kartu nama" },
  { id: 52, reading: "カード", japanese: "カード", meaning: "Kartu" },
  { id: 53, reading: "えんぴつ", japanese: "鉛筆", meaning: "Pensil" },
  { id: 54, reading: "ボールペン", japanese: "ボールペン", meaning: "Bolpoin" },
  { id: 55, reading: "シャープペンシル", japanese: "シャープペンシル", meaning: "Pensil mekanik" },
  { id: 56, reading: "かぎ", japanese: "鍵", meaning: "Kunci" },
  { id: 57, reading: "とけい", japanese: "時計", meaning: "Jam , arloji" },
  { id: 58, reading: "かさ", japanese: "傘", meaning: "Payung" },
  { id: 59, reading: "かばん", japanese: "鞄", meaning: "Tas" },
  { id: 60, reading: "テレビ", japanese: "テレビ", meaning: "Televisi" },
  { id: 61, reading: "ラジオ", japanese: "ラジオ", meaning: "Radio" },
  { id: 62, reading: "カメラ", japanese: "カメラ", meaning: "Kamera" },
  { id: 63, reading: "コンピューター", japanese: "コンピューター", meaning: "Komputer" },
  { id: 64, reading: "くるま", japanese: "車", meaning: "Mobil" },
  { id: 65, reading: "つくえ", japanese: "机", meaning: "Meja" },
  { id: 66, reading: "いす", japanese: "椅子", meaning: "Kursi" },
  { id: 67, reading: "チョコレート", japanese: "チョコレート", meaning: "Coklat" },
  { id: 68, reading: "コーヒー", japanese: "コーヒー", meaning: "Kopi" },
  { id: 69, reading: "おみやげ", japanese: "お土産", meaning: "Oleh-oleh" },
  { id: 70, reading: "えいご", japanese: "英語", meaning: "Bahasa inggris" },
  { id: 71, reading: "にほんご", japanese: "日本語", meaning: "Bahasa jepang" },
  { id: 72, reading: "～ご", japanese: "～語", meaning: "Bahasa ～" },
  { id: 73, reading: "なん", japanese: "何", meaning: "Apa" },
  { id: 74, reading: "そう", japanese: "そう", meaning: "Begitu" },
  { id: 75, reading: "あのう", japanese: "あのう", meaning: "Eee ...(ungkapan ketika ragu)" },
  { id: 76, reading: "えっ", japanese: "えっ", meaning: "Eh (diucapkan ketika mendengar sesuatu diluar dugaan)" },
  { id: 77, reading: "どうぞ", japanese: "どうぞ", meaning: "Silakan" },
  { id: 78, reading: "どうもありがとうございます", japanese: "どうもありがとうございます", meaning: "Terima kasih" },
  { id: 79, reading: "そうですか", japanese: "そうですか", meaning: "O,begitu, benarkah?" },
  { id: 80, reading: "ちがいます", japanese: "違います", meaning: "Bukan , Tidak , Salah" },
  { id: 81, reading: "あ", japanese: "あ", meaning: "O,eh (dipakai ketika sadar)" },
  { id: 82, reading: "これからおせわになります", japanese: "これからお世話になります", meaning: "Mulai sekarang saya akan meminta bantuannya" },
  { id: 83, reading: "こちらこそよろしくおねがいします", japanese: "こちらこそよろしくおねがいします", meaning: "Ya sama-sama" },
];

const allWords: VocabularyItem[] = [...chapter1Words, ...chapter2Words];

export const chapters: Chapter[] = Array.from({ length: 50 }, (_, i) => {
  const chapterNumber = i + 1;
  let words: VocabularyItem[] = [];
  if (chapterNumber === 1) words = chapter1Words;
  if (chapterNumber === 2) words = chapter2Words;

  return {
    chapter: chapterNumber,
    words: words,
  };
});

// For practice page, we can provide a flat list for simplicity of random selection
export const vocabularyList: VocabularyItem[] = allWords;
