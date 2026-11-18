(() => {
    const root = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');
    const themeKey = 'maintenance-manager-theme';
    const languageKey = 'maintenance-manager-language';

    const translations = {
        en: {
            heading:'Maintenance mode', subtitle:'Keep your application polished while you work behind the scenes.',
            quick:'QUICK CONTROL', availability:'Site availability', glance:'AT A GLANCE', configuration:'Configuration',
            mode:'Mode', ips:'Allowed IP addresses', start:'Scheduled start', end:'Scheduled end',
            personalize:'PERSONALIZE THE EXPERIENCE', pageSettings:'Maintenance page settings',
            pageHelp:'Tell visitors what is happening and when you expect to be back.', headline:'Page headline',
            message:'Message for visitors', scheduledStart:'Scheduled start', scheduledEnd:'Scheduled end',
            allowed:'Allowed IP addresses', ipHelp:'One IP address per line. These visitors can bypass maintenance.',
            local:'Settings are stored locally in your application.', save:'Save settings →',
            history:'Recent maintenance activity', enable:'Enable maintenance mode →', disable:'Disable maintenance mode →',
            instant:'Changes take effect immediately', live:'Maintenance is live', operational:'All systems operational',
            workspace:'WORKSPACE', overview:'Overview', systemPanel:'System panel', breadcrumb:'Maintenance',
            appControl:'APPLICATION CONTROL', activeEnabled:'Maintenance mode is enabled', siteLive:'Your site is live',
            visitorsMaintenance:'Visitors are seeing your maintenance page.',
            scheduledWaiting:'Maintenance is scheduled or waiting for its start time.',
            visitorsNormally:'Visitors can access your application normally.', active:'Active', inactive:'Inactive',
            notScheduled:'Not scheduled', image:'Maintenance page image',
            imageHelp:'Optional JPG, PNG or WebP image, maximum 2 MB.', removeImage:'Remove uploaded image', defaultImage:'The default maintenance illustration will be shown.', activity:'ACTIVITY',
            updated:'updated', temporary:'TEMPORARILY UNAVAILABLE', backSoon:"WE'LL BE RIGHT BACK",
            statusSaved:'Maintenance settings saved successfully.', language:'Language', theme:'Appearance',
            light:'Light', dark:'Dark', system:'System', madeFor:'Made for Laravel', settingsLocal:'Settings are stored locally in your application.'
        },
        tr: {
            heading:'Bakım modu', subtitle:'Arka planda çalışırken uygulamanızın düzenini koruyun.',
            quick:'HIZLI KONTROL', availability:'Site erişimi', glance:'GENEL BAKIŞ', configuration:'Yapılandırma',
            mode:'Mod', ips:'İzin verilen IP adresleri', start:'Planlanan başlangıç', end:'Planlanan bitiş',
            personalize:'DENEYİMİ KİŞİSELLEŞTİRİN', pageSettings:'Bakım sayfası ayarları',
            pageHelp:'Ziyaretçilerinize neler olduğunu ve ne zaman döneceğinizi bildirin.', headline:'Sayfa başlığı',
            message:'Ziyaretçilere mesaj', scheduledStart:'Planlanan başlangıç', scheduledEnd:'Planlanan bitiş',
            allowed:'İzin verilen IP adresleri', ipHelp:'Her satıra bir IP adresi yazın. Bu ziyaretçiler bakım modunu atlayabilir.',
            local:'Ayarlar uygulamanızda yerel olarak saklanır.', save:'Ayarları kaydet →',
            history:'Son bakım etkinlikleri', enable:'Bakım modunu etkinleştir →', disable:'Bakım modunu devre dışı bırak →',
            instant:'Değişiklikler hemen uygulanır', live:'Bakım modu aktif', operational:'Tüm sistemler çalışıyor',
            workspace:'ÇALIŞMA ALANI', overview:'Genel bakış', systemPanel:'Sistem paneli', breadcrumb:'Bakım',
            appControl:'UYGULAMA KONTROLÜ', activeEnabled:'Bakım modu etkin', siteLive:'Siteniz yayında',
            visitorsMaintenance:'Ziyaretçiler bakım sayfanızı görüyor.',
            scheduledWaiting:'Bakım planlandı veya başlangıç zamanını bekliyor.',
            visitorsNormally:'Ziyaretçiler uygulamanıza normal şekilde erişebilir.', active:'Aktif', inactive:'Pasif',
            notScheduled:'Planlanmadı', image:'Bakım sayfası görseli',
            imageHelp:'İsteğe bağlı JPG, PNG veya WebP görseli; en fazla 2 MB.', removeImage:'Yüklenen görseli kaldır', defaultImage:'Varsayılan bakım görseli gösterilecek.', activity:'ETKİNLİK',
            updated:'güncellendi', temporary:'GEÇİCİ OLARAK KULLANILAMIYOR', backSoon:'KISA SÜREDE GERİ DÖNECEĞİZ',
            statusSaved:'Bakım ayarları başarıyla kaydedildi.', language:'Dil', theme:'Görünüm',
            light:'Açık', dark:'Koyu', system:'Sistem', madeFor:'Laravel için hazırlandı', settingsLocal:'Ayarlar uygulamanızda yerel olarak saklanır.'
        },
        es: {
            heading:'Modo de mantenimiento', subtitle:'Mantén tu aplicación en buen estado mientras trabajas en segundo plano.',
            quick:'CONTROL RÁPIDO', availability:'Disponibilidad del sitio', glance:'RESUMEN', configuration:'Configuración',
            mode:'Modo', ips:'Direcciones IP permitidas', start:'Inicio programado', end:'Fin programado',
            personalize:'PERSONALIZA LA EXPERIENCIA', pageSettings:'Ajustes de la página de mantenimiento',
            pageHelp:'Informa a los visitantes de lo que ocurre y cuándo volverás.', headline:'Título de la página',
            message:'Mensaje para los visitantes', scheduledStart:'Inicio programado', scheduledEnd:'Fin programado',
            allowed:'Direcciones IP permitidas', ipHelp:'Una dirección IP por línea. Estas visitas pueden omitir el mantenimiento.',
            local:'Los ajustes se guardan localmente en tu aplicación.', save:'Guardar ajustes →',
            history:'Actividad reciente de mantenimiento', enable:'Activar modo de mantenimiento →', disable:'Desactivar modo de mantenimiento →',
            instant:'Los cambios se aplican inmediatamente', live:'Mantenimiento activo', operational:'Todos los sistemas funcionan',
            workspace:'ESPACIO DE TRABAJO', overview:'Resumen', systemPanel:'Panel del sistema', breadcrumb:'Mantenimiento',
            appControl:'CONTROL DE LA APLICACIÓN', activeEnabled:'El modo de mantenimiento está activado', siteLive:'Tu sitio está en línea',
            visitorsMaintenance:'Los visitantes están viendo la página de mantenimiento.',
            scheduledWaiting:'El mantenimiento está programado o esperando su hora de inicio.',
            visitorsNormally:'Los visitantes pueden acceder a tu aplicación con normalidad.', active:'Activo', inactive:'Inactivo',
            notScheduled:'No programado', image:'Imagen de la página de mantenimiento',
            imageHelp:'Imagen JPG, PNG o WebP opcional; máximo 2 MB.', removeImage:'Eliminar imagen subida', defaultImage:'Se mostrará la ilustración predeterminada.', activity:'ACTIVIDAD',
            updated:'actualizado', temporary:'NO DISPONIBLE TEMPORALMENTE', backSoon:'VOLVEREMOS EN BREVE',
            statusSaved:'Los ajustes de mantenimiento se guardaron correctamente.', language:'Idioma', theme:'Apariencia',
            light:'Claro', dark:'Oscuro', system:'Sistema', madeFor:'Hecho para Laravel', settingsLocal:'Los ajustes se guardan localmente en tu aplicación.'
        },
        zh_CN: {
            heading:'维护模式', subtitle:'在后台处理工作时，保持应用体验良好。',
            quick:'快速控制', availability:'网站可用性', glance:'概览', configuration:'配置',
            mode:'模式', ips:'允许的 IP 地址', start:'计划开始时间', end:'计划结束时间',
            personalize:'个性化体验', pageSettings:'维护页面设置',
            pageHelp:'告知访客当前情况以及预计恢复时间。', headline:'页面标题',
            message:'访客提示信息', scheduledStart:'计划开始时间', scheduledEnd:'计划结束时间',
            allowed:'允许的 IP 地址', ipHelp:'每行填写一个 IP 地址。这些访客可以绕过维护模式。',
            local:'设置保存在应用程序本地。', save:'保存设置 →',
            history:'最近维护活动', enable:'启用维护模式 →', disable:'禁用维护模式 →',
            instant:'更改立即生效', live:'维护模式已启用', operational:'所有系统运行正常',
            workspace:'工作区', overview:'概览', systemPanel:'系统面板', breadcrumb:'维护',
            appControl:'应用控制', activeEnabled:'维护模式已启用', siteLive:'网站正常运行',
            visitorsMaintenance:'访客正在查看维护页面。',
            scheduledWaiting:'维护已安排或正在等待开始时间。',
            visitorsNormally:'访客可以正常访问应用程序。', active:'启用', inactive:'停用',
            notScheduled:'未安排', image:'维护页面图片',
            imageHelp:'可选 JPG、PNG 或 WebP 图片，最大 2 MB。', removeImage:'移除已上传图片', defaultImage:'将显示默认维护插图。', activity:'活动记录',
            updated:'已更新', temporary:'暂时无法访问', backSoon:'我们很快回来',
            statusSaved:'维护设置已成功保存。', language:'语言', theme:'外观',
            light:'浅色', dark:'深色', system:'跟随系统', madeFor:'为 Laravel 打造', settingsLocal:'设置保存在应用程序本地。'
        },
        hi: {
            heading:'मेंटेनेंस मोड', subtitle:'बैकग्राउंड में काम करते हुए अपने एप्लिकेशन को व्यवस्थित रखें।',
            quick:'त्वरित नियंत्रण', availability:'साइट उपलब्धता', glance:'एक नज़र में', configuration:'कॉन्फ़िगरेशन',
            mode:'मोड', ips:'अनुमत IP पते', start:'निर्धारित शुरुआत', end:'निर्धारित समाप्ति',
            personalize:'अनुभव को व्यक्तिगत बनाएं', pageSettings:'मेंटेनेंस पेज सेटिंग्स',
            pageHelp:'आगंतुकों को बताएं कि क्या हो रहा है और आप कब लौटेंगे।', headline:'पेज शीर्षक',
            message:'आगंतुकों के लिए संदेश', scheduledStart:'निर्धारित शुरुआत', scheduledEnd:'निर्धारित समाप्ति',
            allowed:'अनुमत IP पते', ipHelp:'हर पंक्ति में एक IP पता लिखें। ये आगंतुक मेंटेनेंस को बायपास कर सकते हैं।',
            local:'सेटिंग्स आपके एप्लिकेशन में स्थानीय रूप से संग्रहीत हैं।', save:'सेटिंग्स सहेजें →',
            history:'हाल की मेंटेनेंस गतिविधि', enable:'मेंटेनेंस मोड सक्षम करें →', disable:'मेंटेनेंस मोड बंद करें →',
            instant:'बदलाव तुरंत लागू होते हैं', live:'मेंटेनेंस चालू है', operational:'सभी सिस्टम काम कर रहे हैं',
            workspace:'कार्यक्षेत्र', overview:'अवलोकन', systemPanel:'सिस्टम पैनल', breadcrumb:'मेंटेनेंस',
            appControl:'एप्लिकेशन नियंत्रण', activeEnabled:'मेंटेनेंस मोड सक्षम है', siteLive:'आपकी साइट लाइव है',
            visitorsMaintenance:'आगंतुक आपका मेंटेनेंस पेज देख रहे हैं।',
            scheduledWaiting:'मेंटेनेंस निर्धारित है या शुरू होने के समय की प्रतीक्षा कर रहा है।',
            visitorsNormally:'आगंतुक आपके एप्लिकेशन तक सामान्य रूप से पहुंच सकते हैं।', active:'सक्रिय', inactive:'निष्क्रिय',
            notScheduled:'निर्धारित नहीं', image:'मेंटेनेंस पेज छवि',
            imageHelp:'वैकल्पिक JPG, PNG या WebP छवि, अधिकतम 2 MB।', removeImage:'अपलोड की गई छवि हटाएं', defaultImage:'डिफ़ॉल्ट मेंटेनेंस चित्र दिखाया जाएगा।', activity:'गतिविधि',
            updated:'अपडेट किया गया', temporary:'अस्थायी रूप से अनुपलब्ध', backSoon:'हम जल्द वापस आएंगे',
            statusSaved:'मेंटेनेंस सेटिंग्स सफलतापूर्वक सहेजी गईं।', language:'भाषा', theme:'दिखावट',
            light:'लाइट', dark:'डार्क', system:'सिस्टम', madeFor:'Laravel के लिए बनाया गया', settingsLocal:'सेटिंग्स आपके एप्लिकेशन में स्थानीय रूप से संग्रहीत हैं।'
        },
        ar: {
            heading:'وضع الصيانة', subtitle:'حافظ على تجربة تطبيقك أثناء العمل في الخلفية.',
            quick:'تحكم سريع', availability:'توفر الموقع', glance:'نظرة عامة', configuration:'الإعدادات',
            mode:'الوضع', ips:'عناوين IP المسموح بها', start:'وقت البدء المجدول', end:'وقت الانتهاء المجدول',
            personalize:'تخصيص التجربة', pageSettings:'إعدادات صفحة الصيانة',
            pageHelp:'أخبر الزوار بما يحدث ومتى تتوقع العودة.', headline:'عنوان الصفحة',
            message:'رسالة للزوار', scheduledStart:'وقت البدء المجدول', scheduledEnd:'وقت الانتهاء المجدول',
            allowed:'عناوين IP المسموح بها', ipHelp:'اكتب عنوان IP واحداً في كل سطر. يمكن لهؤلاء الزوار تجاوز الصيانة.',
            local:'يتم حفظ الإعدادات محلياً في تطبيقك.', save:'حفظ الإعدادات ←',
            history:'نشاط الصيانة الأخير', enable:'تفعيل وضع الصيانة ←', disable:'تعطيل وضع الصيانة ←',
            instant:'تسري التغييرات فوراً', live:'الصيانة مفعلة', operational:'جميع الأنظمة تعمل',
            workspace:'مساحة العمل', overview:'نظرة عامة', systemPanel:'لوحة النظام', breadcrumb:'الصيانة',
            appControl:'التحكم بالتطبيق', activeEnabled:'وضع الصيانة مفعل', siteLive:'موقعك متاح',
            visitorsMaintenance:'يرى الزوار صفحة الصيانة.',
            scheduledWaiting:'تمت جدولة الصيانة أو أنها تنتظر وقت البدء.',
            visitorsNormally:'يمكن للزوار الوصول إلى تطبيقك بشكل طبيعي.', active:'نشط', inactive:'غير نشط',
            notScheduled:'غير مجدول', image:'صورة صفحة الصيانة',
            imageHelp:'صورة اختيارية بصيغة JPG أو PNG أو WebP، بحد أقصى 2 ميجابايت.', removeImage:'إزالة الصورة المرفوعة', defaultImage:'سيتم عرض الرسم التوضيحي الافتراضي للصيانة.', activity:'النشاط',
            updated:'تم التحديث', temporary:'غير متاح مؤقتاً', backSoon:'سنعود قريباً',
            statusSaved:'تم حفظ إعدادات الصيانة بنجاح.', language:'اللغة', theme:'المظهر',
            light:'فاتح', dark:'داكن', system:'النظام', madeFor:'صُنع لـ Laravel', settingsLocal:'يتم حفظ الإعدادات محلياً في تطبيقك.'
        }
    };

    const applyTheme = (theme) => {
        const resolved = theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;
        root.setAttribute('data-theme', resolved);
        localStorage.setItem(themeKey, theme);
        if (themeButton) themeButton.textContent = theme === 'dark' ? '☼' : theme === 'system' ? '◉' : '◐';
    };

    const applyLanguage = (language) => {
        const locale = translations[language] ? language : 'en';
        const dictionary = translations[locale];
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
                element.textContent = dictionary[key];
            }
        });
        root.lang = locale.replace('_', '-');
        root.dir = locale === 'ar' ? 'rtl' : 'ltr';
        if (languageSelect) languageSelect.value = locale;
        localStorage.setItem(languageKey, locale);
    };

    applyTheme(localStorage.getItem(themeKey) || 'system');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const current = localStorage.getItem(themeKey) || 'system';
            applyTheme(current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light');
        });
    }

    if (languageSelect) {
        applyLanguage(localStorage.getItem(languageKey) || 'en');
        languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
        if ((localStorage.getItem(themeKey) || 'system') === 'system') applyTheme('system');
    });
})();