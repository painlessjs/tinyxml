import _get from 'lodash/get';
import _merge from 'lodash/merge';
import {
  VersionNum,
  EncName,
  SD,
  XMLDecl
} from './specification';

class Converter {
  constructor(input, _options = {}) {
    this.input = input;
    this.options = _merge({
      setPropKey: () => '$',
      setPropName: name => name
    }, _options);
    this.lastIndex = 0;
  }
}

class XMLConverter extends Converter {
  constructor(xml, _options) {
    super(xml, _options);
  }

  toJS() {
    return this.matchDeclaration();
  }

  _match(declaration) {
    const re = RegExp(`^${declaration.source}`, 'g');
    let result = null;

    re.lastIndex = this.lastIndex;
    result = re.exec(this.input);

    if (result) {
      this.lastIndex = re.lastIndex;
    }

    return result;
  }

  matchDeclaration() {
    const { setPropKey, setPropName } = this.options;
    const xmlProps = [{
      name: 'version',
      exec: s => _get(VersionNum.exec(s), [0])
    }, {
      name: 'encoding',
      exec: s => _get(EncName.exec(s), [0])
    }, {
      name: 'standalone',
      exec: s => _get(SD.exec(s), [0])
    }];
    let result = this._match(XMLDecl);

    if (result) {
      const props = {};

      for (let i = 1; i < result.length; i++) {
        if (result[i]) {
          const prop = xmlProps[i - 1].exec(result[i].split('=')[1]);
          
          if (prop) {
            props[setPropName(xmlProps[i - 1].name)] = prop.trim();
          }
        }
      }
      result = { [setPropKey()]: props };
    }

    return result;
  }
}

class JSConverter extends Converter {
  constructor(object, _options) {
    super(object, _options);
  }
}

Converter.fromXML = (xml, _options) => new XMLConverter(xml, _options);
Converter.fromJS = (object, _options) => new JSConverter(object, _options);

export default Converter;

