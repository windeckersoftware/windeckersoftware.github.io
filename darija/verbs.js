// Darija Daba — Verb conjugation tables and pronunciation guide.
// Strong verbs give consonant skeleton `a`; Arabic forms are built from it.
// Irregular verbs give explicit Arabic (pA, sA, iA).
// past: ana nta/nti howa hiya 7na ntouma houma (7)
// subj: ana nta nti howa hiya 7na ntouma houma (8)  -> present = ka + subj, future = ghadi + subj
// imp:  to a man, to a woman, to a group
const VERBS = [
  { l: "kteb", e: "write", a: "كتب", past: "ktebt ktebti kteb ketbat ktebna ktebtou ketbou", subj: "nkteb tkteb tktbi ykteb tkteb nktbou tktbou yktbou", imp: "kteb ktbi ktbou" },
  { l: "fhem", e: "understand", a: "فهم", past: "fhemt fhemti fhem fehmat fhemna fhemtou fehmou", subj: "nfhem tfhem tfehmi yfhem tfhem nfehmou tfehmou yfehmou", imp: "fhem fehmi fehmou" },
  { l: "khdem", e: "work", a: "خدم", past: "khdemt khdemti khdem khedmat khdemna khdemtou khedmou", subj: "nkhdem tkhdem tkhedmi ykhdem tkhdem nkhedmou tkhedmou ykhedmou", imp: "khdem khedmi khedmou" },
  { l: "chreb", e: "drink", a: "شرب", past: "chrebt chrebti chreb cherbat chrebna chrebtou cherbou", subj: "nchreb tchreb tcherbi ychreb tchreb ncherbou tcherbou ycherbou", imp: "chreb cherbi cherbou" },
  { l: "dkhel", e: "enter / come in", a: "دخل", past: "dkhelt dkhelti dkhel dekhlat dkhelna dkheltou dekhlou", subj: "ndkhel tdkhel tdekhli ydkhel tdkhel ndekhlou tdekhlou ydekhlou", imp: "dkhol dekhli dekhlou" },
  { l: "khrej", e: "go out / leave", a: "خرج", past: "khrejt khrejti khrej khrjat khrejna khrejtou khrjou", subj: "nkhrej tkhrej tkhrji ykhrej tkhrej nkhrjou tkhrjou ykhrjou", imp: "khrej khrji khrjou" },
  { l: "rje3", e: "come back / return", a: "رجع", past: "rje3t rje3ti rje3 rej3at rje3na rje3tou rej3ou", subj: "nrje3 trje3 trej3i yrje3 trje3 nrej3ou trej3ou yrej3ou", imp: "rje3 rej3i rej3ou" },
  { l: "sken", e: "live (somewhere)", a: "سكن", past: "skent skenti sken seknat skenna skentou seknou", subj: "nsken tsken tsekni ysken tsken nseknou tseknou yseknou", imp: "sken sekni seknou" },
  { l: "l3eb", e: "play", a: "لعب", past: "l3ebt l3ebti l3eb le3bat l3ebna l3ebtou le3bou", subj: "nl3eb tl3eb tle3bi yl3eb tl3eb nle3bou tle3bou yle3bou", imp: "l3eb le3bi le3bou" },
  { l: "gles", e: "sit", a: "ڭلس", past: "glest glesti gles gelsat glesna glestou gelsou", subj: "ngles tgles tgelsi ygles tgles ngelsou tgelsou ygelsou", imp: "gles gelsi gelsou" },
  { l: "n3es", e: "sleep", a: "نعس", past: "n3est n3esti n3es ne3sat n3esna n3estou ne3sou", subj: "nn3es tn3es tne3si yn3es tn3es nne3sou tne3sou yne3sou", imp: "n3es ne3si ne3sou" },
  { l: "3ref", e: "know", a: "عرف", past: "3reft 3refti 3ref 3erfat 3refna 3reftou 3erfou", subj: "n3ref t3ref t3erfi y3ref t3ref n3erfou t3erfou y3erfou", imp: "3ref 3erfi 3erfou" },
  { l: "hder", e: "speak / talk", a: "هضر", past: "hdert hderti hder hedrat hderna hdertou hedrou", subj: "nhder thder thedri yhder thder nhedrou thedrou yhedrou", imp: "hder hedri hedrou" },
  { l: "sme3", e: "hear / listen", a: "سمع", past: "sme3t sme3ti sme3 sem3at sme3na sme3tou sem3ou", subj: "nsme3 tsme3 tsem3i ysme3 tsme3 nsem3ou tsem3ou ysem3ou", imp: "sme3 sem3i sem3ou" },
  { l: "safer", e: "travel", a: "سافر", past: "safert saferti safer safrat saferna safertou safrou", subj: "nsafer tsafer tsafri ysafer tsafer nsafrou tsafrou ysafrou", imp: "safer safri safrou" },
  { l: "teyyeb", e: "cook", a: "طيب", past: "teyyebt teyyebti teyyeb teyybat teyyebna teyyebtou teyybou", subj: "nteyyeb tteyyeb tteyybi yteyyeb tteyyeb nteyybou tteyybou yteyybou", imp: "teyyeb teyybi teyybou" },
  { l: "khelles", e: "pay", a: "خلص", past: "khellest khellesti khelles khellsat khellesna khellestou khellsou", subj: "nkhelles tkhelles tkhellsi ykhelles tkhelles nkhellsou tkhellsou ykhellsou", imp: "khelles khellsi khellsou" },
  { l: "t3llem", e: "learn", a: "تعلم", past: "t3llemt t3llemti t3llem t3elmat t3llemna t3llemtou t3elmou", subj: "nt3llem tt3llem tt3elmi yt3llem tt3llem nt3elmou tt3elmou yt3elmou", imp: "t3llem t3elmi t3elmou" },
  { l: "kla", e: "eat", past: "klit kliti kla klat klina klitou klaw", subj: "nakol takol takli yakol takol naklou taklou yaklou", imp: "koul kouli koulou",
    pA: "كليت كليتي كلا كلات كلينا كليتو كلاو", sA: "ناكل تاكل تاكلي ياكل تاكل ناكلو تاكلو ياكلو", iA: "كول كولي كولو" },
  { l: "khda", e: "take", past: "khdit khditi khda khdat khdina khditou khdaw", subj: "nakhod takhod takhdi yakhod takhod nakhdou takhdou yakhdou", imp: "khoud khoudi khoudou",
    pA: "خديت خديتي خدا خدات خدينا خديتو خداو", sA: "ناخد تاخد تاخدي ياخد تاخد ناخدو تاخدو ياخدو", iA: "خود خودي خودو" },
  { l: "mcha", e: "go", past: "mchit mchiti mcha mchat mchina mchitou mchaw", subj: "nmchi tmchi tmchi ymchi tmchi nmchiw tmchiw ymchiw", imp: "sir siri siro",
    pA: "مشيت مشيتي مشى مشات مشينا مشيتو مشاو", sA: "نمشي تمشي تمشي يمشي تمشي نمشيو تمشيو يمشيو", iA: "سير سيري سيرو" },
  { l: "ja", e: "come", past: "jit jiti ja jat jina jitou jaw", subj: "nji tji tji yji tji njiw tjiw yjiw", imp: "aji aji ajiw",
    pA: "جيت جيتي جا جات جينا جيتو جاو", sA: "نجي تجي تجي يجي تجي نجيو تجيو يجيو", iA: "أجي أجي أجيو" },
  { l: "qra", e: "read / study", past: "qrit qriti qra qrat qrina qritou qraw", subj: "nqra tqra tqray yqra tqra nqraw tqraw yqraw", imp: "qra qray qraw",
    pA: "قريت قريتي قرا قرات قرينا قريتو قراو", sA: "نقرا تقرا تقراي يقرا تقرا نقراو تقراو يقراو", iA: "قرا قراي قراو" },
  { l: "chra", e: "buy", past: "chrit chriti chra chrat chrina chritou chraw", subj: "nchri tchri tchri ychri tchri nchriw tchriw ychriw", imp: "chri chri chriw",
    pA: "شريت شريتي شرا شرات شرينا شريتو شراو", sA: "نشري تشري تشري يشري تشري نشريو تشريو يشريو", iA: "شري شري شريو" },
  { l: "bgha", e: "want / like", past: "bghit bghiti bgha bghat bghina bghitou bghaw", subj: "nbghi tbghi tbghi ybghi tbghi nbghiw tbghiw ybghiw", imp: "",
    pA: "بغيت بغيتي بغا بغات بغينا بغيتو بغاو", sA: "نبغي تبغي تبغي يبغي تبغي نبغيو تبغيو يبغيو", iA: "" },
  { l: "nsa", e: "forget", past: "nsit nsiti nsa nsat nsina nsitou nsaw", subj: "nnsa tnsa tnsay ynsa tnsa nnsaw tnsaw ynsaw", imp: "nsa nsay nsaw",
    pA: "نسيت نسيتي نسى نسات نسينا نسيتو نساو", sA: "ننسى تنسى تنساي ينسى تنسى ننساو تنساو ينساو", iA: "نسى نساي نساو" },
  { l: "chaf", e: "see / look", past: "cheft chefti chaf chafet chefna cheftou chafou", subj: "nchouf tchouf tchoufi ychouf tchouf nchoufou tchoufou ychoufou", imp: "chouf choufi choufou",
    pA: "شفت شفتي شاف شافت شفنا شفتو شافو", sA: "نشوف تشوف تشوفي يشوف تشوف نشوفو تشوفو يشوفو", iA: "شوف شوفي شوفو" },
  { l: "dar", e: "do / make", past: "dert derti dar daret derna dertou darou", subj: "ndir tdir tdiri ydir tdir ndirou tdirou ydirou", imp: "dir diri dirou",
    pA: "درت درتي دار دارت درنا درتو دارو", sA: "ندير تدير تديري يدير تدير نديرو تديرو يديرو", iA: "دير ديري ديرو" },
  { l: "gal", e: "say / tell", past: "gult gulti gal galet gulna gultou galou", subj: "ngoul tgoul tgouli ygoul tgoul ngoulou tgoulou ygoulou", imp: "goul gouli goulou",
    pA: "ڭلت ڭلتي ڭال ڭالت ڭلنا ڭلتو ڭالو", sA: "نڭول تڭول تڭولي يڭول تڭول نڭولو تڭولو يڭولو", iA: "ڭول ڭولي ڭولو" },
  { l: "3ta", e: "give", past: "3tit 3titi 3ta 3tat 3tina 3titou 3taw", subj: "n3ti t3ti t3ti y3ti t3ti n3tiw t3tiw y3tiw", imp: "3ti 3ti 3tiw",
    pA: "عطيت عطيتي عطا عطات عطينا عطيتو عطاو", sA: "نعطي تعطي تعطي يعطي تعطي نعطيو تعطيو يعطيو", iA: "عطي عطي عطيو" },
];
const PRON = [["ana", "أنا", "I"], ["nta", "نتا", "you (m)"], ["nti", "نتي", "you (f)"], ["howa", "هو", "he"], ["hiya", "هي", "she"], ["7na", "حنا", "we"], ["ntouma", "نتوما", "you (pl)"], ["houma", "هوما", "they"]];

