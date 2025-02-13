const parseError = (errorXml: string): string => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(errorXml, 'application/xml');
  
    const code = xmlDoc.getElementsByTagName('code')[0]?.textContent;
    const message = xmlDoc.getElementsByTagName('message')[0]?.textContent;
  
    return code && message ? `Error ${code}: ${message}` : 'Unexpected error';
  };

export default parseError;