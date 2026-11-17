(() => {
    const root = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');
    const themeKey = 'maintenance-manager-theme';
    const languageKey = 'maintenance-manager-language';
    const translations = {
        en: {heading:'Maintenance mode',subtitle:'Keep your application polished while you work behind the scenes.',quick:'QUICK CONTROL',availability:'Site availability',glance:'AT A GLANCE',configuration:'Configuration',mode:'Mode',ips:'Allowed IP addresses',start:'Scheduled start',end:'Scheduled end',personalize:'PERSONALIZE THE EXPERIENCE',pageSettings:'Maintenance page settings',pageHelp:'Tell visitors what is happening and when you expect to be back.',headline:'Page headline',message:'Message for visitors',scheduledStart:'Scheduled start',scheduledEnd:'Scheduled end',allowed:'Allowed IP addresses',ipHelp:'One IP address per line. These visitors can bypass maintenance.',local:'Settings are stored locally in your application.',save:'Save settings →',history:'Recent maintenance activity',enable:'Enable maintenance mode →',disable:'Disable maintenance mode →',instant:'Changes take effect immediately',live:'Maintenance is live',operational:'All systems operational'},
        tr: {heading:'Bakım modu',subtitle:'Arka planda çalışırken uygulamanızın düzenini koruyun.',quick:'HIZLI KONTROL',availability:'Site erişimi',glance:'GENEL BAKIŞ',configuration:'Yapılandırma',mode:'Mod',ips:'İzin verilen IP adresleri',start:'Planlanan başlangıç',end:'Planlanan bitiş',personalize:'DENEYİMİ KİŞİSELLEŞTİRİN',pageSettings:'Bakım sayfası ayarları',pageHelp:'Ziyaretçilerinize neler olduğunu ve ne zaman döneceğinizi bildirin.',headline:'Sayfa başlığı',message:'Ziyaretçilere mesaj',scheduledStart:'Planlanan başlangıç',scheduledEnd:'Planlanan bitiş',allowed:'İzin verilen IP adresleri',ipHelp:'Her satıra bir IP adresi yazın. Bu ziyaretçiler bakımı atlayabilir.',local:'Ayarlar uygulamanızda yerel olarak saklanır.',save:'Ayarları kaydet →',history:'Son bakım etkinlikleri',enable:'Bakım modunu etkinleştir →',disable:'Bakım modunu devre dışı bırak →',instant:'Değişiklikler hemen uygulanır',live:'Bakım modu aktif',operational:'Tüm sistemler çalışıyor'}
    };
    const applyTheme = (theme) => {
        const resolved = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
        root.setAttribute('data-theme', resolved);
        localStorage.setItem(themeKey, theme);
        if (themeButton) themeButton.textContent = theme === 'dark' ? '☼' : theme === 'system' ? '◉' : '◐';
    };
    const applyLanguage = (language) => {
        const dictionary = translations[language] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            if (dictionary[key]) element.textContent = dictionary[key];
        });
        document.documentElement.lang = language;
        localStorage.setItem(languageKey, language);
    };
    const savedTheme = localStorage.getItem(themeKey) || 'system';
    applyTheme(savedTheme);
    if (themeButton) themeButton.addEventListener('click', () => {
        const current = localStorage.getItem(themeKey) || 'system';
        applyTheme(current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light');
    });
    if (languageSelect) {
        const savedLanguage = localStorage.getItem(languageKey) || 'en';
        languageSelect.value = savedLanguage;
        applyLanguage(savedLanguage);
        languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
        if ((localStorage.getItem(themeKey) || 'system') === 'system') applyTheme('system');
    });
})();