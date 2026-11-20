// Darija Daba — Structured course, Level A1 (Foundations)
// Lesson page fields: h heading, p paragraphs, v vocab, x examples, t table, d dialogue [speaker,l,a,e], c culture note
const COURSE = [];
const LEVELS = [
  { id: "A1", title: "A1 · Foundations", desc: "Sounds, greetings, numbers, family, food — the essentials." },
  { id: "A2", title: "A2 · Daily Life", desc: "Verbs in all tenses, routines, shopping, travel, home and health." },
  { id: "B1", title: "B1 · Real Conversations", desc: "Opinions, plans, work, social life and how Moroccans really talk." },
];

COURSE.push(
{ id: "a1-01", lvl: "A1", t: "The Sounds of Darija", em: "🗣️", goal: "Understand what Darija is and pronounce the sounds English doesn't have.",
  pages: [
    { h: "What is Darija?", p: [
      "Darija (الدارجة) is the Arabic spoken every day in Morocco by more than 35 million people. It is the language of the family, the street, the market and the café.",
      "It is different from Standard Arabic (al-fus7a), which is used in the news, at school and on official signs. Darija has its own grammar and a lot of words from Amazigh (Berber), French and Spanish.",
      "Darija is mainly a spoken language. When people write it — on WhatsApp, on social media, in ads — they use either Arabic script or Latin letters with numbers, called **Arabizi**. In this course you learn both, so you can speak AND read." ],
      c: "Darija has no official spelling. You'll see mezyan, mzyan and mziane for the same word. Focus on the sound — Moroccans write it many ways too." },
    { h: "Sounds English doesn't have", p: [
      "Most Darija sounds exist in English. A few need practice. Arabizi uses numbers that look like the Arabic letters:",
      "**3** (ع) — squeeze your throat as if lifting something heavy. **7** (ح) — a strong, breathy h, like fogging a mirror. **9** (ق) — a k made deep in the throat. **kh** (خ) — like Scottish 'loch'. **gh** (غ) — a gargled French r. **r** is rolled, like Spanish." ],
      v: [["3in","عين","eye — ع = 3"],["3afak","عافاك","please — ع = 3"],["7lib","حليب","milk — ح = 7"],["sba7","صباح","morning — ح = 7"],["9ahwa","قهوة","coffee — ق = 9"],["9rib","قريب","near — ق = 9"],["khobz","خبز","bread — خ = kh"],["khouya","خويا","my brother — خ = kh"],["ghali","غالي","expensive — غ = gh"],["ghedda","غدا","tomorrow — غ = gh"],["ras","راس","head — rolled r"]] },
    { h: "Heavy consonants", p: [
      "Arabic has 'heavy' (emphatic) versions of s, t, d. Pull your tongue back and make the sound deeper — the vowel next to it sounds darker, like 'o' or 'u'.",
      "s → ṣ (ص), t → ṭ (ط), d → ḍ (ض). Arabizi usually writes them with normal letters, so you learn them from listening." ],
      v: [["sir","سير","go! — light s"],["sba7","صباح","morning — heavy s"],["tlata","تلاتة","three — light t"],["tbib","طبيب","doctor — heavy t"],["dar","دار","house — light d"],["dou","ضو","light — heavy d"]] },
    { h: "Many consonants together", p: [
      "Darija loves clusters: words often start with two or three consonants and short vowels disappear. Say **bzaf**, not 'bazaf'. A tiny vowel slips in naturally — don't force it.",
      "This is the biggest difference from Standard Arabic and the thing that makes Darija sound fast." ],
      v: [["bzaf","بزاف","a lot"],["ktab","كتاب","book"],["mzyan","مزيان","good"],["sghir","صغير","small"],["mchit","مشيت","I went"],["ktebt","كتبت","I wrote"],["dkhelt","دخلت","I entered"],["sme3t","سمعت","I heard"]] },
    { h: "Arabizi cheat sheet", t: [["3","ع","throat squeeze"],["7","ح","breathy h"],["9 / q","ق","deep k"],["2","ء","the stop in 'uh-oh'"],["kh / 5","خ","like 'loch'"],["gh","غ","gargled r"],["ch","ش","sh as in 'shoe'"],["j","ج","s in 'measure'"],["ou","و","oo as in 'food'"]],
      c: "Arabizi follows French spelling habits: 'ch' for sh and 'ou' for oo, because many Moroccans learned French at school." },
  ]},

{ id: "a1-02", lvl: "A1", t: "Greetings Through the Day", em: "👋", goal: "Greet anyone at any time of day, ask how they are and say goodbye.",
  pages: [
    { h: "Greetings are a ritual", p: [
      "In Morocco, greetings are long and warm. People shake hands, close friends kiss on the cheeks, and everyone asks a chain of questions: how are you, how's the family, how's work, all good?",
      "You answer each question with **labas** or **bikhir** and thank God: **l7amdoulillah**. It is normal to go back and forth for twenty seconds before getting to the point. Skipping the greeting feels cold." ],
      v: [["salam ou 3alaykoum","السلام عليكم","Peace be upon you (formal hello)"],["wa 3alaykoum salam","وعليكم السلام","And upon you peace (reply)"],["salam","سلام","Hi"],["sba7 lkhir","صباح الخير","Good morning"],["sba7 nnour","صباح النور","Morning of light (reply)"],["msa lkhir","مسا الخير","Good evening"],["msa nnour","مسا النور","Evening of light (reply)"],["labas?","لاباس؟","All good? / How are you?"],["kif dayr?","كيف داير؟","How are you? (to a man)"],["kif dayra?","كيف دايرة؟","How are you? (to a woman)"],["kif dayrin?","كيف دايرين؟","How are you? (to a group)"],["ach khbarek?","آش خبارك؟","What's your news?"],["bikhir","بخير","Fine / well"],["l7amdoulillah","الحمد لله","Thank God"]] },
    { h: "The question chain", p: ["Here's how a typical chain sounds. Notice that each answer ends with 'l7amdoulillah' and that you ask back with **w nta?** / **w nti?** (and you?)."],
      x: [["labas 3lik?","لاباس عليك؟","How are you?"],["labas, l7amdoulillah. w nta?","لاباس، الحمد لله. و نتا؟","Fine, thank God. And you?"],["kif dayra l3a2ila?","كيف دايرة العائلة؟","How's the family?"],["kolchi bikhir, l7amdoulillah","كلشي بخير، الحمد لله","Everyone's fine, thank God"],["kif dayr m3a lkhedma?","كيف داير مع الخدمة؟","How's work going?"],["ghir l7amdoulillah","غير الحمد لله","All good, thank God"]] },
    { h: "Saying goodbye", v: [["bslama","بسلامة","Goodbye (go in peace)"],["llah ysalmek","الله يسلمك","God keep you safe (reply)"],["nchoufek mn ba3d","نشوفك من بعد","See you later"],["nchoufek ghedda","نشوفك غدا","See you tomorrow"],["tsb7 3la khir","تصبح على خير","Good night"],["w nta mn ahl lkhir","و نتا من أهل الخير","And you too (reply to good night)"],["nhar mabrouk","نهار مبروك","Have a blessed day"],["thalla f rasek","تهلا ف راسك","Take care of yourself"]] },
    { h: "Dialogue: Neighbours in the morning", d: [
      ["Amina","sba7 lkhir a Si Mohammed!","صباح الخير آ سي محمد!","Good morning, Mr Mohammed!"],
      ["Mohammed","sba7 nnour! labas 3lik?","صباح النور! لاباس عليك؟","Good morning! How are you?"],
      ["Amina","labas, l7amdoulillah. w nta, kif dayr?","لاباس، الحمد لله. و نتا، كيف داير؟","Fine, thank God. And you, how are you?"],
      ["Mohammed","bikhir, l7amdoulillah. kif dayrin lwlad?","بخير، الحمد لله. كيف دايرين الولاد؟","Well, thank God. How are the kids?"],
      ["Amina","kolchi bikhir. w lwalida dyalek?","كلشي بخير. و الواليدة ديالك؟","Everyone's fine. And your mother?"],
      ["Mohammed","hiya mezyana, llah y7fdek.","هي مزيانة، الله يحفظك.","She's well, God protect you."],
      ["Amina","yallah, nchoufek mn ba3d.","يالله، نشوفك من بعد.","OK, see you later."],
      ["Mohammed","bslama, nhar mabrouk!","بسلامة، نهار مبروك!","Goodbye, have a blessed day!"]],
      c: "\"Si\" before a man's name and \"Lalla\" before a woman's name are respectful titles, like Mr and Mrs. Use them with older people or people you don't know well." },
  ]},

{ id: "a1-03", lvl: "A1", t: "Introducing Yourself", em: "🙋", goal: "Say who you are, where you're from, where you live and what you do.",
  pages: [
    { h: "No verb 'to be'", p: [
      "Darija has no word for 'am / is / are' in the present. You just put the pronoun before the word: **ana mghribi** = I (am) Moroccan. **hiya ostada** = she (is) a teacher.",
      "Pronouns are short and used a lot. 'You' changes depending on who you talk to." ],
      t: [["ana","أنا","I"],["nta","نتا","you (to a man)"],["nti","نتي","you (to a woman)"],["howa","هو","he"],["hiya","هي","she"],["7na","حنا","we"],["ntouma","نتوما","you (plural)"],["houma","هوما","they"]] },
    { h: "Words about you", v: [["smiti","سميتي","my name"],["chnou smitek?","شنو سميتك؟","What's your name?"],["smitou","سميتو","his name"],["smitha","سميتها","her name"],["mnin?","منين؟","From where?"],["mghribi","مغربي","Moroccan (man)"],["mghribiya","مغربية","Moroccan (woman)"],["ana mn Ingltira","أنا من إنڭلترا","I'm from England"],["ana mn Almanya","أنا من ألمانيا","I'm from Germany"],["saken","ساكن","living (man)"],["sakna","ساكنة","living (woman)"],["talib","طالب","student (man)"],["taliba","طالبة","student (woman)"],["mzewwej","مزوج","married (man)"],["3azeb","عزب","single (man)"],["ana tani","أنا تاني","Me too"]] },
    { h: "Building sentences", p: ["Notice how adjectives and participles add **-a** for a woman: saken → sakna, mghribi → mghribiya."],
      x: [["smiti Lina, ana mn Almanya","سميتي لينا، أنا من ألمانيا","My name is Lina, I'm from Germany"],["howa mghribi, saken f Casa","هو مغربي، ساكن ف كازا","He's Moroccan, he lives in Casablanca"],["hiya sakna f Tanja","هي ساكنة ف طنجة","She lives in Tangier"],["7na mn Kanada","حنا من كندا","We're from Canada"],["chnou smitha? smitha Nora","شنو سميتها؟ سميتها نورا","What's her name? Her name is Nora"],["ana taliba, w nta?","أنا طالبة، و نتا؟","I'm a student (f), and you?"],["3andi khamsa w 3echrin 3am","عندي خمسة و عشرين عام","I'm 25 years old"]] },
    { h: "Dialogue: Language exchange", d: [
      ["Youssef","salam, ana Youssef. w nta, chnou smitek?","سلام، أنا يوسف. و نتا، شنو سميتك؟","Hi, I'm Youssef. And you, what's your name?"],
      ["Tom","ana Tom, metcherfin.","أنا طوم، متشرفين.","I'm Tom, nice to meet you."],
      ["Youssef","metcherfin! mnin nta?","متشرفين! منين نتا؟","Nice to meet you! Where are you from?"],
      ["Tom","ana mn Ingltira, walakin saken f Rbat daba.","أنا من إنڭلترا، ولكن ساكن ف الرباط دابا.","I'm from England, but I live in Rabat now."],
      ["Youssef","mezyan! ach katdir f Rbat?","مزيان! آش كتدير ف الرباط؟","Great! What do you do in Rabat?"],
      ["Tom","kankhdem ostad dyal ngliziya.","كنخدم أستاذ ديال النڭليزية.","I work as an English teacher."],
      ["Youssef","wa3er! w katfhem darija?","واعر! و كتفهم الدارجة؟","Cool! And do you understand Darija?"],
      ["Tom","chwiya, mazal kanet3llem.","شوية، مازال كنتعلم.","A little, I'm still learning."],
      ["Youssef","tbarkllah 3lik, kathder mezyan!","تبارك الله عليك، كتهضر مزيان!","Well done, you speak well!"]],
      c: "Moroccans are thrilled when foreigners speak Darija — even 'chwiya' (a little) earns big smiles. Many will switch to French or English to help you. If you want to practise, say: 'bghit nt3llem darija' (I want to learn Darija)." },
  ]},

{ id: "a1-04", lvl: "A1", t: "Being Polite", em: "🙏", goal: "Use please, thank you, sorry and the little words that keep conversations smooth.",
  pages: [
    { h: "How politeness works", p: [
      "Politeness in Darija is built from a few key words and many blessings. **3afak** (please) literally means 'may God keep you well'. Thanks are often a blessing: **llah y3tik ssa77a** — 'may God give you health'.",
      "Two tiny words do enormous work: **wakha** (OK, agreed) and **safi** (that's it / enough / fine / done)." ],
      v: [["3afak","عافاك","Please (to one person)"],["3afakoum","عافاكم","Please (to a group)"],["choukran","شكرا","Thank you"],["choukran bzaf","شكرا بزاف","Thanks a lot"],["llah y3tik ssa77a","الله يعطيك الصحة","Thank you (God give you health)"],["bla jmil","بلا جميل","You're welcome"],["la choukr 3la wajib","لا شكر على واجب","No need to thank me"],["smeh liya","سمح ليا","Sorry / Excuse me"],["ma3lich","ماعليش","Never mind / It's OK"],["machi mouchkil","ماشي مشكل","No problem"],["la, choukran","لا، شكرا","No, thanks"],["tfeddel","تفضل","Go ahead / Here you are / Come in"],["mmkn?","ممكن؟","Is it possible? / May I?"]] },
    { h: "Wakha and safi in action", x: [["wakha, nchoufek ghedda","واخا، نشوفك غدا","OK, see you tomorrow"],["safi, choukran","صافي، شكرا","That's all, thanks"],["safi? — safi!","صافي؟ — صافي!","OK? — OK!"],["safi, baraka","صافي، باركا","Enough, stop"],["mmkn ndkhel?","ممكن ندخل؟","May I come in?"],["tfeddel, gles","تفضل، ڭلس","Come in, sit down"],["smeh liya, ma fhemtch","سمح ليا، ما فهمتش","Sorry, I didn't understand"]] },
    { h: "Dialogue: Asking a favour", d: [
      ["You","smeh liya, 3afak, mmkn t3awenni?","سمح ليا، عافاك، ممكن تعاوني؟","Excuse me, please, can you help me?"],
      ["Man","tfeddel, chnou bghiti?","تفضل، شنو بغيتي؟","Go ahead, what do you need?"],
      ["You","fin kayna lm7atta dyal ttran?","فين كاينة المحطة ديال التران؟","Where is the train station?"],
      ["Man","qriba, sir nichan w dour 3la limen.","قريبة، سير نيشان و دور على ليمن.","It's close, go straight and turn right."],
      ["You","llah y3tik ssa77a!","الله يعطيك الصحة!","Thank you so much!"],
      ["Man","bla jmil, bslama.","بلا جميل، بسلامة.","You're welcome, goodbye."]],
      c: "Use your right hand to give, receive and eat. Saying 'bismillah' before eating and 'l7amdoulillah' after is very common, even among non-religious people." },
  ]},

{ id: "a1-05", lvl: "A1", t: "Numbers 0–20", em: "🔢", goal: "Count to twenty and count things.",
  pages: [
    { h: "One to ten", v: [["sifr","صفر","0"],["wa7ed","واحد","1"],["jouj","جوج","2"],["tlata","تلاتة","3"],["reb3a","ربعة","4"],["khamsa","خمسة","5"],["setta","ستة","6"],["seb3a","سبعة","7"],["tmenya","تمنية","8"],["tes3a","تسعة","9"],["3achra","عشرة","10"]] },
    { h: "Eleven to twenty", p: ["The teens all end in **-ach** — easy to recognise!"],
      v: [["7dach","حداش","11"],["tnach","طناش","12"],["tlettach","تلطاش","13"],["rbe3tach","ربعطاش","14"],["khmstach","خمسطاش","15"],["settach","سطاش","16"],["sbe3tach","سبعطاش","17"],["tmentach","تمنطاش","18"],["tse3tach","تسعطاش","19"],["3echrin","عشرين","20"]] },
    { h: "Counting things", p: [
      "**1**: use wa7ed + the noun with 'l': **wa7ed lktab** (one book).",
      "**2–10**: number + **d** + plural noun: **jouj d lktoub** (two books), **tlata d lwlad** (three boys).",
      "**11 and above**: number + singular noun, no 'd': **3echrin derhem** (20 dirhams), **khmstach 3am** (15 years)." ],
      x: [["wa7ed lktab","واحد الكتاب","one book"],["jouj d lktoub","جوج د الكتوب","two books"],["tlata d lwlad","تلاتة د الولاد","three boys"],["khamsa d lbnat","خمسة د البنات","five girls"],["3achra d dqayq","عشرة د الدقايق","ten minutes"],["khmstach derhem","خمسطاش درهم","fifteen dirhams"],["3andi jouj d khout","عندي جوج د الخوت","I have two siblings"]] },
    { h: "Arabic digits", p: ["Morocco mostly uses the digits you know (1, 2, 3), but you'll see Eastern Arabic digits on some signs, clocks and religious texts."],
      t: [["0","٠","sifr"],["1","١","wa7ed"],["2","٢","jouj"],["3","٣","tlata"],["4","٤","reb3a"],["5","٥","khamsa"],["6","٦","setta"],["7","٧","seb3a"],["8","٨","tmenya"],["9","٩","tes3a"]],
      c: "Fun fact: the digits used in Europe are historically called 'Arabic numerals' — they reached Europe through North Africa and Spain." },
  ]},

{ id: "a1-06", lvl: "A1", t: "Big Numbers & Money", em: "💰", goal: "Understand prices, the dirham and the famous 'ryal' system.",
  pages: [
    { h: "Tens and hundreds", v: [["3echrin","عشرين","20"],["tlatin","تلاتين","30"],["rb3in","ربعين","40"],["khamsin","خمسين","50"],["settin","ستين","60"],["sb3in","سبعين","70"],["tmanin","تمانين","80"],["tes3in","تسعين","90"],["mya","مية","100"],["mitin","ميتين","200"],["tlt mya","تلت مية","300"],["khams mya","خمس مية","500"],["alf","ألف","1000"],["alfin","ألفين","2000"]],
      p: ["To make 21, 35 etc. say the unit first: **wa7ed w 3echrin** (21), **khamsa w tlatin** (35) — like 'one and twenty'."] },
    { h: "Dirhams and ryals", p: [
      "The currency is the dirham (**derhem**, plural **drahem**). 1 dirham = 100 centimes.",
      "But many Moroccans — especially in markets and with older people — count in **ryal**: 1 dirham = 20 ryal. So **mya ryal** (100 ryal) = 5 dirhams, and **alf ryal** = 50 dirhams. If a price sounds crazy high, it's probably in ryal!" ],
      x: [["ch7al hada? — 3echrin derhem","شحال هادا؟ — عشرين درهم","How much is this? — 20 dirhams"],["khamsa w tlatin derhem","خمسة و تلاتين درهم","35 dirhams"],["mya w khamsin derhem","مية و خمسين درهم","150 dirhams"],["mya ryal","مية ريال","100 ryal = 5 dirhams"],["alf ryal","ألف ريال","1000 ryal = 50 dirhams"],["3andek ssrf?","عندك الصرف؟","Do you have change?"],["ma 3andich ssrf","ما عنديش الصرف","I don't have change"]] },
    { h: "Dialogue: At the fruit stall", d: [
      ["You","salam, b ch7al llimoun?","سلام، بشحال الليمون؟","Hi, how much are the oranges?"],
      ["Seller","tmenya drahem lkilo.","تمنية دراهم الكيلو.","Eight dirhams a kilo."],
      ["You","3tini jouj kilo 3afak.","عطيني جوج كيلو عافاك.","Give me two kilos, please."],
      ["Seller","hak. chi 7aja khra?","هاك. شي حاجة خرا؟","Here. Anything else?"],
      ["You","iyeh, nss kilo d lbanan.","إيه، نص كيلو د البنان.","Yes, half a kilo of bananas."],
      ["Seller","kolchi b 3echrin derhem.","كلشي بعشرين درهم.","All together 20 dirhams."],
      ["You","hak khamsin.","هاك خمسين.","Here's fifty."],
      ["Seller","w hak ssrf, tlatin. bssa77a!","و هاك الصرف، تلاتين. بالصحة!","And here's your change, thirty. Enjoy!"]],
      c: "Learner trap: in Darija **limoun** means ORANGE, and a lemon is **l7amed**. Order 'atay b limoun' and you may get something unexpected!" },
  ]},

{ id: "a1-07", lvl: "A1", t: "This, That & There Is", em: "👉", goal: "Point at things, ask what they are and say what exists.",
  pages: [
    { h: "This and that", p: ["Darija has words for 'this' and 'that' that change for masculine, feminine and plural. Before a noun with 'the', use the short form **had**: had ddar (this house)."],
      t: [["hada","هادا","this (m)"],["hadi","هادي","this (f)"],["hadou","هادو","these"],["dak","داك","that (m)"],["dik","ديك","that (f)"],["dok","دوك","those"],["had","هاد","this (before a noun)"]] },
    { h: "There is / there are", p: ["**kayn** (m), **kayna** (f), **kaynin** (plural). Negative: **ma kaynch**. Ask with **wach**: wach kayn...? (Is there...?)"],
      v: [["ktab","كتاب","book"],["stylo","ستيلو","pen"],["tomobil","طوموبيل","car"],["kas","كاس","glass"],["tabla","طابلة","table"],["kursi","كرسي","chair"],["bab","باب","door"],["sarout","ساروت","key"],["tilifoun","تيليفون","phone"],["sak","صاك","bag"],["wer9a","ورقة","paper / sheet"]] },
    { h: "Examples", x: [["chnou hada? — hada ktab","شنو هادا؟ — هادا كتاب","What's this? — It's a book"],["hadi tomobil dyali","هادي طوموبيل ديالي","This is my car"],["wach hada dyalek?","واش هادا ديالك؟","Is this yours?"],["dak rrajel howa lmoudir","داك الراجل هو المدير","That man is the manager"],["wach kayn chi taxi hna?","واش كاين شي طاكسي هنا؟","Is there a taxi here?"],["ma kayn walou","ما كاين والو","There's nothing"],["kaynin bzaf d nnas f souq","كاينين بزاف د الناس ف السوق","There are lots of people at the market"],["had lkas khawi","هاد الكاس خاوي","This glass is empty"]] },
    { h: "Dialogue: The new flat", d: [
      ["Guest","chnou hada?","شنو هادا؟","What's this?"],
      ["Host","hada lbit dyalek.","هادا البيت ديالك.","This is your room."],
      ["Guest","zwin! w hadi?","زوين! و هادي؟","Nice! And this?"],
      ["Host","hadi lkouzina. kayn lfrigo w lfour.","هادي الكوزينة. كاين الفريڭو و الفور.","This is the kitchen. There's a fridge and an oven."],
      ["Guest","wach kayn lwifi?","واش كاين الويفي؟","Is there wifi?"],
      ["Host","iyeh, kayn. lcode mktoub 3la lbab.","إيه، كاين. الكود مكتوب على الباب.","Yes. The code is written on the door."],
      ["Guest","mezyan, choukran bzaf!","مزيان، شكرا بزاف!","Great, thanks a lot!"]],
      c: "\"chi\" means 'some / any': chi taxi (a taxi, any taxi), chi 7aja (something). It's one of the most useful words in Darija." },
  ]},

{ id: "a1-08", lvl: "A1", t: "Family & My, Your, His", em: "👨‍👩‍👧", goal: "Talk about your family and use possessive endings.",
  pages: [
    { h: "Possessive endings", p: ["To say 'my, your, his...' add an ending to the noun. After a vowel the endings change slightly (khou → khouya, my brother). You can also use **dyal** (of): ddar dyali = my house."],
      t: [["dari","داري","my house"],["darek","دارك","your house"],["darou","دارو","his house"],["darha","دارها","her house"],["darna","دارنا","our house"],["darkoum","داركم","your (pl) house"],["darhoum","دارهم","their house"]] },
    { h: "Family words", v: [["l3a2ila","العائلة","the family"],["lwalidin","الواليدين","parents"],["bba","بّا","dad"],["mmi","مّي","mom"],["khouya","خويا","my brother"],["khti","ختي","my sister"],["lkhout","الخوت","siblings / brothers"],["lwlad","الولاد","children / boys"],["lbnat","البنات","girls / daughters"],["jeddi","جدي","my grandfather"],["jeddti","جدتي","my grandmother"],["3ammi","عمي","uncle (father's side)"],["3amti","عمتي","aunt (father's side)"],["khali","خالي","uncle (mother's side)"],["khalti","خالتي","aunt (mother's side)"],["wld 3ammi","ولد عمي","my cousin"],["nsibi","نسيبي","my brother-in-law"]] },
    { h: "Examples", x: [["hada khouya Karim","هادا خويا كريم","This is my brother Karim"],["hadi khti sghira","هادي ختي الصغيرة","This is my little sister"],["3andi khouya wa7ed w jouj d khwatat","عندي خويا واحد و جوج د الخواتات","I have one brother and two sisters"],["bba khddam f banka","بّا خدام ف بانكا","My dad works in a bank"],["jeddti sakna m3ana","جدتي ساكنة معانا","My grandmother lives with us"],["ch7al 3andek d lwlad?","شحال عندك د الولاد؟","How many children do you have?"],["ddar dyal jeddi kbira","الدار ديال جدي كبيرة","My grandfather's house is big"]] },
    { h: "Dialogue: Family photos", d: [
      ["Sara","chkoun hadi f tteswira?","شكون هادي ف التصويرة؟","Who's this in the photo?"],
      ["Hind","hadi khti Salma, w hada rajelha.","هادي ختي سلمى، و هادا راجلها.","This is my sister Salma, and this is her husband."],
      ["Sara","w had lwlad?","و هاد الولاد؟","And these children?"],
      ["Hind","houma wlad khti. ana khalthoum!","هوما ولاد ختي. أنا خالتهم!","They're my sister's kids. I'm their aunt!"],
      ["Sara","mach2allah, zwinin bzaf!","ما شاء الله، زوينين بزاف!","How lovely, they're so cute!"],
      ["Hind","llah ykhallik.","الله يخليك.","Thank you (God keep you)."]],
      c: "Family is the centre of Moroccan life. Many people live with or near their extended family, and Friday couscous with everyone together is a strong tradition. Say 'mach2allah' when complimenting children — it protects against the evil eye." },
  ]},

{ id: "a1-09", lvl: "A1", t: "Food & \"I Want\"", em: "🍞", goal: "Name everyday foods and say what you want.",
  pages: [
    { h: "The verb 'want'", p: ["**bghit** means 'I want' (and also 'I wanted'). It's the easiest way to order anything. Add a verb after it: bghit nakol (I want to eat), bghit nchreb (I want to drink)."],
      t: [["bghit","بغيت","I want"],["bghiti","بغيتي","you want"],["bgha","بغا","he wants"],["bghat","بغات","she wants"],["bghina","بغينا","we want"],["bghitou","بغيتو","you (pl) want"],["bghaw","بغاو","they want"],["ma bghitch","ما بغيتش","I don't want"]] },
    { h: "Breakfast & basics", v: [["khobz","خبز","bread"],["zit","زيت","oil (olive oil)"],["zitoun","زيتون","olives"],["jben","جبن","cheese"],["bid","بيض","eggs"],["l3sel","العسل","honey"],["zebda","زبدة","butter"],["msemmen","مسمن","flaky square pancake"],["baghrir","بغرير","'thousand-hole' pancake"],["atay","أتاي","mint tea"],["9ahwa","قهوة","coffee"],["7lib","حليب","milk"],["3asir","عصير","juice"],["lftour","الفطور","breakfast"],["lghda","الغدا","lunch"],["l3cha","العشا","dinner"]] },
    { h: "Examples", x: [["bghit atay b n3na3","بغيت أتاي بالنعناع","I want mint tea"],["bghiti 9ahwa?","بغيتي قهوة؟","Do you want coffee?"],["chnou bghiti takol?","شنو بغيتي تاكل؟","What do you want to eat?"],["bghit bid w khobz","بغيت بيض و خبز","I want eggs and bread"],["ma bghitch sokkar","ما بغيتش السكر","I don't want sugar"],["3tini 3asir dyal llimoun","عطيني عصير ديال الليمون","Give me an orange juice"],["chkoun bgha atay?","شكون بغا أتاي؟","Who wants tea?"]] },
    { h: "Dialogue: Breakfast at home", d: [
      ["Mom","yallah, lftour wajed!","يالله، الفطور واجد!","Come on, breakfast is ready!"],
      ["Rayan","chnou kayn lyoum?","شنو كاين اليوم؟","What is there today?"],
      ["Mom","kayn lmsemmen, zit w l3sel.","كاين المسمن، الزيت و العسل.","There's msemmen, oil and honey."],
      ["Rayan","bghit atay 3afak.","بغيت أتاي عافاك.","I'd like tea, please."],
      ["Mom","hak. bssa77a.","هاك. بالصحة.","Here. Enjoy."],
      ["Rayan","llah y3tik ssa77a a mmi.","الله يعطيك الصحة آ مّي.","Thanks, Mom."]],
      c: "Moroccan tea is green tea with fresh mint and plenty of sugar, poured from high up to make a foam on top. Refusing tea from a host can seem rude — accept at least one glass." },
  ]},

{ id: "a1-10", lvl: "A1", t: "Days & Telling Time", em: "⏰", goal: "Name the days, talk about today and tomorrow, and tell the time.",
  pages: [
    { h: "Days and time words", v: [["l7ed","الحد","Sunday"],["letnin","الاتنين","Monday"],["tlat","التلات","Tuesday"],["larb3","الاربع","Wednesday"],["lkhmis","الخميس","Thursday"],["jjem3a","الجمعة","Friday"],["ssebt","السبت","Saturday"],["lyoum","اليوم","today"],["ghedda","غدا","tomorrow"],["ba3d ghedda","بعد غدا","the day after tomorrow"],["lbare7","البارح","yesterday"],["wal bare7","ول البارح","the day before yesterday"],["sa3a","ساعة","hour / watch"],["d9i9a","دقيقة","minute"],["bekri","بكري","early"],["m3ettel","معطل","late"]] },
    { h: "Telling the time", p: [
      "Ask: **ch7al f sa3a?** Answer with **hadi** + the hour: hadi l3achra (it's ten).",
      "Darija divides the hour in a special way: **w rb3** (and a quarter), **w tlt** (and a third = 20 minutes!), **w nss** (and a half), **qell rb3** (minus a quarter). 'At' a time is **m3a**." ],
      x: [["ch7al f sa3a?","شحال ف الساعة؟","What time is it?"],["hadi l3achra w rb3","هادي العشرة و ربع","It's 10:15"],["hadi l3achra w tlt","هادي العشرة و تلت","It's 10:20"],["hadi jouj w nss","هادي جوج و نص","It's 2:30"],["hadi tlata qell rb3","هادي تلاتة قل ربع","It's 2:45"],["hadi lwe7da","هادي الوحدة","It's one o'clock"],["ntla9aw m3a seb3a","نتلاقاو مع السبعة","Let's meet at seven"],["ghedda nhar ssebt","غدا نهار السبت","Tomorrow is Saturday"]] },
    { h: "Dialogue: Running late", d: [
      ["Anas","ch7al f sa3a 3afak?","شحال ف الساعة عافاك؟","What time is it, please?"],
      ["Woman","hadi seb3a w nss.","هادي سبعة و نص.","It's half past seven."],
      ["Anas","wa, ana m3ettel! ttran m3a tmenya.","وا، أنا معطل! التران مع التمنية.","Oh no, I'm late! The train is at eight."],
      ["Woman","ma tkhafch, ba9i lwe9t.","ما تخافش، باقي الوقت.","Don't worry, there's still time."],
      ["Anas","wach lm7atta b3ida?","واش المحطة بعيدة؟","Is the station far?"],
      ["Woman","la, 3achra d dqayq 3la rjlik.","لا، عشرة د الدقايق على رجليك.","No, ten minutes on foot."]],
      c: "Time in Morocco is flexible. 'Daba' (now) can mean in five minutes or in an hour! For anything important, confirm the exact time — and expect a relaxed approach to punctuality socially." },
  ]},

{ id: "a1-11", lvl: "A1", t: "Asking Questions", em: "❓", goal: "Ask who, what, where, when, why, how and how much.",
  pages: [
    { h: "Question words", t: [["chnou? / ach?","شنو؟ / آش؟","what?"],["chkoun?","شكون؟","who?"],["fin?","فين؟","where?"],["mnin?","منين؟","from where?"],["fou9ach? / imta?","فوقاش؟ / إمتى؟","when?"],["3lach?","علاش؟","why?"],["7it","حيت","because"],["kifach?","كيفاش؟","how?"],["ch7al?","شحال؟","how much / how many?"],["achmen?","أشمن؟","which?"],["wach?","واش؟","yes/no question word"]],
      p: ["Yes/no questions start with **wach**: nta mghribi (you're Moroccan) → **wach nta mghribi?** (are you Moroccan?). The answer to 3lach (why) starts with **7it** (because)."] },
    { h: "Examples", x: [["fin kayna ttwalit?","فين كاينة الطواليط؟","Where is the toilet?"],["chkoun hada?","شكون هادا؟","Who is this?"],["3lach nta m9elle9?","علاش نتا مقلق؟","Why are you upset?"],["fou9ach ghadi tji?","فوقاش غادي تجي؟","When are you coming?"],["kifach kangoulou 'thank you' b darija?","كيفاش كنڭولو thank you بالدارجة؟","How do we say 'thank you' in Darija?"],["ch7al d nnas?","شحال د الناس؟","How many people?"],["achmen wa7ed bghiti?","أشمن واحد بغيتي؟","Which one do you want?"],["mnin jiti?","منين جيتي؟","Where did you come from?"]] },
    { h: "Dialogue: A curious kid", d: [
      ["Kid","chkoun nta?","شكون نتا؟","Who are you?"],
      ["You","ana sa7b bbak.","أنا صاحب بّاك.","I'm your dad's friend."],
      ["Kid","mnin nta?","منين نتا؟","Where are you from?"],
      ["You","mn Kanada.","من كندا.","From Canada."],
      ["Kid","3lach jiti l lmghrib?","علاش جيتي للمغرب؟","Why did you come to Morocco?"],
      ["You","7it kanbghi lmghrib bzaf!","حيت كنبغي المغرب بزاف!","Because I love Morocco!"],
      ["Kid","wach katakol lkesksou?","واش كتاكل الكسكس؟","Do you eat couscous?"],
      ["You","iyeh, kanmout 3lih!","إيه، كنموت عليه!","Yes, I'm crazy about it!"]],
      c: "'kanmout 3lih' literally means 'I die for it' — Moroccans use it to say they love something." },
  ]},

{ id: "a1-12", lvl: "A1", t: "Describing Things", em: "🎨", goal: "Use adjectives, colours and comparisons.",
  pages: [
    { h: "Adjectives agree", p: ["Adjectives come AFTER the noun. Add **-a** for feminine. Plurals vary: kbir → kbar, jdid → jdad, zwin → zwinin. Many adjectives have a special comparative form: kbir → **kbar mn** (bigger than)."],
      t: [["kbir / kbira / kbar","كبير / كبيرة / كبار","big (m / f / pl)"],["sghir / sghira / sghar","صغير / صغيرة / صغار","small"],["jdid / jdida / jdad","جديد / جديدة / جداد","new"],["kbar mn","كبر من","bigger than"],["sghar mn","صغر من","smaller than"],["7sen mn","حسن من","better than"],["ktar mn","كتر من","more than"],["qell mn","قل من","less than"]] },
    { h: "Useful adjectives", v: [["twil","طويل","tall / long"],["qsir","قصير","short"],["skhoun","سخون","hot"],["bared","بارد","cold"],["ghali","غالي","expensive"],["rkhis","رخيص","cheap"],["sahel","ساهل","easy"],["s3ib","صعيب","difficult"],["nqi","نقي","clean"],["mwessekh","موسخ","dirty"],["khfif","خفيف","light"],["t9il","تقيل","heavy"],["k7el","كحل","black"],["byed","بيض","white"],["7mer","حمر","red"],["zre9","زرق","blue"]] },
    { h: "Examples", x: [["ddar dyali sghira walakin zwina","الدار ديالي صغيرة ولكن زوينة","My house is small but pretty"],["Casa kbar mn Rbat","كازا كبر من الرباط","Casablanca is bigger than Rabat"],["f rayi, atay 7sen mn l9ahwa","ف رايي، أتاي حسن من القهوة","In my opinion, tea is better than coffee"],["darija machi s3iba bzaf","الدارجة ماشي صعيبة بزاف","Darija isn't very difficult"],["had lqamija ghalya bzaf","هاد القاميجة غالية بزاف","This shirt is too expensive"],["sebbat k7el jdid","صباط كحل جديد","new black shoes"]] },
    { h: "Dialogue: Buying a bag", d: [
      ["You","bghit chi sak k7el.","بغيت شي صاك كحل.","I want a black bag."],
      ["Seller","hada zwin, w jdid.","هادا زوين، و جديد.","This one's nice, and new."],
      ["You","kbir bzaf. 3andek chi wa7ed sghar?","كبير بزاف. عندك شي واحد صغر؟","Too big. Do you have a smaller one?"],
      ["Seller","hada sghar, walakin 7mer.","هادا صغر، ولكن حمر.","This one's smaller, but it's red."],
      ["You","la, bghit k7el.","لا، بغيت كحل.","No, I want black."],
      ["Seller","safi, hada k7el w sghir.","صافي، هادا كحل و صغير.","OK, this one is black and small."],
      ["You","hayel! ch7al?","هايل! شحال؟","Perfect! How much?"]],
      c: "Colours follow a pattern: k7el (black) → ka7la (f), byed → bida, 7mer → 7amra, zre9 → zar9a. Learn the masculine and the feminine comes naturally." },
  ]}
);
