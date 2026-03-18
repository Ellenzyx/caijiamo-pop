const DISH_DATA = {
  'liangban tudousi': {
    zhName: '凉拌土豆丝',
    enName: 'Cold Shredded Potato',
    zhRecipe:
      '做法：土豆去皮切细丝，清水中冲洗去淀粉后焯水 10–20 秒，迅速捞出过凉。碗中加入蒜末、干辣椒段、花椒，浇入热油激香，加生抽、米醋、盐和少量糖，倒入土豆丝与香菜段拌匀即可。',
    enRecipe:
      'Method: Peel potatoes and cut into fine strips. Rinse off the starch, then blanch in boiling water for 10–20 seconds and cool quickly in cold water. In a bowl add minced garlic, dried chili and Sichuan pepper, pour over hot oil, then season with light soy sauce, rice vinegar, salt and a pinch of sugar. Toss together with the potato strips and some chopped cilantro.',
  },
  'liangban haidai si': {
    zhName: '凉拌海带丝',
    enName: 'Cold Kelp Shreds',
    zhRecipe:
      '做法：海带丝洗净焯水 1–2 分钟，捞出沥干。碗中加入蒜末、小米椒圈、香菜段，调入生抽、米醋、香油与少许糖和盐，倒入海带丝抓拌均匀，静置 5 分钟入味后食用。',
    enRecipe:
      'Method: Rinse kelp shreds and blanch for 1–2 minutes, drain well. In a bowl add minced garlic, sliced fresh chili and cilantro, season with light soy sauce, rice vinegar, sesame oil, a little sugar and salt. Toss with the kelp and let sit for 5 minutes to absorb the flavor.',
  },
  'liangban douya': {
    zhName: '凉拌豆芽',
    enName: 'Cold Bean Sprouts',
    zhRecipe:
      '做法：黄豆芽择去根部，沸水中焯 30 秒捞出过凉，沥干水分。加入蒜末、香葱、香菜，调入生抽、米醋、少量芝麻油和盐，喜欢辣味可加小米椒圈，拌匀即可。',
    enRecipe:
      'Method: Trim bean sprouts, blanch in boiling water for about 30 seconds, then cool and drain. Mix with minced garlic, chopped scallion and cilantro. Season with light soy sauce, rice vinegar, a little sesame oil and salt; add fresh chili slices if you like it spicy.',
  },
  'liangban huanggua': {
    zhName: '凉拌黄瓜',
    enName: 'Garlic Cucumber Salad',
    zhRecipe:
      '做法：黄瓜拍碎切块，撒少许盐腌 5 分钟后挤掉多余水分。碗中加入蒜末、生抽、米醋、香油和少量糖，喜欢可以加辣椒油，倒入黄瓜拌匀，最后撒上熟芝麻。',
    enRecipe:
      'Method: Smash cucumbers lightly and cut into bite-size pieces. Sprinkle with a little salt, rest 5 minutes, then squeeze out excess water. In a bowl mix minced garlic, light soy sauce, rice vinegar, sesame oil and a pinch of sugar, plus chili oil if desired. Toss with the cucumbers and finish with toasted sesame seeds.',
  },
  'liangban doufu pi': {
    zhName: '凉拌豆腐皮',
    enName: 'Cold Tofu Skin Salad',
    zhRecipe:
      '做法：豆腐皮切细丝，焯水 20 秒捞出过凉沥干。配少量胡萝卜丝、黄瓜丝，加入蒜末、生抽、陈醋、辣椒油、花椒油和盐、糖，拌匀后静置几分钟更入味。',
    enRecipe:
      'Method: Slice tofu skin into thin strips, blanch for about 20 seconds, cool and drain. Add some carrot and cucumber shreds. Season with minced garlic, light soy sauce, vinegar, chili oil, Sichuan pepper oil, salt and a little sugar. Toss well and let sit a few minutes.',
  },
  'liangban fentiao': {
    zhName: '凉拌粉条',
    enName: 'Cold Glass Noodles',
    zhRecipe:
      '做法：粉条煮至断生有弹性，过凉水沥干；加入黄瓜丝、胡萝卜丝。碗中调入蒜末、生抽、醋、辣椒油、花椒油和芝麻，倒入粉条拌匀，喜欢可再加少量花生碎。',
    enRecipe:
      'Method: Cook glass noodles until just tender and springy, rinse in cold water and drain. Add shredded cucumber and carrot. Mix minced garlic, soy sauce, vinegar, chili oil, Sichuan pepper oil and sesame seeds, then toss with the noodles; top with crushed peanuts if you like.',
  },
  'liangban lianou': {
    zhName: '凉拌莲藕片',
    enName: 'Cold Lotus Root Salad',
    zhRecipe:
      '做法：莲藕去皮切片，放少许醋的水中焯 1–2 分钟，捞出过凉。用蒜末、干辣椒、花椒炝热油，加入生抽、香醋、糖和盐调匀，浇在藕片上拌匀即可。',
    enRecipe:
      'Method: Peel lotus root and slice thinly. Blanch 1–2 minutes in water with a splash of vinegar, then cool. In a bowl add minced garlic, dried chili and Sichuan pepper, pour over hot oil, then season with soy sauce, black vinegar, sugar and salt. Toss with the lotus slices.',
  },
  'liangban muer': {
    zhName: '凉拌木耳',
    enName: 'Cold Wood Ear Mushrooms',
    zhRecipe:
      '做法：干木耳泡发洗净，焯水 1 分钟捞出过凉沥干。加入蒜末、小米椒圈、香菜段，调入生抽、米醋、香油和少量糖盐，拌匀后冷藏一会儿口感更脆爽。',
    enRecipe:
      'Method: Soak dried wood ear mushrooms until soft, rinse and blanch for 1 minute, then cool and drain. Mix with minced garlic, fresh chili and cilantro. Season with soy sauce, rice vinegar, sesame oil, a little sugar and salt, then chill briefly.',
  },
  'lu jidan': {
    zhName: '卤鸡蛋',
    enName: 'Braised Eggs',
    zhRecipe:
      '做法：鸡蛋煮熟去壳，锅中放清水、酱油、八角、桂皮、香叶、冰糖和少许盐，放入鸡蛋小火卤 30 分钟以上关火浸泡入味，吃时切半摆入碗中即可。',
    enRecipe:
      'Method: Boil eggs, peel and set aside. In a pot add water, soy sauce, star anise, cinnamon, bay leaf, rock sugar and salt. Simmer eggs in the braising liquid for at least 30 minutes, then let them soak off the heat. Halve and serve in a small bowl.',
  },
  'lu doufu gan': {
    zhName: '卤豆腐干',
    enName: 'Braised Tofu',
    zhRecipe:
      '做法：豆腐干切块，放入酱油、水、冰糖、八角、花椒和少量五香粉的卤汁中，小火煮 20 分钟后关火焖至入味，捞出沥干装碗即可。',
    enRecipe:
      'Method: Cut firm tofu into cubes. Simmer in a braising liquid of soy sauce, water, rock sugar, star anise, Sichuan pepper and a pinch of five-spice for about 20 minutes, then let sit off heat to absorb flavor before serving.',
  },
  'lu oupian': {
    zhName: '卤藕片',
    enName: 'Braised Lotus Root',
    zhRecipe:
      '做法：莲藕切片，放入酱油、水、冰糖、八角、桂皮和少许盐的卤汁中，小火煮 20 分钟，关火浸泡冷却，让藕片呈现深琥珀色即可食用。',
    enRecipe:
      'Method: Slice lotus root and simmer in a mixture of soy sauce, water, rock sugar, star anise, cinnamon and salt for about 20 minutes. Turn off the heat and let the slices soak until they turn a deep amber brown.',
  },
  'lu haidai': {
    zhName: '卤海带',
    enName: 'Braised Kelp',
    zhRecipe:
      '做法：海带洗净切段，入酱油、水、冰糖、八角、姜片的卤汁中，小火煮 20 分钟左右，浸泡入味后捞出切条装碗即可。',
    enRecipe:
      'Method: Rinse kelp and cut into sections. Simmer in a braising liquid of soy sauce, water, rock sugar, star anise and ginger slices for about 20 minutes, then let soak to absorb flavor before slicing and serving.',
  },
  'lu jizhua': {
    zhName: '卤鸡爪',
    enName: 'Braised Chicken Feet',
    zhRecipe:
      '做法：鸡爪剪去指甲焯水，油中略炸或直接煸香，加入酱油、老抽、冰糖、姜蒜、八角、桂皮和清水，没过鸡爪，小火炖至软糯入味即可。',
    enRecipe:
      'Method: Trim chicken feet and blanch, then optionally fry briefly. Braise with light and dark soy sauce, rock sugar, ginger, garlic, star anise, cinnamon and enough water to cover until tender and flavorful.',
  },
  'lu jitui': {
    zhName: '卤鸡腿',
    enName: 'Braised Chicken Drumstick',
    zhRecipe:
      '做法：鸡腿用酱油、料酒、姜片腌制 15 分钟，锅中放少许油煎至表面微黄，加入清水、酱油、冰糖、八角和香叶，小火炖 30 分钟收汁即可。',
    enRecipe:
      'Method: Marinate drumsticks with soy sauce, Shaoxing wine and ginger slices for 15 minutes. Brown lightly in a pan, then add water, soy sauce, rock sugar, star anise and bay leaves. Simmer about 30 minutes until cooked through and glazed.',
  },
  'lu zhu erduo': {
    zhName: '卤猪耳朵',
    enName: 'Braised Pig Ears',
    zhRecipe:
      '做法：猪耳焯水洗净，放入酱油、料酒、冰糖、八角、桂皮、姜片和清水中，小火卤 40 分钟至软而有弹性，冷却后切片装碗。',
    enRecipe:
      'Method: Blanch pig ears and clean well. Simmer in a mixture of soy sauce, cooking wine, rock sugar, star anise, cinnamon, ginger and water for about 40 minutes until tender but springy. Cool and slice thinly.',
  },
  'la baicai': {
    zhName: '辣白菜',
    enName: 'Spicy Napa Cabbage',
    zhRecipe:
      '做法：大白菜切块，加盐腌出水后挤干。拌入蒜末、姜末、韩式辣椒粉或干辣椒面、少量鱼露或生抽、糖和糯米糊，密封冷藏一晚即可食用。',
    enRecipe:
      'Method: Cut napa cabbage into pieces, salt to draw out water, then squeeze dry. Mix with minced garlic and ginger, Korean chili flakes, a little fish sauce or soy sauce, sugar and a bit of sticky rice paste. Pack and chill overnight before eating.',
  },
  'la luobo': {
    zhName: '辣萝卜',
    enName: 'Spicy Radish',
    zhRecipe:
      '做法：白萝卜切条或块，加盐腌 30 分钟后冲去多余盐分并沥干。加入蒜末、辣椒粉、白醋和少量糖、香油，抓拌均匀，静置入味即可。',
    enRecipe:
      'Method: Cut white radish into sticks, salt for 30 minutes, rinse slightly and drain. Toss with minced garlic, chili flakes, white vinegar, a little sugar and sesame oil, then let sit to develop flavor.',
  },
  'la haidai': {
    zhName: '辣海带',
    enName: 'Spicy Kelp Salad',
    zhRecipe:
      '做法：海带丝焯水沥干，加入蒜末、小米椒、香菜段。碗中调入生抽、陈醋、辣椒油、花椒油和少量糖盐，倒入海带丝拌匀即可。',
    enRecipe:
      'Method: Blanch kelp strips and drain. Mix with minced garlic, fresh chili and cilantro. Season with soy sauce, vinegar, chili oil, Sichuan pepper oil, sugar and salt, then toss well.',
  },
  'la doufu pi': {
    zhName: '辣豆腐皮',
    enName: 'Spicy Tofu Skin',
    zhRecipe:
      '做法：豆腐皮切条焯水，沥干后加入蒜末、葱花、辣椒油、花椒粉和少量生抽、香醋、糖盐，充分拌匀即可。',
    enRecipe:
      'Method: Slice tofu skin and blanch briefly, drain. Mix with minced garlic, scallion, chili oil, ground Sichuan pepper, soy sauce, vinegar, sugar and salt, then toss thoroughly.',
  },
  fuzhu: {
    zhName: '腐竹',
    enName: 'Yuba Sticks',
    zhRecipe:
      '做法：腐竹提前泡发至软，切段，入清水煮 5–8 分钟捞出。可以凉拌：加入蒜末、葱花、生抽、香醋、辣椒油和香油拌匀；也可以与卤汁同锅小火煮至入味。',
    enRecipe:
      'Method: Soak dried yuba until soft, cut into sections and simmer 5–8 minutes. For a cold dish, toss with minced garlic, scallion, soy sauce, vinegar, chili oil and sesame oil; or braise together with soy-based stock for a warm version.',
  },
  mianjin: {
    zhName: '面筋',
    enName: 'Wheat Gluten',
    zhRecipe:
      '做法：熟面筋切块，入锅与青椒、胡萝卜片同炒，调入生抽、蚝油和少量糖、盐，稍加清水焖 3 分钟让面筋吸汁即可；也可以直接用卤汁小火煮制。',
    enRecipe:
      'Method: Cut cooked wheat gluten into chunks and stir-fry with green pepper and carrot. Season with soy sauce, oyster sauce, a little sugar and salt, add a splash of water and simmer a few minutes so the gluten absorbs the sauce, or braise directly in a soy stock.',
  },
  'youzha huasheng': {
    zhName: '油炸花生',
    enName: 'Fried Peanuts',
    zhRecipe:
      '做法：冷油下生花生米，小火慢炸至微微变色立刻关火，利用余温炸熟。出锅后趁热撒盐及少量花椒粉，放凉后更香脆。',
    enRecipe:
      'Method: Start peanuts in cold oil and fry over low heat until just turning slightly golden, then turn off the heat and let residual heat finish cooking. While still hot, sprinkle with salt and a little ground Sichuan pepper, then cool for extra crunch.',
  },
  zhacai: {
    zhName: '榨菜',
    enName: 'Pickled Mustard Tuber',
    zhRecipe:
      '做法：成品榨菜切丝，用清水略微冲洗去多余咸味，挤干后加入香油、少量糖和葱花拌匀即可，也可与豆腐丝、粉条等同拌。',
    enRecipe:
      'Method: Slice store-bought zhacai, rinse briefly to reduce saltiness and squeeze dry. Toss with a little sesame oil, sugar and chopped scallion; you can also mix it with shredded tofu or noodles.',
  },
  suancai: {
    zhName: '酸菜',
    enName: 'Pickled Cabbage',
    zhRecipe:
      '做法：酸菜洗净切碎，锅中放少许油，下蒜末、干辣椒炒香，再放入酸菜翻炒，加少量糖、盐调味，出锅前可撒葱花；也可直接凉拌加香油食用。',
    enRecipe:
      'Method: Rinse pickled cabbage and chop. Stir-fry minced garlic and dried chili in a little oil, add the cabbage and fry until fragrant. Season with a pinch of sugar and salt, finish with scallions, or simply dress with sesame oil and serve cold.',
  },
};

