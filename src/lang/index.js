import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementLocale from 'element-ui/lib/locale';
import en from './en';
import cn from './cn';
import { getLocale, saveLocale } from '@/utils/localStorage';

Vue.use(VueI18n);

const messages = {
  en, cn
};

let locale = getLocale();
if (!locale) {
  locale = 'cn';
  // Vue.config.lang = locale;
  saveLocale(locale);
}

const i18n = new VueI18n({
  locale,
  messages
});

// 重点：为了实现element插件的多语言切换
elementLocale.i18n((key, value) => i18n.t(key, value));
export default i18n;
