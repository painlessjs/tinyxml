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
export const VersionInfo = RegExp(`version${Eq.source}(?:'${VersionNum.source}'|"${VersionNum.source}")`);

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
export const EncodingDecl = RegExp(`encoding${Eq.source}(?:'${EncName.source}'|"${EncName.source}")`);

export const SDValueRaw = RegExp('(?:yes|no)');

/**
 * 2.9 Standalone Document Declaration
 * [32] SDDecl ::= S 'standalone' Eq (("'" ('yes' | 'no') "'") | ('"' ('yes' | 'no') '"'))
 */
export const SDDecl = RegExp(`standalone${Eq.source}(?:'${SDValueRaw.source}'|"${SDValueRaw.source}")`);

/**
 * 2.8 Prolog and Document Type Declaration
 * [23] XMLDecl	::= '<?xml' VersionInfo EncodingDecl? SDDecl? S? '?>'
 */
export const XMLDecl = RegExp(`<\\?xml${S.source}(${VersionInfo.source})(?:${S.source}(${EncodingDecl.source}))?(?:${S.source}(${SDDecl.source}))?(?:${S.source})?\\?>`);

/**
 * 2.3 Common Syntactic Constructs
 * [4] NameStartChar ::= ":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
 */
export const NameStartChar = RegExp('[:A-Z_a-z\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]');

/**
 * 2.3 Common Syntactic Constructs
 * [4a] NameChar ::= NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
 */
export const NameChar = RegExp(`(?:${NameStartChar.source}|-|\\.|\\d|\xB7|[\\u0300-\\u036F]|[\\u203F-\\u2040])`);

/**
 * 2.3 Common Syntactic Constructs
 * [5] Name	::= NameStartChar (NameChar)*
 */
export const Name = RegExp(`${NameStartChar.source}(?:${NameChar})*`);

/**
 * 2.3 Common Syntactic Constructs
 * [6] Names ::= Name (#x20 Name)*
 */
export const Names = RegExp(`${Name.source}(?:\x20${Name.source})*`);

/**
 * 2.3 Common Syntactic Constructs
 * [7] Nmtoken ::= (NameChar)+
 */
export const Nmtoken = RegExp(`(?:${NameChar.source})+`);

/**
 * 2.3 Common Syntactic Constructs
 * Nmtokens	::= Nmtoken (#x20 Nmtoken)*
 */
export const Nmtokens = RegExp(`${Nmtoken.source}(?:\x20${Nmtoken.source})*`);

/**
 * 4.1 Character and Entity References
 * [66] CharRef ::= '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';'
 */
export const CharRef = RegExp('(?:&#\\d+;|&#x[\\da-fA-F]+;)');

/**
 * 4.1 Character and Entity References
 * [68] EntityRef ::= '&' Name ';'
 */
export const EntityRef = RegExp(`&${Name.source};`);

/**
 * 4.1 Character and Entity References
 * [69] PEReference ::= '%' Name ';'
 */
export const PEReference = RegExp(`%${Name.source};`);

/**
 * 4.1 Character and Entity References
 * [67] Reference	::= EntityRef | CharRef
 */
export const Reference = RegExp(`(?:${EntityRef.source}|${CharRef.source})`);

/**
 * 2.3 Common Syntactic Constructs
 * [9] EntityValue ::= '"' ([^%&"] | PEReference | Reference)* '"' | "'" ([^%&'] | PEReference | Reference)* "'"
 */
export const EntityValue = RegExp(`(?:'(?:[^%&\']|${PEReference.source}|${Reference.source})*'|"(?:[^%&\"]|${PEReference.source}|${Reference.source})*")`);
export const EntityValueRaw = RegExp(`(?:[^%&\'\"]|${PEReference.source}|${Reference.source})`);

/**
 * 2.3 Common Syntactic Constructs
 * [10] AttValue ::= '"' ([^<&"] | Reference)* '"' | "'" ([^<&'] | Reference)* "'"
 */
export const AttValue = RegExp(`(?:'(?:[^<&\']|${Reference.source})*'|"(?:[^<&\"]|${Reference.source})*")`);
export const AttValueRaw = RegExp(`(?:[^<&\'\"]|${Reference.source})*`);

/**
 * 2.3 Common Syntactic Constructs
 * [11] SystemLiteral ::= ('"' [^"]* '"') | ("'" [^']* "'")
 */
export const SystemLiteral = RegExp('(?:\'[^\']*\'|"[^\"]*")');

/**
 * 2.3 Common Syntactic Constructs
 * [13] PubidChar ::= #x20 | #xD | #xA | [a-zA-Z0-9] | [-'()+,./:=?;!*#@$_%]
 */
export const PubidChar = RegExp('(?:\x20|\x0D|\x0A|[a-zA-Z\\d]|[-\'()+,./:=?;!*#@$_%])');

/**
 * 2.3 Common Syntactic Constructs
 * [12] PubidLiteral ::= '"' PubidChar* '"' | "'" (PubidChar - "'")* "'"
 */
export const PubidLiteral = RegExp(`(?:'(?:${PubidChar.source}-\')*'|"${PubidChar.source}*")`);

/**
 * 2.4 Character Data and Markup
 * [14] CharData ::= [^<&]* - ([^<&]* ']]>' [^<&]*)
 */
export const CharData = RegExp('[^<&]*-(?:[^<&]*]]>[^<&]*)');