// Build full tables for a verb: { present, past, future, negPresent, negPast, imperative } each = [[pronoun, latin, arabic, english]]
function conjugate(v) {
  const sp = s => s ? s.split(" ") : [];
  const A = v.a;
  const pastL = sp(v.past), subjL = sp(v.subj), impL = sp(v.imp);
  const pastA = v.pA ? sp(v.pA) : [A + "ت", A + "تي", A, A + "ات", A + "نا", A + "تو", A + "و"];
  const subjA = v.sA ? sp(v.sA) : ["ن" + A, "ت" + A, "ت" + A + "ي", "ي" + A, "ت" + A, "ن" + A + "و", "ت" + A + "و", "ي" + A + "و"];
  const impA = v.iA !== undefined ? sp(v.iA) : [A, A + "ي", A + "و"];
  const pIdx = [0, 1, 1, 2, 3, 4, 5, 6]; // past has one form for nta/nti
  const out = { present: [], past: [], future: [], negPresent: [], negPast: [], imperative: [] };
  PRON.forEach((p, i) => {
    const s = subjL[i], sa = subjA[i], pl = pastL[pIdx[i]], pa = pastA[pIdx[i]];
    out.present.push([p, "ka" + s, "ك" + sa, `${p[2]} — ${v.e} (present)`]);
    out.past.push([p, pl, pa, `${p[2]} — ${v.e} (past)`]);
    out.future.push([p, "ghadi " + s, "غادي " + sa, `${p[2]} will ${v.e}`]);
    out.negPresent.push([p, "ma ka" + s + "ch", "ما ك" + sa + "ش", `${p[2]} — don't ${v.e}`]);
    out.negPast.push([p, "ma " + pl + "ch", "ما " + pa + "ش", `${p[2]} — didn't ${v.e}`]);
  });
  const ip = [["to a man", "nta"], ["to a woman", "nti"], ["to a group", "ntouma"]];
  impL.forEach((f, i) => out.imperative.push([[ip[i][1], "", ip[i][0]], f + "!", impA[i] + "!", `${v.e}! (${ip[i][0]})`]));
  return out;
}

