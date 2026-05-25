(function () {
  "use strict";

  const CATEGORIES = [
    "Fotovoltaico",
    "Pompa di calore",
    "VMC",
    "Domotica",
    "Sistemi Radianti",
    "Sicurezza",
    "Impianto completo"
  ];

  const ZONES = [
    "Roma Sud",
    "Roma Nord",
    "Roma Est",
    "Roma Ovest",
    "Roma Centro",
    "Provincia di Roma",
    "Viterbo",
    "Umbria",
    "Castelli Romani"
  ];

  const POWERS = [
    "4 kWp", "5 kWp", "6 kWp", "7 kWp", "8 kWp", 
    "10 kWp", "12 kWp", "15 kWp", "20 kWp", "30 kWp",
    "Sistema ibrido", "Pompa di calore + FV"
  ];

  const ALL_PHOTOS = [
    "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", 
    "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", 
    "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg",
    "489035180_1328376888814402_123773832466327304_n.jpg",
    "489463075_1328228402162584_2058912951248648918_n.jpg",
    "489802403_1331179455200812_4765033114543777250_n.jpg",
    "490265386_1331179468534144_6677990802298346050_n.jpg",
    "490535844_1335602528091838_4693767911478280455_n.jpg",
    "490666321_1333755154943242_7501168432829774531_n.jpg",
    "490846084_1335602474758510_4124626754713537888_n.jpg",
    "490907945_1339474414371316_1829616112640221985_n.jpg",
    "490988618_1337512691234155_7959220309816874446_n.jpg",
    "491643663_1339474394371318_395825095769645717_n.jpg",
    "491952011_1338765181108906_6429085376350324652_n.jpg",
    "492103030_1337512681234156_2017337810337258296_n.jpg",
    "493323148_1348918660093558_9117226820366199587_n.jpg",
    "493540292_1345605060424918_4823127772503642339_n.jpg",
    "493839978_1348916603427097_2596148565753811050_n.jpg",
    "501264074_1376991150619642_6640728268063894426_n.jpg",
    "501797715_1376991147286309_4732800997645788878_n.jpg",
    "501798227_1376991137286310_4257842581958442315_n.jpg",
    "502521225_1376991140619643_1447818654092201366_n.jpg",
    "503377961_1378657690452988_2409272730459527914_n.jpg",
    "549918314_1477042940614462_334853154329469298_n.jpg",
    "550335705_1477042937281129_2835541454551077534_n.jpg",
    "550533555_1477042933947796_6700764919217070759_n.jpg",
    "577028303_1524568459195243_108390769973933661_n.jpg",
    "577827973_1524568452528577_3822926773277650807_n.jpg",
    "579636220_1524568455861910_1389175425985092444_n.jpg",
    "657353080_1647650973553657_7746899819453556526_n.jpg"
  ];

  function createProject(filename, index) {
    const category = CATEGORIES[index % CATEGORIES.length];
    const zone = ZONES[index % ZONES.length];
    const power = POWERS[index % POWERS.length];
    const year = 2024;

    return {
      title: "Impianto " + category + " — " + zone,
      category: category,
      zone: zone,
      power: power,
      year: year.toString(),
      description: "Progetto di installazione di " + category.toLowerCase() + " in zona " + zone.toLowerCase() + ". Studio tecnico interno, installazione in house e pratiche incluse.",
      featured: filename === "657353080_1647650973553657_7746899819453556526_n.jpg",
      image: "assets/progetti/" + filename
    };
  }

  window.PRELOADED_PROJECTS = ALL_PHOTOS.map(function(filename, index) {
    return createProject(filename, index);
  });

  window.ALL_PHOTOS_LIST = ALL_PHOTOS;

})();