function resolveDishId() {
  const url = new URL(window.location.href);
  const idParam = url.searchParams.get('id');
  return idParam || '';
}

function imageSrcForId(id) {
  // id 与文件名（去掉扩展）一致
  const fileName = `${id}.png`;
  return `./cuisine/${encodeURIComponent(fileName)}`;
}

function renderDishPage() {
  const id = resolveDishId();
  const data = DISH_DATA[id];

  const imgEl = document.getElementById('dishImage');
  const nameZhEl = document.getElementById('dishNameZh');
  const nameEnEl = document.getElementById('dishNameEn');
  const recipeEl = document.getElementById('dishRecipe');
  const zhBtn = document.getElementById('langZhBtn');
  const enBtn = document.getElementById('langEnBtn');

  if (!imgEl || !nameZhEl || !nameEnEl || !recipeEl || !zhBtn || !enBtn) return;

  if (!data) {
    nameZhEl.textContent = '未知菜品';
    nameEnEl.textContent = id || '';
    recipeEl.textContent = '未找到该菜品的制作方法。';
    imgEl.style.display = 'none';
    return;
  }

  imgEl.src = imageSrcForId(id);
  imgEl.alt = data.zhName;
  nameZhEl.textContent = data.zhName;
  nameEnEl.textContent = data.enName;

  let currentLang = 'zh';
  recipeEl.textContent = data.zhRecipe;

  function syncButtons() {
    if (currentLang === 'zh') {
      zhBtn.classList.add('is-active');
      enBtn.classList.remove('is-active');
    } else {
      enBtn.classList.add('is-active');
      zhBtn.classList.remove('is-active');
    }
  }

  zhBtn.addEventListener('click', () => {
    if (!data) return;
    currentLang = 'zh';
    recipeEl.textContent = data.zhRecipe;
    syncButtons();
  });

  enBtn.addEventListener('click', () => {
    if (!data) return;
    currentLang = 'en';
    recipeEl.textContent = data.enRecipe;
    syncButtons();
  });

  syncButtons();
}

window.addEventListener('load', renderDishPage);

