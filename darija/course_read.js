// Darija Daba — Reading course: learn Arabic script step by step.
// Extra page fields: lt = letters to show (string), rw = words to read [arabic, latin, english]
const READ_COURSE = [
{ id: "r-01", lvl: "R", t: "Right to Left: ا ب ت ث", em: "1️⃣", goal: "Learn how Arabic writing works and your first four letters.",
  pages: [
    { h: "How Arabic script works", p: [
      "Arabic is written and read from **right to left**. There are no capital letters, but most letters **join** to the next one, so they change shape depending on their position: alone, at the start, in the middle, or at the end of a word.",
      "Only consonants and long vowels are written. Short vowels are usually left out — you'll learn to recognise words by their shape, like reading 'txt msgs'." ] },
    { h: "Alif and the 'boat' letters", lt: "ابتث", p: [
      "**ا alif** is a vertical stroke. It's a long 'aa' sound or a seat for other vowels. It never joins to the letter after it.",
      "**ب ba, ت ta, ث tha** share the same 'boat' shape and differ only by their dots: ONE dot below = b, TWO dots above = t, THREE dots above = th (pronounced t in Darija).",
      "Tap a letter to see all its shapes and hear an example." ] },
    { h: "Read your first words", p: ["Try to read each word before revealing it. Remember: right to left!"],
      rw: [["با","ba","b + aa"],["تا","ta","t + aa"],["بابا","baba","dad"],["بات","bat","he spent the night"],["تاب","tab","he repented"],["ثابت","tabet","Tabet (a name: 'steady')"]] },
  ]},
{ id: "r-02", lvl: "R", t: "ن ي and Long Vowels", em: "2️⃣", goal: "Add noun and ya, and learn the three long vowels.",
  pages: [
    { h: "Two more letters", lt: "نيو", p: [
      "**ن noun** looks like a deeper boat with one dot above. **ي ya** has two dots below; at the end of a word it gets a curly tail.",
      "**و waw** is a little loop. Like alif, it doesn't join to the next letter." ] },
    { h: "Long vowels", p: [
      "Three letters double as long vowels: **ا = aa**, **و = ou / o**, **ي = i / ee**. In Darija words, these are often the only vowels you'll see written.",
      "So بيت = b-i-t = **bit** (room), and نوب = n-ou-b = **noub** (turn)." ],
      t: [["a / aa","ا","alif: long a"],["ou / o","و","waw: long u"],["i / ee","ي","ya: long i"]] },
    { h: "Read", rw: [["بيت","bit","room"],["بنت","bent","girl / daughter"],["بنين","bnin","delicious"],["نتا","nta","you (to a man)"],["نتي","nti","you (to a woman)"],["تبن","tben","straw"],["بوب","boub","Bob (a name)"],["توت","tout","berries / mulberries"]] },
  ]},
{ id: "r-03", lvl: "R", t: "ج ح خ — the Hook Letters", em: "3️⃣", goal: "Read jim, 7a and kha.",
  pages: [
    { h: "Same shape, different dots", lt: "جحخ", p: [
      "These three share a hook shape. **ج jim** has a dot inside (j as in 'measure'). **ح 7a** has no dot (the breathy 7). **خ kha** has a dot on top (kh as in 'loch').",
      "At the start or middle of a word the hook flattens into a little 'cap'." ] },
    { h: "Read", rw: [["حب","7ebb","love / seeds"],["حيت","7it","because"],["جيب","jib","bring!"],["جاب","jab","he brought"],["نجح","nje7","he succeeded"],["تحت","ta7t","under"],["خبي","khebbi","hide!"],["بحال","b7al","like / as"],["خوي","khawi","empty"],["حنا","7na","we"]] },
  ]},
{ id: "r-04", lvl: "R", t: "د ذ ر ز — the Non-Joiners", em: "4️⃣", goal: "Read dal, dhal, ra and zay — and understand gaps inside words.",
  pages: [
    { h: "Letters that don't join forward", lt: "دذرز", p: [
      "**د dal** and **ذ dhal** look like a small angle; dhal has a dot. **ر ra** and **ز zay** dip below the line; zay has a dot.",
      "Like ا and و, these four never join to the letter AFTER them. That's why you see gaps inside words: دار (d-a-r), ورد (w-r-d). The six non-joiners are: **ا د ذ ر ز و**." ] },
    { h: "Read", rw: [["دار","dar","house"],["دابا","daba","now"],["ورد","werd","roses"],["راجل","rajel","man"],["زوين","zwin","beautiful"],["خبز","khobz","bread"],["واخا","wakha","OK"],["بارد","bared","cold"],["روز","rouz","rice"],["زيت","zit","oil"],["ذيب","dib","wolf"]] },
  ]},
{ id: "r-05", lvl: "R", t: "س ش ص ض — the Teeth Letters", em: "5️⃣", goal: "Read sin, chin and the heavy ṣad and ḍad.",
  pages: [
    { h: "Teeth and loops", lt: "سشصض", p: [
      "**س sin** has three little 'teeth'. **ش chin** is the same with three dots on top (ch).",
      "**ص ṣad** and **ض ḍad** have a flat loop: these are the 'heavy' s and d. ḍad has a dot." ] },
    { h: "Read", rw: [["سير","sir","go!"],["شنو","chnou","what?"],["شحال","ch7al","how much?"],["صباح","sba7","morning"],["ضو","dou","light / electricity"],["صاحبي","sa7bi","my friend"],["شرب","chreb","he drank"],["سخون","skhoun","hot"],["شمس","chems","sun"],["سوسة","sousa","worm / (a city in Tunisia)"]] },
  ]},
{ id: "r-06", lvl: "R", t: "ط ظ ع غ", em: "6️⃣", goal: "Read the heavy ṭa and ẓa, and the throat letters 3ayn and ghayn.",
  pages: [
    { h: "Two pairs", lt: "طظعغ", p: [
      "**ط ṭa** and **ظ ẓa** are a loop with a tall stick; ẓa has a dot. These are heavy t and heavy z/d.",
      "**ع 3ayn** looks like a 'c' on top of a hook — it's the 3 sound. **غ ghayn** is the same with a dot (gh). In the middle of a word 3ayn becomes a small closed triangle: بعيد." ] },
    { h: "Read", rw: [["عندي","3andi","I have"],["غادي","ghadi","going / will"],["عيان","3iyan","tired"],["طبيب","tbib","doctor"],["عطيني","3tini","give me"],["بعيد","b3id","far"],["ضهر","dher","back"],["عاود","3awed","repeat!"],["بطاطا","btata","potatoes"],["غزال","ghzal","gazelle / gorgeous"]] },
  ]},
{ id: "r-07", lvl: "R", t: "ف ق ك ل م ه — the Rest", em: "7️⃣", goal: "Complete the alphabet and read almost any word.",
  pages: [
    { h: "Six final letters", lt: "فقكلمه", p: [
      "**ف fa** has one dot on a small loop; **ق qaf** has two dots and dips lower (the 9 sound).",
      "**ك kaf** is tall with a little 's' inside. **ل lam** is a tall hook. **م mim** is a small round blob with a tail. **ه ha** changes the most: ه alone, هـ at the start, ـهـ in the middle, ـه at the end." ] },
    { h: "Read", rw: [["فلوس","flous","money"],["قهوة","9ahwa","coffee"],["كاس","kas","glass"],["ليل","lil","night"],["مزيان","mezyan","good"],["هنا","hna","here"],["كيفاش","kifach","how?"],["فين","fin","where?"],["قريب","9rib","near"],["كلشي","kolchi","everything"],["لحم","l7em","meat"],["ملح","mel7","salt"]] },
  ]},
{ id: "r-08", lvl: "R", t: "Special Marks & Darija Spelling", em: "8️⃣", goal: "Read ة, ء, لا, ال, shadda, ڭ — and real Darija sentences.",
  pages: [
    { h: "Special shapes", t: [["ة","ة","ta marbuta: ends feminine words, sounds like -a (طابلة tabla)"],["ء أ","ء أ","hamza: the stop in 'uh-oh' (أنا ana)"],["لا","لا","lam + alif join into one shape: la"],["ّ","مّي","shadda doubles a letter: mmi"],["ال","الدار","'the' — before 'sun letters' the l is silent: ddar"],["ڭ","ڭال","gaf: Darija hard g (gal = he said)"]] },
    { h: "How Darija is spelled", p: [
      "Darija spelling follows a few habits. The present prefix ka- is written **ك**: كنمشي kanmchi (I go), كيقرا kayqra (he reads).",
      "Negation ma...ch is **ما ...ش**: ما فهمتش ma fhemtch. Future ghadi is **غادي**. Little words like f (in) and l (to) are written ف and ل, often attached: فالدار f ddar." ],
      rw: [["كنمشي","kanmchi","I go"],["كيقرا","kayqra","he reads / studies"],["ما فهمتش","ma fhemtch","I didn't understand"],["غادي نمشي","ghadi nmchi","I'll go"],["فالدار","f ddar","at home"],["طابلة","tabla","table"],["الشمس","chchems","the sun"],["مّي و بّا","mmi w bba","mom and dad"]] },
    { h: "Read real sentences", rw: [["السلام عليكم، لاباس عليك؟","salam ou 3alaykoum, labas 3lik?","Hello, how are you?"],["بغيت واحد أتاي بلا سكر","bghit wa7ed atay bla sokkar","I'd like a tea without sugar"],["فين كاينة المحطة؟","fin kayna lm7atta?","Where is the station?"],["أنا كنتعلم الدارجة","ana kanet3llem darija","I'm learning Darija"],["شحال هادا؟ غالي بزاف!","ch7al hada? ghali bzaf!","How much is this? Too expensive!"],["نشوفك غدا إن شاء الله","nchoufek ghedda inchallah","See you tomorrow, God willing"]] },
  ]},
{ id: "r-09", lvl: "R", t: "Reading the Street", em: "🪧", goal: "Read real signs, shop fronts and menus.",
  pages: [
    { h: "Signs use Standard Arabic", p: [
      "Official signs, shop fronts and menus are usually in **Standard Arabic** (and French), not Darija. The letters are the same, so you can now read them! Here's what you'll see most often — with the Darija word people actually say." ],
      rw: [["مخبزة","makhbaza","bakery (Darija: lfarran / l7anout d lkhobz)"],["صيدلية","saydaliya","pharmacy (Darija: lfarmasyan)"],["مقهى","maqha","café (Darija: l9ahwa)"],["مطعم","mat3am","restaurant (Darija: restaurant / lmat3am)"],["مستشفى","mustachfa","hospital (Darija: sbitar)"],["محطة","ma7atta","station"],["شارع","chari3","street / avenue"],["ساحة","sa7a","square"],["حمام","7ammam","hammam (public bath)"],["باب","bab","gate (as in Bab Boujloud)"]] },
    { h: "Notices", rw: [["مفتوح","maftou7","open"],["مغلق","mughlaq","closed"],["دخول","dukhoul","entrance"],["خروج","khourouj","exit"],["ممنوع التدخين","mamnou3 ttadkhin","no smoking"],["للبيع","li lbay3","for sale"],["للكراء","li lkira2","for rent"],["رجال","rijal","men"],["نساء","nisa2","women"]] },
    { h: "A café menu", rw: [["قهوة سوداء","9ahwa sawda2","black coffee — 10 dh"],["قهوة نص نص","9ahwa ness ness","half-half coffee — 12 dh"],["أتاي بالنعناع","atay b n3na3","mint tea — 10 dh"],["عصير البرتقال","3asir lbourtouqal","orange juice — 15 dh"],["مسمن بالعسل","msemmen b l3sel","msemmen with honey — 8 dh"],["بيض و خليع","bid w khli3","eggs with preserved meat — 30 dh"]],
      c: "On menus you'll see the Standard word برتقال (bourtouqal) for orange — but in Darija people say ليمون (limoun)!" },
  ]},
];

