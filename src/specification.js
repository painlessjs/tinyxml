/**
 * 2.3 Common Syntactic Constructs
 * [3] S ::= (#x20 | #x9 | #xD | #xA)+
 */
export const S = RegExp('\\s+');

/**
 * 2.8 Prolog and Document Type Declaration
 * [25] Eq ::= S? '=' S?
 */
export const Eq = RegExp(`(?:${S.source})?=(?:${S.source})?`);

/**
 * 2.8 Prolog and Document Type Declaration
 * [26] VersionNum ::= '1.' [0-9]+
 */
export const VersionNum = RegExp('1\\.\\d+');

/**
 * 2.8 Prolog and Document Type Declaration
 * [24] VersionInfo	::= S 'version' Eq ("'" VersionNum "'" | '"' VersionNum '"')
 */
export const VersionInfo = RegExp(`version${Eq.source}(?:'(${VersionNum.source})'|"(${VersionNum.source})")`);

/**
 * 4.3.3 Character Encoding in Entities
 * [81] EncName ::= [A-Za-z] ([A-Za-z0-9._] | '-')*
 * Encoding name contains only Latin characters
 */
export const EncName = RegExp('[A-Za-z](?:[\\w\\.]|-)*');

/**
 * 4.3.3 Character Encoding in Entities
 * [80] EncodingDecl ::= S 'encoding' Eq ('"' EncName '"' | "'" EncName "'" )
 */
export const EncodingDecl = RegExp(`encoding${Eq.source}(?:'(${EncName.source})'|"(${EncName.source})")`);

/**
 * 2.9 Standalone Document Declaration
 * [32] SDDecl ::= S 'standalone' Eq (("'" ('yes' | 'no') "'") | ('"' ('yes' | 'no') '"'))
 */
export const SDDecl = RegExp(`standalone${Eq.source}(?:'(yes|no)'|"(yes|no)")`);

/**
 * 2.8 Prolog and Document Type Declaration
 * [23] XMLDecl	::= '<?xml' VersionInfo EncodingDecl? SDDecl? S? '?>'
 */
export const XMLDecl = RegExp(`<\\?xml${S.source}${VersionInfo.source}(?:${S.source}(${EncodingDecl.source}))?(?:${S.source}(${SDDecl.source}))?(?:${S.source})?\\?>`);

