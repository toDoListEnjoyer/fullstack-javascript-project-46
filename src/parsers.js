import YAML from 'js-yaml';

export default (data, format) => {
    switch (format) {
      case 'json':
        return JSON.parse(data);
      case 'yaml':
      case 'yml':
        return YAML.load(data);
    }
};