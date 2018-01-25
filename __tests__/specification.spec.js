import {
  S,
  Eq,
  VersionNum,
  VersionInfo,
  EncName,
  EncodingDecl,
  SDDecl,
  XMLDecl
} from '../src/specification';

describe('XML specification 1.0 definitions', () => {
  test('S', () => {
    const re = RegExp(`^${S.source}$`);

    expect([0x20, 0x9, 0xD, 0xA].every(s => re.test(String.fromCharCode(s)))).toBe(true);
    expect(['', '0', 'null', '-', '*', '.', '$'].every(s => !re.test(s))).toBe(true);
  });

  test('Eq', () => {
    const re = RegExp(`^${Eq.source}$`);

    expect(['=', ' = ', '= ', ' =', '  =  '].every(eq => re.test(eq))).toBe(true);
    expect(['', '0', 'null', '-', '*', '.', '$'].every(eq => !re.test(eq))).toBe(true);
  });

  test('VersionNum', () => {
    const re = RegExp(`^${VersionNum.source}$`);

    expect(['1.0', '1.01'].every(vn => re.test(vn))).toBe(true);
    expect(['', '.', '.0', '0.1', '3.1415'].every(vn => !re.test(vn))).toBe(true);
  });

  test('VersionInfo', () => {
    const re = RegExp(`^${VersionInfo.source}$`);

    expect([`version="1.0"`, `version='1.0'`].every((vi) => {
      const info = re.exec(vi);
      return info && (info[1] || info[2]) === '1.0';
    })).toBe(true);

    expect([
      `version=1.0`,
      `version="0.1"`,
      `version="9.9"`,
      `version='1.0"`,
      `version=""`,
      `version=" "`,
      `ver="1.0"`
    ].every(vi => !re.test(vi))).toBe(true);
  });

  test('EncName', () => {
    const re = RegExp(`^${EncName.source}$`);

    expect(['utf-8', 'gb2312', 'en.US'].every(en => re.test(en))).toBe(true);
    expect(['936', '', ' ', 'utf+8', '.US', '-8'].every(en => !re.test(en))).toBe(true);
  });

  test('EncodingDecl', () => {
    const re = RegExp(`^${EncodingDecl.source}$`);

    expect([
      `encoding="utf-8"`,
      `encoding='utf-8'`
    ].every((en) => {
      const encoding = re.exec(en);
      return encoding && (encoding[1] || encoding[2]) === 'utf-8';
    })).toBe(true);

    expect([
      `encoding="gb2312"`,
      `encoding='gb2312'`
    ].every((en) => {
      const encoding = re.exec(en);
      return encoding && (encoding[1] || encoding[2]) === 'gb2312';
    })).toBe(true);

    expect([
      `encoding="en.US"`,
      `encoding='en.US'`
    ].every((en) => {
      const encoding = re.exec(en);
      return encoding && (encoding[1] || encoding[2]) === 'en.US';
    })).toBe(true);

    expect([
      `encoding="936"`,
      `encoding="utf+8"`,
      `encoding=""`,
      `encoding=" "`,
      `encoding=utf-8`,
      `enc="utf-8"`
    ].every(en => !re.test(en))).toBe(true);
  });

  test('SDDecl', () => {
    const re = RegExp(`^${SDDecl.source}$`);

    expect([`standalone="yes"`, `standalone='yes'`].every((sd) => {
      const standalone = re.exec(sd);
      return standalone && (standalone[1] || standalone[2]) === 'yes';
    })).toBe(true);

    expect([`standalone="no"`, `standalone='no'`].every((sd) => {
      const standalone = re.exec(sd);
      return standalone && (standalone[1] || standalone[2]) === 'no';
    })).toBe(true);

    expect([
      `standalone=yes`,
      `standalone=no`,
      `alone="yes"`,
      `alone="no"`,
      `alone=yes`,
      `alone=no`,
      `standalone=" yes"`,
      `standalone="no "`,
      `standalone=""`,
      `standalone=" "`,
    ].every(sd => !re.test(sd))).toBe(true);
  });

  test('XMLDecl', () => {
    const re = RegExp(`^${XMLDecl.source}$`);

    expect([
      `<?xml version="1.0"?>`,
      `<?xml version="1.0" ?>`,
      `<?xml version="1.0" encoding="utf-8"?>`,
      `<?xml version="1.0" standalone="yes"?>`,
      `<?xml version="1.0" standalone="no"?>`,
      `<?xml version="1.0" encoding="utf-8" standalone="yes"?>`
    ].every((decl) => re.test(decl))).toBe(true);
    expect([
      `<>`,
      `<xml>`,
      `<xml?>`,
      `<??>`,
      `<?xml>`,
      `<?xml?>`,
      `<?xml name="xml"?>`,
      `<?xml encoding="utf-8"?>`,
      `<?xml standalone="yes"?>`,
      `<?xml standalone="no"?>`,
    ].every(decl => !re.test(decl))).toBe(true);
  });
});

