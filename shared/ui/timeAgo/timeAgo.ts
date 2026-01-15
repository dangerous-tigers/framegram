'use client';

import TimeAgo from 'javascript-time-ago';
import be from 'javascript-time-ago/locale/be';
import en from 'javascript-time-ago/locale/en';
import hi from 'javascript-time-ago/locale/hi';
import ru from 'javascript-time-ago/locale/ru';
import uk from 'javascript-time-ago/locale/uk';
import zh from 'javascript-time-ago/locale/zh';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
TimeAgo.addLocale(uk);
TimeAgo.addLocale(be);
TimeAgo.addLocale(zh);
TimeAgo.addLocale(hi);