// Pronunciation guide: sound by sound
const SOUNDS = [
  { s: "3", a: "ع", n: "The 3ayn — throat squeeze", how: "Tighten the muscles deep in your throat, as if lifting something heavy, and let a voiced sound pass. It has no English equivalent; it often colours the vowel next to it.", ex: [["3in","عين","eye"],["3afak","عافاك","please"],["sa3a","ساعة","hour"]] },
  { s: "7", a: "ح", n: "Breathy h", how: "Like breathing hard on a window to fog it, with more friction in the throat. Stronger than English h, but no scraping like kh.", ex: [["7lib","حليب","milk"],["sba7","صباح","morning"],["l7em","اللحم","meat"]] },
  { s: "9 / q", a: "ق", n: "Deep k", how: "A k made far back, where you swallow. In rural and southern speech it often becomes a hard g (gal instead of qal).", ex: [["9ahwa","قهوة","coffee"],["9rib","قريب","near"],["souq","سوق","market"]] },
  { s: "kh", a: "خ", n: "Scraped kh", how: "Like Scottish 'loch' or German 'Bach' — air scrapes against the back of the mouth. Sometimes written 5 in Arabizi.", ex: [["khobz","خبز","bread"],["khouya","خويا","my brother"],["mokh","مخ","brain"]] },
  { s: "gh", a: "غ", n: "Gargled r", how: "The voiced partner of kh: like a French or German r, gargled at the back of the throat.", ex: [["ghali","غالي","expensive"],["ghedda","غدا","tomorrow"],["sghir","صغير","small"]] },
  { s: "2", a: "ء", n: "Glottal stop", how: "The tiny catch in 'uh-oh'. Rare in Darija, mostly in words from Standard Arabic.", ex: [["l3a2ila","العائلة","family"],["mach2allah","ما شاء الله","wonderful"],["s2el","سأل","he asked"]] },
  { s: "r", a: "ر", n: "Rolled r", how: "Tap or roll the tip of the tongue, like Spanish or Italian r. Doubled rr is a longer roll.", ex: [["ras","راس","head"],["dar","دار","house"],["rremla","الرملة","the sand"]] },
  { s: "ch", a: "ش", n: "sh sound", how: "Like English 'sh' in 'shoe'. Written ch because of French spelling.", ex: [["chems","شمس","sun"],["chwiya","شوية","a little"],["kolchi","كلشي","everything"]] },
  { s: "j", a: "ج", n: "zh sound", how: "Like 's' in 'measure' or French 'j' in 'jour' — softer than English j.", ex: [["jmel","جمل","camel"],["jouj","جوج","two"],["djaj","دجاج","chicken"]] },
  { s: "g", a: "ڭ", n: "Hard g", how: "Like English g in 'go'. Darija writes it with a special letter ڭ (or گ), which Standard Arabic doesn't have.", ex: [["gal","ڭال","he said"],["gles","ڭلس","he sat"],["bagra","بڭرة","cow"]] },
  { s: "ṣ", a: "ص", n: "Heavy s", how: "Pull the back of your tongue down and back, round the lips slightly: the s sounds deeper and the vowel next to it darker.", ex: [["sba7","صباح","morning"],["sa7bi","صاحبي","my friend"],["sebbat","صباط","shoes"]] },
  { s: "ṭ", a: "ط", n: "Heavy t", how: "Same 'heavy' tongue position as heavy s, applied to t. Compare tlata (light) and tbib (heavy).", ex: [["tbib","طبيب","doctor"],["tabla","طابلة","table"],["triq","طريق","road"]] },
  { s: "ḍ", a: "ض", n: "Heavy d", how: "A heavy d. In Darija ظ is usually pronounced the same way.", ex: [["dou","ضو","light"],["dher","ضهر","back"],["mrid","مريض","sick"]] },
  { s: "h", a: "ه", n: "Light h", how: "Exactly like English h in 'house'. Don't confuse it with the breathy 7.", ex: [["hna","هنا","here"],["hder","هضر","he spoke"],["wjeh","وجه","face"]] },
  { s: "a", a: "َ", n: "Short a", how: "Like 'a' in 'cat' next to light consonants; darker, like 'u' in 'cup', next to heavy ones and 9.", ex: [["bab","باب","door"],["mra","مرا","woman"],["sa7bi","صاحبي","my friend"]] },
  { s: "aa", a: "ا", n: "Long a", how: "Like 'a' in 'father', held longer. Written with alif.", ex: [["dar","دار","house"],["bared","بارد","cold"],["daba","دابا","now"]] },
  { s: "e", a: "ـ", n: "The tiny e (schwa)", how: "A very short, relaxed vowel like 'e' in 'the'. It often disappears entirely — don't stress it.", ex: [["bent","بنت","girl"],["kteb","كتب","he wrote"],["mezyan","مزيان","good"]] },
  { s: "i", a: "ي", n: "Long i", how: "Like 'ee' in 'see'. Written with ya.", ex: [["bit","بيت","room"],["zit","زيت","oil"],["fin","فين","where"]] },
  { s: "ou", a: "و", n: "Long u", how: "Like 'oo' in 'food' (French ou). Next to heavy letters it sounds closer to 'o'.", ex: [["souq","سوق","market"],["dou","ضو","light"],["khobz","خبز","bread (short o)"]] },
  { s: "bb, ll…", a: "ّ", n: "Double consonants", how: "Hold the consonant longer: mmi = 'm-mi'. Doubling changes meaning: 9ra (he read) vs 9erra (he taught).", ex: [["mmi","مّي","mom"],["bba","بّا","dad"],["sebbat","صباط","shoes"]] },
  { s: "ktb…", a: "", n: "Consonant clusters", how: "Darija drops short vowels, so words start with 2–3 consonants. Say them together quickly — a tiny 'e' slips in naturally.", ex: [["bzaf","بزاف","a lot"],["ktab","كتاب","book"],["mchit","مشيت","I went"]] },
];
