export interface VocabularyItem {
  id: number;
  japanese: string;
  reading: string;
  meaning: string;
}

export const vocabularyList: VocabularyItem[] = [
  { id: 1, japanese: '学ぶ', reading: 'まなぶ', meaning: 'Belajar' },
  { id: 2, japanese: '学校', reading: 'がっこう', meaning: 'Sekolah' },
  { id: 3, japanese: '学生', reading: 'がくせい', meaning: 'Siswa' },
  { id: 4, japanese: '先生', reading: 'せんせい', meaning: 'Guru' },
  { id: 5, japanese: '日本語', reading: 'にほんご', meaning: 'Bahasa Jepang' },
  { id: 6, japanese: 'おはよう', reading: 'おはよう', meaning: 'Selamat pagi' },
  { id: 7, japanese: 'こんにちは', reading: 'こんにちは', meaning: 'Selamat siang' },
  { id: 8, japanese: 'こんばんは', reading: 'こんばんは', meaning: 'Selamat malam' },
  { id: 9, japanese: 'ありがとう', reading: 'ありがとう', meaning: 'Terima kasih' },
  { id: 10, japanese: 'すみません', reading: 'すみません', meaning: 'Maaf / Permisi' },
  { id: 11, japanese: '食べる', reading: 'たべる', meaning: 'Makan' },
  { id: 12, japanese: '飲む', reading: 'のむ', meaning: 'Minum' },
  { id: 13, japanese: '見る', reading: 'みる', meaning: 'Melihat' },
  { id: 14, japanese: '行く', reading: 'いく', meaning: 'Pergi' },
  { id: 15, japanese: '来る', reading: 'くる', meaning: 'Datang' },
  { id: 16, japanese: '私', reading: 'わたし', meaning: 'Saya' },
  { id: 17, japanese: '友達', reading: 'ともだち', meaning: 'Teman' },
  { id: 18, japanese: '時間', reading: 'じかん', meaning: 'Waktu' },
  { id: 19, japanese: '今日', reading: 'きょう', meaning: 'Hari ini' },
  { id: 20, japanese: '明日', reading: 'あした', meaning: 'Besok' },
];