// Long-form stories (added to STORIES)
STORIES.push(
  { id: "s-fes", title: "Nhar f Fes", en: "A Day in Fes", emoji: "🕌", level: "Advanced", color: "#2E6E5E",
    lines: [
      ["كلارا وصلات لفاس نهار الخميس فالليل.","Clara wslat l Fes nhar lkhmis f lil.","Clara arrived in Fes on Thursday night."],
      ["نعسات ف رياض قديم وسط المدينة.","n3sat f riyad qdim wst lmdina.","She slept in an old riad in the middle of the medina."],
      ["فالصباح، مولات الرياض وجدات ليها الفطور.","f sba7, mwlat rriyad wejjdat liha lftour.","In the morning, the riad owner made her breakfast."],
      ["كان كاين البغرير، الزيت، العسل و أتاي.","kan kayn lbghrir, zzit, l3sel w atay.","There were baghrir pancakes, olive oil, honey and tea."],
      ["كلارا: تبارك الله، كلشي بنين!","Clara: tbarkllah, kolchi bnin!","Clara: Wonderful, everything is delicious!"],
      ["من بعد، خرجات تتسارى فالزناقي الضيقين.","mn ba3d, khrjat tetsara f zznaqi ddiyyqin.","Then she went for a walk in the narrow streets."],
      ["المدينة كانت عامرة بالناس و الحمير و الحوانت.","lmdina kanet 3amra b nnas w l7mir w l7wanet.","The medina was full of people, donkeys and shops."],
      ["تلفات، و سولات واحد الدري صغير.","tlfat, w swlat wa7ed lderri sghir.","She got lost and asked a little boy."],
      ["كلارا: عافاك، فين كاينة الدباغة؟","Clara: 3afak, fin kayna ddbagha?","Clara: Please, where is the tannery?"],
      ["الدري: أجي معايا، أنا نوريك!","lderri: aji m3aya, ana nwerrik!","The boy: Come with me, I'll show you!"],
      ["وصلو للدباغة، و الريحة كانت قوية بزاف.","wslou l ddbagha, w rri7a kanet qwiya bzaf.","They reached the tannery, and the smell was very strong."],
      ["واحد السيد عطاها شوية د النعناع باش تشمو.","wa7ed ssid 3taha chwiya d nna3na3 bach tchemmou.","A man gave her some mint to smell."],
      ["من الفوق، شافت الألوان: الحمر، الصفر، و القهوي.","mn lfou9, chafet l2alwan: l7mer, ssfer w l9ehwi.","From above, she saw the colours: red, yellow and brown."],
      ["فالغدا، كلات الطاجين ف واحد المطعم صغير.","f lghda, klat ttajine f wa7ed lmat3am sghir.","For lunch, she ate a tajine in a small restaurant."],
      ["فالعشية، شرات واحد الصاك ديال الجلد للواليدة ديالها.","f l3chiya, chrat wa7ed ssak dyal jjeld l lwalida dyalha.","In the afternoon, she bought a leather bag for her mother."],
      ["مول الحانوت طلب ستمية، و هي خلصات ربعمية.","mol l7anout tlab settmya, w hiya khellsat rb3mya.","The shopkeeper asked 600, and she paid 400."],
      ["فالليل، رجعات للرياض عيانة و لكن فرحانة.","f lil, rj3at l rriyad 3iyana walakin fer7ana.","At night, she returned to the riad tired but happy."],
      ["كتبات ف الكارني ديالها: فاس، غادي نرجع ليك!","ktbat f lkarni dyalha: Fes, ghadi nrje3 lik!","She wrote in her notebook: Fes, I'll come back to you!"],
    ]},
  { id: "s-desert", title: "Safar l sse7ra", en: "Journey to the Desert", emoji: "🐪", level: "Advanced", color: "#B9772F",
    lines: [
      ["سامي و صحابو قررو يمشيو للصحرا ف العطلة.","Sami w s7abou qerrou ymchiw l sse7ra f l3otla.","Sami and his friends decided to go to the desert for the holidays."],
      ["خرجو من مراكش مع الخمسة د الصباح.","khrjou mn Marrakech m3a lkhamsa d sba7.","They left Marrakech at five in the morning."],
      ["الطريق طويلة و فيها بزاف د الدورات ف الجبل.","ttriq twila w fiha bzaf d ddourat f jjbel.","The road is long, with many bends in the mountains."],
      ["وقفو ف واحد القهوة باش يفطرو.","w9fou f wa7ed l9ahwa bach yfetrou.","They stopped at a café to have breakfast."],
      ["الجو كان بارد بزاف فالجبل.","ljew kan bared bzaf f jjbel.","It was very cold in the mountains."],
      ["من بعد ورزازات، الأرض ولات حمرة و خاوية.","mn ba3d Warzazat, l2ard wllat 7amra w khawya.","After Ouarzazate, the land became red and empty."],
      ["فالعشية، وصلو لمرزوكة.","f l3chiya, wslou l Merzouga.","In the evening, they reached Merzouga."],
      ["تما، ركبو الجمال و دخلو للصحرا.","temma, rkbou jjmal w dkhlou l sse7ra.","There, they rode camels into the desert."],
      ["سامي: والله الرملة كتشبه البحر!","Sami: wallah rremla katchbeh lb7er!","Sami: Honestly, the sand looks like the sea!"],
      ["الدليل ديالهم كان سميتو حسن، و كان كيهضر الدارجة و الأمازيغية.","ddlil dyalhoum kan smitou 7assan, w kan kayhder darija w tamazight.","Their guide was called Hassan, and he spoke Darija and Tamazight."],
      ["حسن: شوفو تما، الشمس غادي تغرب.","7assan: choufou temma, chchems ghadi tghreb.","Hassan: Look there, the sun is going to set."],
      ["ڭلسو فوق الرملة و شافو السما ولات حمرة.","glsou fou9 rremla w chafou ssma wllat 7amra.","They sat on the sand and watched the sky turn red."],
      ["فالليل، تعشاو طاجين ف الخيمة.","f lil, t3ashaw tajine f lkhayma.","At night they had a tajine in the tent."],
      ["من بعد، ضربو الطبل و غناو حدا العافية.","mn ba3d, drbou ttbel w ghnaw 7da l3afya.","Afterwards, they drummed and sang by the fire."],
      ["السما كانت عامرة بالنجوم.","ssma kanet 3amra b nnjoum.","The sky was full of stars."],
      ["سامي: عمرني ما شفت بحال هادشي!","Sami: 3emmerni ma cheft b7al hadchi!","Sami: I've never seen anything like this!"],
      ["فالصباح، فاقو بكري باش يشوفو الشمس تطلع.","f sba7, fa9ou bekri bach ychoufou chchems tetla3.","In the morning, they woke up early to watch the sunrise."],
      ["رجعو لمراكش و هوما كيعاودو القصة لكل واحد.","rj3ou l Marrakech w houma kay3awdou l9issa l koll wa7ed.","They went back to Marrakech telling the story to everyone."],
    ]}
);
