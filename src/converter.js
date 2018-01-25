import {
  S,
  Eq,
  VersionNum,
  VersionInfo,
  EncName,
  EncodingDecl,
  SDDecl,
  XMLDecl
} from './specification';

class Converter {
  constructor(input, _options = {}) {
    this.input = input;
    this.options = _options;
  }
}

class XMLConverter extends Converter {
  constructor(xml, _options) {
    super(xml, _options);
  }
}

class JSConverter extends JSConverter {
  constructor(object, _options) {
    super(object, _options);
  }
}

Converter.fromXML = (xml, _options) => new XMLConverter(xml, _options);
Converter.fromJS = (object, _options) => new JSConverter(object, _options);

export default Converter;

