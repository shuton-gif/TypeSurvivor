export type EHKKR = {
  En: string;
  Hi: string;
  Kan: string;
  Kat: string;
  Ro: string[];
  level: number; // 1 = most frequent / easiest, 5 = less frequent / harder
};

export const VOCAB: EHKKR[] = [
  // ======================
  // Level 1: core daily (very frequent)
  // ======================
  { En: "I / me", Hi: "わたし", Kan: "私", Kat: "ワタシ", Ro: ["watashi"], level: 1 },
  { En: "you", Hi: "あなた", Kan: "あなた", Kat: "アナタ", Ro: ["anata"], level: 1 },
  { En: "this", Hi: "これ", Kan: "これ", Kat: "コレ", Ro: ["kore"], level: 1 },
  { En: "that", Hi: "それ", Kan: "それ", Kat: "ソレ", Ro: ["sore"], level: 1 },
  { En: "that (over there)", Hi: "あれ", Kan: "あれ", Kat: "アレ", Ro: ["are"], level: 1 },
  { En: "here", Hi: "ここ", Kan: "ここ", Kat: "ココ", Ro: ["koko"], level: 1 },
  { En: "there", Hi: "そこ", Kan: "そこ", Kat: "ソコ", Ro: ["soko"], level: 1 },
  { En: "over there", Hi: "あそこ", Kan: "あそこ", Kat: "アソコ", Ro: ["asoko"], level: 1 },

  { En: "yes", Hi: "はい", Kan: "はい", Kat: "ハイ", Ro: ["hai"], level: 1 },
  { En: "no", Hi: "いいえ", Kan: "いいえ", Kat: "イイエ", Ro: ["iie"], level: 1 },
  { En: "please", Hi: "おねがい", Kan: "お願い", Kat: "オネガイ", Ro: ["onegai"], level: 1 },
  { En: "thank you", Hi: "ありがとう", Kan: "有難う", Kat: "アリガトウ", Ro: ["arigatou", "arigatoo"], level: 1 },
  { En: "excuse me / sorry", Hi: "すみません", Kan: "すみません", Kat: "スミマセン", Ro: ["sumimasen","sumimasenn"], level: 1 },

  { En: "is / am / are (polite)", Hi: "です", Kan: "です", Kat: "デス", Ro: ["desu"], level: 1 },
  { En: "to do (polite)", Hi: "します", Kan: "します", Kat: "シマス", Ro: ["shimasu", "simasu"], level: 1 },
  { En: "to be (exist: thing)", Hi: "ある", Kan: "ある", Kat: "アル", Ro: ["aru"], level: 1 },
  { En: "to be (exist: living)", Hi: "いる", Kan: "いる", Kat: "イル", Ro: ["iru"], level: 1 },

  { En: "eat", Hi: "たべる", Kan: "食べる", Kat: "タベル", Ro: ["taberu"], level: 1 },
  { En: "drink", Hi: "のむ", Kan: "飲む", Kat: "ノム", Ro: ["nomu"], level: 1 },
  { En: "go", Hi: "いく", Kan: "行く", Kat: "イク", Ro: ["iku"], level: 1 },
  { En: "come", Hi: "くる", Kan: "来る", Kat: "クル", Ro: ["kuru"], level: 1 },
  { En: "see / watch", Hi: "みる", Kan: "見る", Kat: "ミル", Ro: ["miru"], level: 1 },

  { En: "today", Hi: "きょう", Kan: "今日", Kat: "キョウ", Ro: ["kyou", "kyoo"], level: 1 },
  { En: "tomorrow", Hi: "あした", Kan: "明日", Kat: "アシタ", Ro: ["ashita", "asita"], level: 1 },
  { En: "yesterday", Hi: "きのう", Kan: "昨日", Kat: "キノウ", Ro: ["kinou", "kinoo"], level: 1 },

  { En: "water", Hi: "みず", Kan: "水", Kat: "ミズ", Ro: ["mizu"], level: 1 },
  { En: "food", Hi: "たべもの", Kan: "食べ物", Kat: "タベモノ", Ro: ["tabemono"], level: 1 },
  { En: "money", Hi: "おかね", Kan: "お金", Kat: "オカネ", Ro: ["okane"], level: 1 },
  { En: "station", Hi: "えき", Kan: "駅", Kat: "エキ", Ro: ["eki"], level: 1 },

  // ======================
  // Level 2: daily nouns + basic adjectives
  // ======================
  { En: "time", Hi: "じかん", Kan: "時間", Kat: "ジカン", Ro: ["jikan", "zikan"], level: 2 },
  { En: "now", Hi: "いま", Kan: "今", Kat: "イマ", Ro: ["ima"], level: 2 },
  { En: "later", Hi: "あとで", Kan: "後で", Kat: "アトデ", Ro: ["atode"], level: 2 },

  { En: "good", Hi: "いい", Kan: "良い", Kat: "イイ", Ro: ["ii"], level: 2 },
  { En: "bad", Hi: "わるい", Kan: "悪い", Kat: "ワルイ", Ro: ["warui"], level: 2 },
  { En: "big", Hi: "おおきい", Kan: "大きい", Kat: "オオキイ", Ro: ["ookii", "ookii"], level: 2 },
  { En: "small", Hi: "ちいさい", Kan: "小さい", Kat: "チイサイ", Ro: ["chiisai", "tiisai"], level: 2 },
  { En: "hot", Hi: "あつい", Kan: "暑い", Kat: "アツイ", Ro: ["atsui", "atui"], level: 2 },
  { En: "cold", Hi: "さむい", Kan: "寒い", Kat: "サムイ", Ro: ["samui"], level: 2 },

  { En: "home", Hi: "いえ", Kan: "家", Kat: "イエ", Ro: ["ie"], level: 2 },
  { En: "school", Hi: "がっこう", Kan: "学校", Kat: "ガッコウ", Ro: ["gakkou", "gakkoo"], level: 2 },
  { En: "friend", Hi: "ともだち", Kan: "友達", Kat: "トモダチ", Ro: ["tomodachi"], level: 2 },

  { En: "car", Hi: "くるま", Kan: "車", Kat: "クルマ", Ro: ["kuruma"], level: 2 },
  { En: "train", Hi: "でんしゃ", Kan: "電車", Kat: "デンシャ", Ro: ["densha", "densya", "dennsha", "dennsya"], level: 2 },
  { En: "bus", Hi: "バス", Kan: "バス", Kat: "バス", Ro: ["basu"], level: 2 },

  // ======================
  // Level 3: useful verbs + places + common “life” words
  // ======================
  { En: "buy", Hi: "かう", Kan: "買う", Kat: "カウ", Ro: ["kau"], level: 3 },
  { En: "listen", Hi: "きく", Kan: "聞く", Kat: "キク", Ro: ["kiku"], level: 3 },
  { En: "speak", Hi: "はなす", Kan: "話す", Kat: "ハナス", Ro: ["hanasu"], level: 3 },
  { En: "read", Hi: "よむ", Kan: "読む", Kat: "ヨム", Ro: ["yomu"], level: 3 },
  { En: "write", Hi: "かく", Kan: "書く", Kat: "カク", Ro: ["kaku"], level: 3 },

  { En: "store", Hi: "みせ", Kan: "店", Kat: "ミセ", Ro: ["mise"], level: 3 },
  { En: "restaurant", Hi: "レストラン", Kan: "レストラン", Kat: "レストラン", Ro: ["resutoran"], level: 3 },
  { En: "hospital", Hi: "びょういん", Kan: "病院", Kat: "ビョウイン", Ro: ["byouin", "byoin"], level: 3 },

  { En: "name", Hi: "なまえ", Kan: "名前", Kat: "ナマエ", Ro: ["namae"], level: 3 },
  { En: "English", Hi: "えいご", Kan: "英語", Kat: "エイゴ", Ro: ["eigo"], level: 3 },
  { En: "Japanese", Hi: "にほんご", Kan: "日本語", Kat: "ニホンゴ", Ro: ["nihongo", "nihonngo"], level: 3 },

  // ======================
  // Level 4: slightly less frequent (still useful)
  // ======================
  { En: "weather", Hi: "てんき", Kan: "天気", Kat: "テンキ", Ro: ["tenki"], level: 4 },
  { En: "rain", Hi: "あめ", Kan: "雨", Kat: "アメ", Ro: ["ame"], level: 4 },
  { En: "snow", Hi: "ゆき", Kan: "雪", Kat: "ユキ", Ro: ["yuki"], level: 4 },
  { En: "wind", Hi: "かぜ", Kan: "風", Kat: "カゼ", Ro: ["kaze"], level: 4 },

  { En: "computer", Hi: "コンピューター", Kan: "コンピューター", Kat: "コンピューター", Ro: ["konpyuutaa"], level: 4 },
  { En: "phone", Hi: "でんわ", Kan: "電話", Kat: "デンワ", Ro: ["denwa", "dennwa"], level: 4 },

  // ======================
  // Level 5: “nice to have” / less daily usage
  // ======================
  { En: "forest", Hi: "もり", Kan: "森", Kat: "モリ", Ro: ["mori"], level: 5 },
  { En: "mountain", Hi: "やま", Kan: "山", Kat: "ヤマ", Ro: ["yama"], level: 5 },
  { En: "river", Hi: "かわ", Kan: "川", Kat: "カワ", Ro: ["kawa"], level: 5 },
  { En: "sky", Hi: "そら", Kan: "空", Kat: "ソラ", Ro: ["sora"], level: 5 },

  { En: "horse", Hi: "うま", Kan: "馬", Kat: "ウマ", Ro: ["uma"], level: 5 },
  { En: "sheep", Hi: "ひつじ", Kan: "羊", Kat: "ヒツジ", Ro: ["hitsuji", "hituzi"], level: 5 },

  // ==========================================================
  // Your ORIGINAL LIST (kept ALL entries) + added `level`
  // ==========================================================

  // Basic words
  { En: "apple", Hi: "りんご", Kan: "林檎", Kat: "リンゴ", Ro: ["ringo", "rinngo"], level: 3 },
  { En: "cat", Hi: "ねこ", Kan: "猫", Kat: "ネコ", Ro: ["neko"], level: 3 },
  { En: "dog", Hi: "いぬ", Kan: "犬", Kat: "イヌ", Ro: ["inu"], level: 3 },
  { En: "bird", Hi: "とり", Kan: "鳥", Kat: "トリ", Ro: ["tori"], level: 4 },
  { En: "fish", Hi: "さかな", Kan: "魚", Kat: "サカナ", Ro: ["sakana"], level: 4 },
  { En: "water", Hi: "みず", Kan: "水", Kat: "ミズ", Ro: ["mizu"], level: 1 }, 
  { En: "fire", Hi: "ひ", Kan: "火", Kat: "ヒ", Ro: ["hi"], level: 4 },
  { En: "tree", Hi: "き", Kan: "木", Kat: "キ", Ro: ["ki"], level: 4 },
  { En: "flower", Hi: "はな", Kan: "花", Kat: "ハナ", Ro: ["hana"], level: 4 },
  { En: "book", Hi: "ほん", Kan: "本", Kat: "ホン", Ro: ["hon", "honn"], level: 2 },

  // House & Family
  { En: "house", Hi: "いえ", Kan: "家", Kat: "イエ", Ro: ["ie"], level: 2 },
  { En: "mother", Hi: "はは", Kan: "母", Kat: "ハハ", Ro: ["haha"], level: 2 },
  { En: "father", Hi: "ちち", Kan: "父", Kat: "チチ", Ro: ["chichi", "titi"], level: 2 },
  { En: "child", Hi: "こども", Kan: "子供", Kat: "コドモ", Ro: ["kodomo"], level: 2 },
  { En: "baby", Hi: "あかちゃん", Kan: "赤ちゃん", Kat: "アカチャン", Ro: ["akachan", "akatyan", "akachann", "akatyann"], level: 3 },

  // Time & Weather
  { En: "moon", Hi: "つき", Kan: "月", Kat: "ツキ", Ro: ["tsuki", "tuki"], level: 4 },
  { En: "sun", Hi: "たいよう", Kan: "太陽", Kat: "タイヨウ", Ro: ["taiyou", "taiyoo"], level: 4 },
  { En: "rain", Hi: "あめ", Kan: "雨", Kat: "アメ", Ro: ["ame"], level: 4 }, 
  { En: "snow", Hi: "ゆき", Kan: "雪", Kat: "ユキ", Ro: ["yuki"], level: 4 }, 
  { En: "wind", Hi: "かぜ", Kan: "風", Kat: "カゼ", Ro: ["kaze"], level: 4 }, 

  // School & Learning
  { En: "school", Hi: "がっこう", Kan: "学校", Kat: "ガッコウ", Ro: ["gakkou", "gakkoo"], level: 2 }, 
  { En: "student", Hi: "がくせい", Kan: "学生", Kat: "ガクセイ", Ro: ["gakusei"], level: 3 },
  { En: "teacher", Hi: "せんせい", Kan: "先生", Kat: "センセイ", Ro: ["sensei", "sennsei"], level: 2 },
  { En: "lesson", Hi: "じゅぎょう", Kan: "授業", Kat: "ジュギョウ", Ro: ["jugyou", "jugyoo", "zyugyou"], level: 3 },
  { En: "study", Hi: "べんきょう", Kan: "勉強", Kat: "ベンキョウ", Ro: ["benkyou", "benkyoo", "bennkyou", "bennkyoo"], level: 3 },

  // Food & Drink
  { En: "food", Hi: "たべもの", Kan: "食べ物", Kat: "タベモノ", Ro: ["tabemono"], level: 1 }, 
  { En: "rice", Hi: "ごはん", Kan: "ご飯", Kat: "ゴハン", Ro: ["gohan", "gohann"], level: 2 },
  { En: "bread", Hi: "パン", Kan: "パン", Kat: "パン", Ro: ["pan"], level: 3 },
  { En: "tea", Hi: "おちゃ", Kan: "お茶", Kat: "オチャ", Ro: ["ocha", "otya"], level: 3 },
  { En: "milk", Hi: "ぎゅうにゅう", Kan: "牛乳", Kat: "ギュウニュウ", Ro: ["gyuunyuu", "gyuunyuu", "gyunyuu"], level: 3 },

  // Transportation
  { En: "car", Hi: "くるま", Kan: "車", Kat: "クルマ", Ro: ["kuruma"], level: 2 }, 
  { En: "train", Hi: "でんしゃ", Kan: "電車", Kat: "デンシャ", Ro: ["densha", "densya", "dennsha", "dennsya"], level: 2 }, 
  { En: "bus", Hi: "バス", Kan: "バス", Kat: "バス", Ro: ["basu"], level: 2 }, 
  { En: "bicycle", Hi: "じてんしゃ", Kan: "自転車", Kat: "ジテンシャ", Ro: ["jitensha", "zitensya", "jitennsha", "zitennsya"], level: 3 },
  { En: "airplane", Hi: "ひこうき", Kan: "飛行機", Kat: "ヒコウキ", Ro: ["hikouki", "hikoki"], level: 4 },

  // Body Parts
  { En: "hand", Hi: "て", Kan: "手", Kat: "テ", Ro: ["te"], level: 2 },
  { En: "foot", Hi: "あし", Kan: "足", Kat: "アシ", Ro: ["ashi", "asi"], level: 2 },
  { En: "head", Hi: "あたま", Kan: "頭", Kat: "アタマ", Ro: ["atama"], level: 3 },
  { En: "eye", Hi: "め", Kan: "目", Kat: "メ", Ro: ["me"], level: 2 },
  { En: "ear", Hi: "みみ", Kan: "耳", Kat: "ミミ", Ro: ["mimi"], level: 3 },

  // Colors
  { En: "red", Hi: "あか", Kan: "赤", Kat: "アカ", Ro: ["aka"], level: 3 },
  { En: "blue", Hi: "あお", Kan: "青", Kat: "アオ", Ro: ["ao"], level: 3 },
  { En: "white", Hi: "しろ", Kan: "白", Kat: "シロ", Ro: ["shiro", "siro"], level: 3 },
  { En: "black", Hi: "くろ", Kan: "黒", Kat: "クロ", Ro: ["kuro"], level: 3 },
  { En: "green", Hi: "みどり", Kan: "緑", Kat: "ミドリ", Ro: ["midori"], level: 4 },

  // Nature
  { En: "mountain", Hi: "やま", Kan: "山", Kat: "ヤマ", Ro: ["yama"], level: 5 }, 
  { En: "sea", Hi: "うみ", Kan: "海", Kat: "ウミ", Ro: ["umi"], level: 5 },
  { En: "river", Hi: "かわ", Kan: "川", Kat: "カワ", Ro: ["kawa"], level: 5 }, 
  { En: "forest", Hi: "もり", Kan: "森", Kat: "モリ", Ro: ["mori"], level: 5 }, 
  { En: "sky", Hi: "そら", Kan: "空", Kat: "ソラ", Ro: ["sora"], level: 5 }, 

  // Animals
  { En: "horse", Hi: "うま", Kan: "馬", Kat: "ウマ", Ro: ["uma"], level: 5 }, 
  { En: "cow", Hi: "うし", Kan: "牛", Kat: "ウシ", Ro: ["ushi", "usi"], level: 4 },
  { En: "pig", Hi: "ぶた", Kan: "豚", Kat: "ブタ", Ro: ["buta"], level: 4 },
  { En: "sheep", Hi: "ひつじ", Kan: "羊", Kat: "ヒツジ", Ro: ["hitsuji", "hituzi"], level: 5 }, 
  { En: "chicken", Hi: "にわとり", Kan: "鶏", Kat: "ニワトリ", Ro: ["niwatori"], level: 4 },

  // Daily Life
  { En: "friend", Hi: "ともだち", Kan: "友達", Kat: "トモダチ", Ro: ["tomodachi"], level: 2 }, 
  { En: "work", Hi: "しごと", Kan: "仕事", Kat: "シゴト", Ro: ["shigoto", "sigoto"], level: 2 },
  { En: "money", Hi: "おかね", Kan: "お金", Kat: "オカネ", Ro: ["okane"], level: 1 }, 
  { En: "shop", Hi: "みせ", Kan: "店", Kat: "ミセ", Ro: ["mise"], level: 3 }, 
  { En: "station", Hi: "えき", Kan: "駅", Kat: "エキ", Ro: ["eki"], level: 1 }, 

  // Time
  { En: "morning", Hi: "あさ", Kan: "朝", Kat: "アサ", Ro: ["asa"], level: 2 },
  { En: "afternoon", Hi: "ひる", Kan: "昼", Kat: "ヒル", Ro: ["hiru"], level: 3 },
  { En: "night", Hi: "よる", Kan: "夜", Kat: "ヨル", Ro: ["yoru"], level: 2 },
  { En: "today", Hi: "きょう", Kan: "今日", Kat: "キョウ", Ro: ["kyou", "kyoo"], level: 1 }, 
  { En: "tomorrow", Hi: "あした", Kan: "明日", Kat: "アシタ", Ro: ["ashita", "asita"], level: 1 }, 

  // Technology
  { En: "computer", Hi: "コンピューター", Kan: "コンピューター", Kat: "コンピューター", Ro: ["konpyuutaa", "konpyuutaa"], level: 4 }, 
  { En: "phone", Hi: "でんわ", Kan: "電話", Kat: "デンワ", Ro: ["denwa", "dennwa"], level: 4 }, 
  { En: "camera", Hi: "カメラ", Kan: "カメラ", Kat: "カメラ", Ro: ["kamera"], level: 4 },
  { En: "television", Hi: "テレビ", Kan: "テレビ", Kat: "テレビ", Ro: ["terebi"], level: 4 },
  { En: "music", Hi: "おんがく", Kan: "音楽", Kat: "オンガク", Ro: ["ongaku", "onngaku"], level: 3 },

  // Emotions & Actions
  { En: "happy", Hi: "うれしい", Kan: "嬉しい", Kat: "ウレシイ", Ro: ["ureshii", "uresihi"], level: 3 },
  { En: "sad", Hi: "かなしい", Kan: "悲しい", Kat: "カナシイ", Ro: ["kanashii", "kanasii"], level: 3 },
  { En: "run", Hi: "はしる", Kan: "走る", Kat: "ハシル", Ro: ["hashiru", "hasiru"], level: 3 },
  { En: "walk", Hi: "あるく", Kan: "歩く", Kat: "アルク", Ro: ["aruku"], level: 2 },
  { En: "sleep", Hi: "ねる", Kan: "寝る", Kat: "ネル", Ro: ["neru"], level: 2 },

  // Numbers
  { En: "one", Hi: "いち", Kan: "一", Kat: "イチ", Ro: ["ichi", "iti"], level: 1 },
  { En: "two", Hi: "に", Kan: "二", Kat: "ニ", Ro: ["ni"], level: 1 },
  { En: "three", Hi: "さん", Kan: "三", Kat: "サン", Ro: ["san", "sann"], level: 1 },
  { En: "four", Hi: "よん", Kan: "四", Kat: "ヨン", Ro: ["yon", "yonn", "shi", "si"], level: 1 },
  { En: "five", Hi: "ご", Kan: "五", Kat: "ゴ", Ro: ["go"], level: 1 },
  { En: "six", Hi: "ろく", Kan: "六", Kat: "ロク", Ro: ["roku"], level: 1 },
  { En: "seven", Hi: "なな", Kan: "七", Kat: "ナナ", Ro: ["nana", "shichi", "sithi"], level: 1 },
  { En: "eight", Hi: "はち", Kan: "八", Kat: "ハチ", Ro: ["hachi", "hati"], level: 1 },
  { En: "nine", Hi: "きゅう", Kan: "九", Kat: "キュウ", Ro: ["kyuu", "kyuu", "ku"], level: 1 },
  { En: "ten", Hi: "じゅう", Kan: "十", Kat: "ジュウ", Ro: ["juu", "zyuu"], level: 1 },
];

export function handleRomaji(input: string, outputType: number): string {
    for (const vocab of VOCAB) {
        if (vocab.Ro.includes(input.toLowerCase())) {
            return outputType == 0 ? vocab.En : outputType == 1 ? vocab. Hi : outputType == 2 ? vocab.Kat : outputType == 3 ? vocab.Kan : vocab.En
        }
    }
    return `INVALID ENTRY: ${input}`
}